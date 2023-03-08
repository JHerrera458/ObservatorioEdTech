const visualizarSolicitudesEnEspera = async () => {
    let solicitudEnEspera = await getSolicitudes();
    let div = "solicitudesEnEspera";
    if (solicitudEnEspera == "") {
        vistaNoSolicitudes(div);
    }
    else {
        solicitudEnEspera.forEach(async element => {
            let datos = element.data();
            await imprimirVistaSolicitud(datos, element.id);
        });
    }
}

visualizarSolicitudesEnEspera();