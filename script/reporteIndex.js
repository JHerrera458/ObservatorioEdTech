const mostrarReportes = async () => {
    let reporte = await getReporte();
    let div = "reporte1";
    if (reporte == "") {
        vistaNoReportes(div);
    }
    reporte.forEach(async element => {
        let datos = element.data();
        await imprimirReporteSolicitud(datos, element.id)
    });
}
mostrarReportes();