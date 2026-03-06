const { contextBridge, ipcRenderer } = require('electron');
const fs = require('fs');
const path = require('path');
const xml2js = require('xml2js');

contextBridge.exposeInMainWorld("api", {

  seleccionarCarpeta: () => ipcRenderer.invoke('seleccionar-carpeta'),

  calcular: async (fechaDesde, fechaHasta) => {

    const carpeta = await ipcRenderer.invoke('obtener-carpeta');

    if (!carpeta) {
      return { error: "No se ha seleccionado carpeta." };
    }

    let totalGeneral = 0;
    let contador = 0;

    const archivos = fs.readdirSync(carpeta);

    for (let archivo of archivos) {

      if (archivo.toLowerCase().endsWith(".xml")) {

        const rutaCompleta = path.join(carpeta, archivo);
        const contenidoXML = fs.readFileSync(rutaCompleta, "utf8");

        try {
          const resultado = await xml2js.parseStringPromise(contenidoXML);

          if (!resultado["dte:GTDocumento"]) continue;

          const datosEmision =
            resultado["dte:GTDocumento"]["dte:SAT"][0]["dte:DTE"][0]["dte:DatosEmision"][0];

          const fechaHora =
            datosEmision["dte:DatosGenerales"][0].$["FechaHoraEmision"];

          const granTotal =
            datosEmision["dte:Totales"][0]["dte:GranTotal"][0];

          const fecha = fechaHora.split("T")[0];
          const total = parseFloat(granTotal);

          if (fecha >= fechaDesde && fecha <= fechaHasta) {
            totalGeneral += total;
            contador++;
          }

        } catch {}
      }
    }

    return {
      total: totalGeneral.toFixed(2),
      cantidad: contador
    };
  }
});