const mostrarTemas = async () => {
    let temaSolicitud = document.getElementById("tema");
    let temas = await getTemas();

    temas.forEach(element => {
        let datos = element.data();
        let opcion = document.createElement("option");
        opcion.value = element.id;
        opcion.text = datos.nombreTema;
        temaSolicitud.appendChild(opcion);
    });
}

mostrarTemas();
