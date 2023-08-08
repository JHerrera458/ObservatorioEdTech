const visualizarSolicitudesAceptadasCliente = async () => {
    let solicitudAceptada = await getSolicitudesAceptadas();
    let div = "solicitudesAceptadas";
    if (solicitudAceptada == "") {
        vistaNoSolicitudes(div);
    }
    else {
        solicitudAceptada.forEach(async element => {
            let datos = element.data();
            await imprimirVistaSolicitudAceptadaCliente(datos, element.id);
        });
    }

}

visualizarSolicitudesAceptadasCliente();