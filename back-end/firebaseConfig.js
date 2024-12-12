const { initializeApp } = require("firebase/app");
const { getStorage } = require("firebase/storage");

// Tu configuración de Firebase (la encuentras en Firebase Console)
const firebaseConfig = {
    apiKey: "AIzaSyBFiFTImBtimxac7GlCxbMP1RSH5D6jeVg",
    authDomain: "alogar-storage-dc191.firebaseapp.com",
    projectId: "alogar-storage-dc191",
    storageBucket: "alogar-storage-dc191.firebasestorage.app",
    messagingSenderId: "784080886028",
    appId: "1:784080886028:web:9220cb689eb181a9551129",
    measurementId: "G-SCXQF2ESBP"
};

// Inicializar Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Obtener el servicio de Storage
const storage = getStorage(firebaseApp);

module.exports = { storage };