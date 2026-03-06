const fs = require('fs');
const path = require('path');
const xml2js = require('xml2js');
const readline = require('readline');

const rutaCarpeta = "C:/Facturas";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function preguntar(pregunta) {
  return new Promise(resolve => rl.question(pregunta, resolve));
}

async function procesarXML() {

  const fechaDesde = await preguntar("Fecha DESDE (YYYY-MM-DD): ");
  const fechaHasta = await preguntar("Fecha HASTA (YYYY-MM-DD): ");

  let totalGeneral = 0;
  let contador = 0;

  try {

    const archivos = fs.readdirSync(rutaCarpeta);

    for (let archivo of archivos) {

      if (archivo.toLowerCase().endsWith(".xml")) {

        const rutaCompleta = path.join(rutaCarpeta, archivo);
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

          // 🔥 FILTRO POR RANGO
          if (fecha >= fechaDesde && fecha <= fechaHasta) {
            totalGeneral += total;
            contador++;
          }

        } catch {}
      }
    }

    console.log("=================================");
    console.log("FACTURAS EN RANGO:", contador);
    console.log("TOTAL ACUMULADO:", totalGeneral.toFixed(2));
    console.log("=================================");

    rl.close();

  } catch (error) {
    console.log("Error general:", error.message);
    rl.close();
  }
}

procesarXML();