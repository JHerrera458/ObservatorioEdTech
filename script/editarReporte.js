const modificarReporte = async () => {
    let idReporte = localStorage.getItem("idReporte");
    let reporte = await getReporteDoc(idReporte);
    reporte = reporte.data();

    let nombreReporte = document.getElementById("nombreReporte");
    let solicitudReporte = document.getElementById("solicitudReporte");
    let infoReporte = document.getElementById("infoReporte");
    let resumenReporte = document.getElementById("resumenReporte");

    nombreReporte.value = reporte.nombreReporte;
    solicitudReporte.value = reporte.idSolicitud;
    infoReporte.value = reporte.infoReporte;
    resumenReporte.value = reporte.resumenReporte;
}

modificarReporte();