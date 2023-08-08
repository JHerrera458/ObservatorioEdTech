const mostrarReportes = async () => {
    let reporte = await getReporte();
    let div = "reporte1";
    if (reporte == "") {
        vistaNoReportes(div);
    }
    else {
        reporte.forEach(async element => {
            let datos = element.data();
            await imprimirReporteVigilante(datos, element.id)
        });
    }

}
mostrarReportes();
