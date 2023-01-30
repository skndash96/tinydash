import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import { getAuth, onAuthStateChanged, setPersistence, browserLocalPersistence, signInAnonymously, linkWithCredential, EmailAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";
import { getFirestore, doc, getDoc, getDocs, query, where, setDoc, deleteDoc, collection } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-analytics.js";
  
const firebaseConfig = {
  apiKey: "AIzaSyA4Xlv-i28NulZY8woCK6XEXPYQNyPFhvQ",
  authDomain: "tinydash96.firebaseapp.com",
  projectId: "tinydash96",
  storageBucket: "tinydash96.appspot.com",
  messagingSenderId: "1086971753375",
  appId: "1:1086971753375:web:9ed8e7c0a98f5cd1b703aa",
  measurementId: "G-G81XV4RQGX"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
getAnalytics(app);

export {
  auth, onAuthStateChanged, setPersistence, browserLocalPersistence, signInAnonymously, linkWithCredential, EmailAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile,
  db, collection, doc, getDoc, getDocs, query, where, setDoc, deleteDoc
};