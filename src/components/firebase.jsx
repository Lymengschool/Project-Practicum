import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signOut } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { signInWithRedirect, signInWithPopup, FacebookAuthProvider, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBl6rvFMcaoh0P87U3lhmgSQkSgjTwyOzg",
  authDomain: "jai-typi.firebaseapp.com",
  projectId: "jai-typi",
  storageBucket: "jai-typi.appspot.com",
  messagingSenderId: "978339587144",
  appId: "1:978339587144:web:899c827c22d6f0b62fe47d",
  measurementId: "G-ST3BWXETBF",
  databaseURL: "https://jai-typi-default-rtdb.asia-southeast1.firebasedatabase.app"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getDatabase();

export {
  signOut,
  app,
  auth,
  GoogleAuthProvider,
  database,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  set,
  signInWithRedirect,
  signInWithPopup,
  ref,
  FacebookAuthProvider,
  onAuthStateChanged
};
