// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBN48jvAMa_ozkW0tRg1yf9cTiqgbjKuLs",
  authDomain: "bookapp-670d6.firebaseapp.com",
  projectId: "bookapp-670d6",
  storageBucket: "bookapp-670d6.appspot.com",
  messagingSenderId: "981616781746",
  appId: "1:981616781746:web:88827cd555f7e442e29cab",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export { auth, db };
