var oPrincipalController
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/m/MessageBox',
    "sap/ui/Device",
    "../model/demo-data-roles",
    "sap/m/IconTabBar"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageBox, Device, DemoDataRol, IconTabBar) {
        "use strict";

        var oCore;
        var oView;
        var oHeaderXcsrfToken;

        return Controller.extend("com.rmsystem.launchpadhome.controller.Principal", {
            onInit: function () {
                oView = this.getView();
                oCore = sap.ui.getCore();
                oPrincipalController = this;
                this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);

                oCore.getModel("mRolxPermisos").setProperty("/", DemoDataRol);
                // oCore.getModel("mRolxPermisos").refresh();
                // oCore.getModel("mRolxPermisos").getData();

                //funcion para crear tails e icontab bar
                oPrincipalController._bindTabAndTail();
            },
            // ajuste para hacer el redireccionamiento
            onHandleHome: function (event) {
                event.preventDefault(); //esto cancela el comportamiento del click
                setTimeout(() => location.href = "http://localhost/proyectos/launchpad", 100);
            },
            PressTailNota: function (event) {
                console.log("hacealgo")
                event.preventDefault(); //esto cancela el comportamiento del click
                setTimeout(() => location.href = "http://localhost/proyectos/nota_credito", 100);
            },
            // fin ajuste redireccionamiento
            pressRedirect: function () {
// pendiente revisar redireccionamientio
            },

            // ajuste para hacer tails y tabs de manera dinamica
            _bindTabAndTail: function () {

                // armar tabs
                var aColumns = [];
                // obtiene los datos del tab
                var data_tabs = oCore.getModel("mRolxPermisos").getData().aColumns;
                var data_tail = oCore.getModel("mRolxPermisos").getData().bColumns;

                data_tabs.forEach(element => {
                    // obtiene los datos de tails
                    var tailxTab = data_tail.filter(data_tail => data_tail.rol_pertenece_app == element.id_rol)

                    var bColumns = []

                    tailxTab.forEach(tail => {
                        bColumns.push(new sap.m.GenericTile(tail.id_app, {
                            header: tail.nombre_app,
                            subheader: tail.descripcion_app,
                            url: tail.link_app,
                            press: pressRedirect(tail.link_app),
                            tileContent: []
                        })
                        )
                    })

                    aColumns.push(new sap.m.IconTabFilter({
                        text: element.nombre_rol,
                        key: element.id_rol,
                        content: bColumns
                    }))

                });


                var oICT = new IconTabBar("ictRolesApp", {
                    expandable: false,
                    expanded: true,
                    items: aColumns
                })

                // agregar el ict en el page
                var oPage = this.byId("page");
                oPage.addContent(oICT);
            },

            // metodos genericos
            getResourceBundle: function () {
                return this.getOwnerComponent().getModel("i18n").getResourceBundle();
            },
            _onErrorWebService: function () {
                var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
                MessageBox.error(
                    oPrincipalController.getResourceBundle().getText("Message.Error.TextInfo1.Text"), {
                    styleClass: bCompact ? "sapUiSizeCompact" : ""
                }
                );
                sap.ui.core.BusyIndicator.hide();
            },
            // fin metodos genericos
        });
    });
