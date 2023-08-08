const mostrarSolicitudesTerminadas = async () => {
    let temaSolicitud = document.getElementById("solicitudReporte");
    let solicitudes = await getSolicitudesTerminadas();

    solicitudes.forEach(element => {
        let datos = element.data();
        let opcion = document.createElement("option");
        opcion.value = element.id;
        opcion.text = datos.nombreSolicitud;
        temaSolicitud.appendChild(opcion);
    });
}

mostrarSolicitudesTerminadas();