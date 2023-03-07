sap.ui.define(['jquery.sap.global'],
  function (jQuery) {
    "use strict";
    var DemoDataRol = {
      id_usuario: "P0001",
      email: "chris.pacheco@algo.com",
      aColumns: [
        { id_rol: "R01", nombre_rol: "TI" },
        { id_rol: "R02", nombre_rol: "Proveedores" }
      ],
      bColumns: [
        {
          id_app: "com.rmsystem.notacredito",
          nombre_app: "Nota de Crédito",
          descripcion_app: "",
          rol_pertenece_app: "R02",
          link_app: "http://localhost/proyectos/nota_credito"
        },
        {
          id_app: "com.rmsystem.proyectoagro",
          nombre_app: "Proyecto Agro",
          descripcion_app: "",
          rol_pertenece_app: "R01",
          link_app: "http://localhost/proyectos/proye_agro"
        },
        {
          id_app: "com.rmsystem.facturaoc",
          nombre_app: "Facturas Orden de Compra",
          descripcion_app: "",
          rol_pertenece_app: "R02",
          link_app: "#"
        },
        {
          id_app: "com.rmsystem.complementopago",
          nombre_app: "Complemento de Pago",
          descripcion_app: "",
          rol_pertenece_app: "R02",
          link_app: "#"
        }
      ]
    }

    return DemoDataRol;

  }, /* bExport= */ true);