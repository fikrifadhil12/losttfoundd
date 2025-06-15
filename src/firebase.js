// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Konfigurasi Firebase Anda
const firebaseConfig = {
  apiKey: "AIzaSyDe2FJbd4Ty8Sg5XFmS00imgqJvYTbpEQ0",
  authDomain: "lost-found-61d0c.firebaseapp.com",
  projectId: "lost-found-61d0c",
  messagingSenderId: "247315226129",
  appId: "1:247315226129:web:ad0cbd295fcc85fc49dbb0",
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
