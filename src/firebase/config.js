// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDvlFxlZr85Az1MzBl0Y6_cbtdUhkwT0YQ",
  authDomain: "todo-web-3ddbc.firebaseapp.com",
  projectId: "todo-web-3ddbc",
  storageBucket: "todo-web-3ddbc.appspot.com",
  messagingSenderId: "798688575101",
  appId: "1:798688575101:web:2a403ebf9dbd6ede643b14"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {app, db}