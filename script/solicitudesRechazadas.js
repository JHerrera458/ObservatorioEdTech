const visualizarSolicitudesRechazadas = async () => {
    let solicitudRechazada = await getSolicitudesRechazadas();
    let div = "solicitudesRechazadas";
    if (solicitudRechazada == "") {
        vistaNoSolicitudes(div);
    }
    else {
        solicitudRechazada.forEach(async element => {
            let datos = element.data();
            await imprimirVistaSolicitudRechazada(datos, element.id);
        });
    }

}

visualizarSolicitudesRechazadas();