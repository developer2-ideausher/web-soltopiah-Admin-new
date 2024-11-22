// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD8mMYebBiG3vVR0SjuS0toPFS_RQNN2u8",
  authDomain: "soltopiah.firebaseapp.com",
  projectId: "soltopiah",
  storageBucket: "soltopiah.appspot.com",
  messagingSenderId: "403682641442",
  appId: "1:403682641442:web:7eb2e904e04694fd56ec7b",
  measurementId: "G-2RPQ91V16E"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export {auth, googleProvider};