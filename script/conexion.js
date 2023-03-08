const anadirTema = async () => {
    let nombreTema = document.getElementById("nombreTema").value;
    let descripcionTema = document.getElementById("descripcion").value;
    await setTema(nombreTema, descripcionTema);
}

const subirSolicitud = async () => {
    let nombreSolicitud = document.getElementById("nombre").value;
    let descripcionSolicitud = document.getElementById("descripcion").value;
    let temaSolicitud = document.getElementById("tema").value;
    let cargoSolicitud = document.getElementById("cargo").value;
    let correoSolicitud = document.getElementById("correo").value;
    let estado = 0; //0 = En espera, 1 = Aceptada, 2 = Rechazada, 3 = Terminada
    let date = new Date()
    let fecha = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    let consecutivo = await getConsecutivo();
    let consecutivoAlgo = consecutivo.data();
    let consecutivoSumado = consecutivoAlgo.consecutivo + 1;

    await setSolicitud(nombreSolicitud, descripcionSolicitud, temaSolicitud, cargoSolicitud, correoSolicitud, estado, fecha, consecutivoSumado);
    await updateConsecutivo(consecutivoSumado);

    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'La solicitud fue subida con éxito.',
        showConfirmButton: false,
        timer: 1500
    })
}

// BLOQUE DE ACTUALIZACIÓN DE SOLICITUDES*******

const aceptarSolicitud = async (objeto) => {
    let id = objeto.id;

    vistaFechaAceptada(id);
}

const enviarFecha = async (objeto) => {
    let id = objeto.id;
    let fecha = document.getElementById(`fechaEntrega${id}`).value;
    let solicitud = await getSolicitud(id);
    solicitud = solicitud.data();

    let nombreSolicitud = solicitud.nombreSolicitud;
    let descripcionSolicitud = solicitud.descripcionSolicitud;
    let temaSolicitud = solicitud.temaSolicitud;
    let cargoSolicitud = solicitud.cargoSolicitud;
    let correoSolicitud = solicitud.correoSolicitud;
    let estado = 1; // 1 == Aceptada
    let fechaCreacion = solicitud.fecha;
    let consecutivo = solicitud.consecutivo;
    await setFechaEntrega(id, fecha);
    await updateSolicitud(nombreSolicitud, descripcionSolicitud, temaSolicitud, cargoSolicitud, correoSolicitud, estado, fechaCreacion, consecutivo, id);
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Solicitud aceptada con éxito.',
        showConfirmButton: false,
        timer: 1500
    })
}



const rechazarSolicitud = async (objeto) => {
    let id = objeto.id;
    let comentarioRechazado = await comentarRechazo(id);

    let solicitud = await getSolicitud(id);
    solicitud = solicitud.data();

    let nombreSolicitud = solicitud.nombreSolicitud;
    let descripcionSolicitud = solicitud.descripcionSolicitud;
    let temaSolicitud = solicitud.temaSolicitud;
    let cargoSolicitud = solicitud.cargoSolicitud;
    let correoSolicitud = solicitud.correoSolicitud;
    let estado = 2; // 2 == Rechazada
    let fecha = solicitud.fecha;
    let consecutivo = solicitud.consecutivo;

    await updateSolicitud(nombreSolicitud, descripcionSolicitud, temaSolicitud, cargoSolicitud, correoSolicitud, estado, fecha, consecutivo, id);
    if (comentarioRechazado) {
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Solicitud rechazada con éxito.',
            showConfirmButton: false,
            timer: 1500
        })
    }
}

const comentarRechazo = async (idSolicitud) => {
    Swal.fire({
        title: 'Ingrese comentarios de rechazo',
        input: 'text',
        inputAttributes: {
            autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Enviar comentario',
        showLoaderOnConfirm: true,
        allowOutsideClick: () => !Swal.isLoading()
    }).then(async (result) => {
        if (result.isConfirmed) {
            let comentario = result.value;
            await setComentario(idSolicitud, comentario);
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Solicitud rechazada con éxito.',
                showConfirmButton: false,
                timer: 1500
              })
            return true;
        }
        else {
            return false;
        }
    })
}

const comentarVigilancia = async (objeto) => {
    idSolicitud = objeto.id;
    Swal.fire({
        title: 'Ingrese comentarios de la vigilancia',
        input: 'text',
        inputAttributes: {
            autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Enviar comentario',
        showLoaderOnConfirm: true,
        allowOutsideClick: () => !Swal.isLoading()
    }).then(async (result) => {
        if (result.isConfirmed) {
            let comentario = result.value;
            await setComentarioVigilancia(idSolicitud, comentario);
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Comentario enviado con éxito.',
                showConfirmButton: false,
                timer: 1500
              })
            return true;
        }
        else {
            return false;
        }
    })
}

