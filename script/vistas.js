const imprimirVistaSolicitud = async (datos, id) => {
    let divSolicitud = document.getElementById("solicitudesEnEspera");
    let nombreTema = await getNombreTema(datos.temaSolicitud);
    nombreTema = nombreTema.data();

    divSolicitud.innerHTML += `
        <div id="divSolicitudesEspera${id}" class = "vistaSolicitudes border col-md-8">
            <br>
            ${datos.nombreSolicitud} <br>
            ${datos.descripcionSolicitud} <br>
            ${nombreTema.nombreTema} <br>
            ${datos.fecha} <br>
            <br>
            <button id = "${id}" class="btn btn-dark" onclick="aceptarSolicitud(this)">Aceptar</button>
            <button id = "${id}" class="btn btn-secondary" onclick="rechazarSolicitud(this)">Rechazar</button>
            
        </div>
            <br>
    `
}

const imprimirVistaSolicitudAceptada = async (datos, id) => {
    let divSolicitud = document.getElementById("solicitudesAceptadas");
    let nombreTema = await getNombreTema(datos.temaSolicitud);
    nombreTema = nombreTema.data();

    divSolicitud.innerHTML += `
        <div class = "vistaSolicitudes">
            ${datos.nombreSolicitud} <br>
            ${datos.descripcionSolicitud} <br>
            ${nombreTema.nombreTema} <br>
            ${datos.fecha} <br>
            <br>
            <button id="${id}" onclick="crearReporte(this)" class="btn btn-dark">Crear Reporte</button>
            
        </div>
    `
}

const imprimirVistaSolicitudRechazada = async (datos, id) => {
    let divSolicitud = document.getElementById("solicitudesRechazadas");
    let nombreTema = await getNombreTema(datos.temaSolicitud);
    let comentarioRechazo = await getComentario(id);
    comentarioRechazo = comentarioRechazo.data();
    nombreTema = nombreTema.data();
    if (comentarioRechazo) {
        divSolicitud.innerHTML += `
        <div class = "border">
            <h3>Nombre Solicitud: </h3>${datos.nombreSolicitud} <br>
            <h3>Información Solicitud: </h3>${datos.descripcionSolicitud} <br>
            <h3>Tema Solicitud: </h3>${nombreTema.nombreTema} <br>
            <h3>Fecha Solicitud: </h3>${datos.fecha} <br>
            <h3>Comentario de Rechazo: </h3>${comentarioRechazo.comentario}  
        </div>
        <br> 
    `
    }
    else {
        divSolicitud.innerHTML += `
        <div class = "border">
            <h3>Nombre Solicitud: </h3>${datos.nombreSolicitud} <br>
            <h3>Información Solicitud: </h3>${datos.descripcionSolicitud} <br>
            <h3>Tema Solicitud: </h3>${nombreTema.nombreTema} <br>
            <h3>Fecha Solicitud: </h3>${datos.fecha} <br>
            <h3>Comentario de Rechazo: </h3> No hay comentario de rechazo.        
        </div>
        <br> 
    `
    }

}

const imprimirVistaSolicitudAceptadaCliente = async (datos, id) => {
    let divSolicitud = document.getElementById("solicitudesAceptadas");
    let nombreTema = await getNombreTema(datos.temaSolicitud);
    nombreTema = nombreTema.data();
    let fechaEntrega = await getFechaEntrega(id);
    fechaEntrega = fechaEntrega.data();

    divSolicitud.innerHTML += `
        <div class = "border">
            <h3>Nombre Solicitud: </h3>${datos.nombreSolicitud} <br>
            <h3>Información Solicitud: </h3>${datos.descripcionSolicitud} <br>
            <h3>Tema Solicitud: </h3>${nombreTema.nombreTema} <br>
            <h3>Fecha Solicitud: </h3>${datos.fecha} <br>
            <h3>Fecha de entrega: </h3>${fechaEntrega.fecha} <br>
        </div>
        <br>
    `
}

