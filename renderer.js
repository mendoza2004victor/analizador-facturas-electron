// lógica para cálculo de facturas
async function seleccionarCarpeta() {
  try {
    const ruta = await window.api.seleccionarCarpeta();

    if (ruta) {
      document.getElementById("carpeta").innerText =
        "Carpeta seleccionada:\n" + ruta;
    }

  } catch (error) {
    console.error("Error seleccionando carpeta:", error);
    alert("No se pudo seleccionar la carpeta.");
  }
}

async function calcular() {

  const desde = document.getElementById("desde").value;
  const hasta = document.getElementById("hasta").value;

  if (!desde || !hasta) {
    alert("Selecciona ambas fechas");
    return;
  }

  try {
    const resultado = await window.api.calcular(desde, hasta);

    // Si no se ha seleccionado carpeta
    if (resultado.error) {
      alert(resultado.error);
      return;
    }

    document.getElementById("resultado").innerText =
      `Facturas encontradas: ${resultado.cantidad}
Total acumulado: Q ${resultado.total}`;

  } catch (error) {

    alert("Ocurrió un error al procesar las facturas.");
    console.error(error);

  }
}