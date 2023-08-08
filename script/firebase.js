// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDFGTmLMS7Kny5CFGSphbmyIoFSPkH5cCg",
  authDomain: "observatorioedtech-ebbe0.firebaseapp.com",
  projectId: "observatorioedtech-ebbe0",
  storageBucket: "observatorioedtech-ebbe0.appspot.com",
  messagingSenderId: "400797837782",
  appId: "1:400797837782:web:01ec56c9020acc687adc77",
  measurementId: "G-9L5XQBS9JK"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();
const db = firebase.firestore();
const ref = firebase.storage().ref();
let idConsecutivo = "3ZReBh7TUXpres2tKTnO";

const setTema = (nombreTema, descripcion) => db.collection("tema").doc().set({ nombreTema, descripcion });

const getTemas = () => db.collection("tema").get();

const getNombreTema = (id) => db.collection("tema").doc(id).get();

const getTemaSolicitud = (idTema) => db.collection("solicitud").where("temaSolicitud", "==", idTema).where("estado", "==", 0).get();

const setSolicitud = (nombreSolicitud, descripcionSolicitud, temaSolicitud, cargoSolicitud, correoSolicitud, estado, fecha, consecutivo) => db.collection("solicitud").doc().set({ nombreSolicitud, descripcionSolicitud, temaSolicitud, cargoSolicitud, correoSolicitud, estado, fecha, consecutivo })

const getSolicitudes = () => db.collection("solicitud").where("estado", "==", 0).orderBy("consecutivo", "asc").get();

const getSolicitudesAceptadas = () => db.collection("solicitud").where("estado", "==", 1).orderBy("consecutivo", "asc").get();

const getSolicitudesTerminadas = () => db.collection("solicitud").where("estado", "==", 3).orderBy("consecutivo", "asc").get();

const getSolicitudesRechazadas = () => db.collection("solicitud").where("estado", "==", 2).orderBy("consecutivo", "asc").get();

const getSolicitud = (id) => db.collection("solicitud").doc(id).get();

const updateSolicitud = (nombreSolicitud, descripcionSolicitud, temaSolicitud, cargoSolicitud, correoSolicitud, estado, fecha, consecutivo, id) => db.collection("solicitud").doc(id).set({ nombreSolicitud, descripcionSolicitud, temaSolicitud, cargoSolicitud, correoSolicitud, estado, fecha, consecutivo })

const setReporte = (nombreReporte, infoReporte, resumenReporte, fechaReporte, idSolicitud) => db.collection("reporte").doc().set({ nombreReporte, infoReporte, resumenReporte, fechaReporte, idSolicitud });

const getReporte = () => db.collection("reporte").get()

const deleteReporteIndividual = (id) => db.collection("reporte").doc(id).delete()

const getTemaSolicitudall = (idTema) => db.collection("solicitud").where("temaSolicitud", "==", idTema).get();

const getReporteSolicitud = (idSolicitud) => db.collection("reporte").where("idSolicitud", "==", idSolicitud).get();

const getReporteNombre = (nombreReporte) => db.collection("reporte").where("nombreReporte", "==", nombreReporte).get();

const updateReporte = (nombreReporte, infoReporte, resumenReporte, fechaReporte, idSolicitud, id) => db.collection("reporte").doc(id).set({ nombreReporte, infoReporte, resumenReporte, fechaReporte, idSolicitud });

const getReporteDoc = (id) => db.collection("reporte").doc(id).get()

const getConsecutivo = () => db.collection("consecutivo").doc(idConsecutivo).get()

const updateConsecutivo = (consecutivo) => db.collection("consecutivo").doc(idConsecutivo).set({ consecutivo });

const setComentario = (id, comentario) => db.collection("comentario").doc(id).set({ comentario });

const getComentario = (id) => db.collection("comentario").doc(id).get();

const setFechaEntrega = (id, fecha) => db.collection("fechaEntrega").doc(id).set({ fecha });

const getFechaEntrega = (id) => db.collection("fechaEntrega").doc(id).get();

const setComentarioVigilancia = (id, comentario) => db.collection("comentarioVigilancia").doc(id).set({ comentario });

const getComentarioVigilancia = (id) => db.collection("comentarioVigilancia").doc(id).get();