const terminarSolicitud = async (idSolicitud) => {
    let id = idSolicitud;
    let solicitud = await getSolicitud(id);
    solicitud = solicitud.data();

    let nombreSolicitud = solicitud.nombreSolicitud;
    let descripcionSolicitud = solicitud.descripcionSolicitud;
    let temaSolicitud = solicitud.temaSolicitud;
    let cargoSolicitud = solicitud.cargoSolicitud;
    let correoSolicitud = solicitud.correoSolicitud;
    let estado = 3; //3 == Terminada
    let fecha = solicitud.fecha;
    let consecutivo = solicitud.consecutivo;

    await updateSolicitud(nombreSolicitud, descripcionSolicitud, temaSolicitud, cargoSolicitud, correoSolicitud, estado, fecha, consecutivo, id);
}

// BLOQUE DE ACTUALIZACIÓN DE SOLICITUDES*******

const filtrarTema = async () => {
    let temaSolicitud = document.getElementById("tema").value;
    if (temaSolicitud == "todos") {
        let divSolicitud = document.getElementById("solicitudesEnEspera");
        divSolicitud.innerHTML = '';
        visualizarSolicitudesEnEspera();
    }
    else {
        let consulta = await getTemaSolicitud(temaSolicitud);

        let divSolicitud = document.getElementById("solicitudesEnEspera");
        divSolicitud.innerHTML = '';

        consulta.forEach(async element => {
            let datos = element.data();
            await imprimirVistaSolicitud(datos, element.id);
        });
    }
}

const subirReporte = async () => {
    let nombreReporte = document.getElementById("nombreReporte").value;
    let infoReporte = urlArchivo;
    let resumenReporte = document.getElementById("resumenReporte").value;
    let idSolicitud = document.getElementById("solicitudReporte").value;
    let date = new Date()
    let fechaReporte = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    if (infoReporte) {
        await setReporte(nombreReporte, infoReporte, resumenReporte, fechaReporte, idSolicitud);
        await terminarSolicitud(idSolicitud);
        urlArchivo = undefined;
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Reporte súbido con éxito.',
            showConfirmButton: false,
            timer: 1500
        })
    }
    else {
        Swal.fire({
            position: 'top-end',
            icon: 'warning',
            title: 'Debes añadir un archivo',
            showConfirmButton: false,
            timer: 1500
        })
    }
}

const EnviarEditarReporte = async () => {
    let idReporte = localStorage.getItem("idReporte");
    let nombreReporte = document.getElementById("nombreReporte").value;
    let infoReporte = urlArchivo;
    let resumenReporte = document.getElementById("resumenReporte").value;
    let idSolicitud = document.getElementById("solicitudReporte").value;
    let date = new Date()
    let fechaReporte = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    if (infoReporte) {
        await updateReporte(nombreReporte, infoReporte, resumenReporte, fechaReporte, idSolicitud, idReporte);
        urlArchivo = undefined;
    }
    else {
        let reporte = await getReporteDoc(idReporte);
        reporte = reporte.data();
        await updateReporte(nombreReporte, reporte.infoReporte, resumenReporte, fechaReporte, idSolicitud, idReporte);
    }

    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Reporte editado con éxito.',
        showConfirmButton: false,
        timer: 1500
    })

}

const crearReporte = async (element) => {
    window.location.href = "crearReporte.html";
}

let urlArchivo;

const subirArchivo = async () => {
    try {
        Swal.fire({
            position: 'top-end',
            icon: 'info',
            title: 'Tu archivo se está subiendo',
            showConfirmButton: false
        })
        const ref = firebase.storage().ref();
        const file = document.getElementById('infoReporte').files[0];
        var hoy = new Date();
        hora = hoy.getHours() + ':' + hoy.getSeconds() + ':' + hoy.getMinutes();
        horaFecha = hoy.getDate() + ':' + (hoy.getMonth() + 1) + ':' + hoy.getFullYear() + ':' + hora;
        const name = file.name + ':' + horaFecha;
        if (file == null) {


        } else {
            const metadata = {
                contentType: file.type
            }
            const task = ref.child(name).put(file, metadata);

            task.then(snapshot => snapshot.ref.getDownloadURL())
                .then(url => {
                    urlArchivo = url;
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Archivo subido exitosamente',
                        showConfirmButton: false,
                        timer: 1500
                    })
                });
        }
    } catch (e) {
        console.log(e);
    }

}


const buscarReporteTema = async () => {
    let tema1 = document.getElementById("tema").value;
    if (tema1 != "") {
        let reporte1 = document.getElementById("reporte1");
        reporte1.innerHTML = ""
        let temaArray = await getTemaSolicitudall(tema1);
        temaArray.forEach(async element => {
            let reporte = await getReporteSolicitud(element.id);
            reporte.forEach(async element2 => {
                let datos = element2.data();
                await imprimirReporte(datos, element2.id)
            })
        })

    }
}
const buscarReporteNombre = async () => {
    let nombre = document.getElementById("nombreReporte").value;
    if (nombre != "") {
        let reporte = document.getElementById("reporte1");
        reporte.innerHTML = ""
        let reporte1 = await getReporteNombre(nombre)
        reporte1.forEach(async element => {
            let datos = element.data();
            await imprimirReporte(datos, element.id)
        })
    }
}
const borrarReporte = async (element) => {
    await deleteReporteIndividual(element.id)
}

const editarReporte = async (element) => {
    let idReporte = element.id;
    localStorage.setItem("idReporte", idReporte);
    window.location.href = "editarReporte.html";
}


