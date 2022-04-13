// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";
// import React from "react";

const firebaseConfig = {
  apiKey: "AIzaSyCBhommOrqvXhxGnKZBUjM0waIFS4UhGp0",
  authDomain: "whatsup-6a360.firebaseapp.com",
  projectId: "whatsup-6a360",
  storageBucket: "whatsup-6a360.appspot.com",
  messagingSenderId: "14352651395",
  appId: "1:14352651395:web:a9cfa646e26f71db2ef7b6",
  measurementId: "G-PC7FD5KCVP",
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);

const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider(auth);

export { auth, provider };
export default db;