const imprimirReporte = async (datos, id) => {
    let reporte1 = document.getElementById("reporte1");
    reporte1.innerHTML += `
        <div class="imagen-port">
            <p>${datos.nombreReporte}</p>
            <img src = "img/imagen.jpg" alt="">
            <div class="hover-galeria">
                <img src="img/logo.lnk" alt="">
                <p>${datos.resumenReporte}</p>
                <a href="${datos.infoReporte}" download="${datos.nombreReporte}">
                <button class="btn"><i class="fa fa-download"></i> Descargar reporte
                </button></a>
                <br>
                <button id="${id}" onclick="comentarVigilancia(this)" class="btn btn-dark">Realizar comentario</button>
            </div>
        </div>
    `
}
const imprimirReporteVigilante = async (datos, id) => {
    let reporte1 = document.getElementById("reporte1");
    let comentarioVigilancia = await getComentarioVigilancia(id);
    comentarioVigilancia = comentarioVigilancia.data();
    if (comentarioVigilancia) {
        reporte1.innerHTML += `
        <div class="imagen-port">
            <p>${datos.nombreReporte}</p>
            <img src = "img/imagen.jpg" alt="">
            <div class="hover-galeria">
                <img src="img/logo.lnk" alt="">
                <p>${datos.resumenReporte}</p>
                <button id="${id}" onclick="borrarReporte(this)" class="btn btn-secondary">Borrar</button>
                <button id="${id}" onclick="editarReporte(this)" class="btn btn-dark">Editar</button>
                <p>${comentarioVigilancia.comentario}</p>
            </div>
        </div>
    `
    }
    else{
        reporte1.innerHTML += `
        <div class="imagen-port">
            <p>${datos.nombreReporte}</p>
            <img src = "img/imagen.jpg" alt="">
            <div class="hover-galeria">
                <img src="img/logo.lnk" alt="">
                <p>${datos.resumenReporte}</p>
                <button id="${id}" onclick="borrarReporte(this)" class="btn btn-secondary">Borrar</button>
                <button id="${id}" onclick="editarReporte(this)" class="btn btn-dark">Editar</button>
                <p>No hay comentario de vigilancia aún</p>
            </div>
        </div>
    `
    }
    
}

const imprimirReporteSolicitud = async (datos, id) => {
    let reporte1 = document.getElementById("reporte1");
    reporte1.innerHTML += `
        <div class="imagen-port">
            <p>${datos.nombreReporte}</p>
            <img src = "img/imagen.jpg" alt="">
            <div class="hover-galeria">
                <img src="img/logo.lnk" alt="">
                <p>${datos.resumenReporte}</p>
                <a href="${datos.infoReporte}" download="${datos.nombreReporte}">
                <button class="btn"><i class="fa fa-download"></i> Descargar reporte
                </button></a>
                <br>
                <button id="${id}" onclick="comentarVigilancia(this)" class="btn btn-dark">Realizar comentario</button>
            </div>
        </div>
    `
}

const vistaFechaAceptada = (idSolicitud) => {
    let divSolicitud = document.getElementById(`divSolicitudesEspera${idSolicitud}`);
    divSolicitud.innerHTML += `
        <center> Ingrese una fecha de entrega aproximada </center>
        <center><input type=date id="fechaEntrega${idSolicitud}" class="form-control"></input></center>
        <button id="${idSolicitud}" onclick="enviarFecha(this)" class="btn btn-dark">Enviar</button>
    `
}

const vistaNoSolicitudes = (div) => {
    let divSolicitud = document.getElementById(`${div}`);
    divSolicitud.innerHTML += `
        <center>No hay solicitudes para mostrar</center>
    `
}

const vistaNoReportes = (div) => {
    let divSolicitud = document.getElementById(`${div}`);
    divSolicitud.innerHTML += `
        <center>No hay reportes para mostrar</center>
    `
}

