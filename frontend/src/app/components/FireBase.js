import { initializeApp } from "firebase/app";
import {Database, getDatabase} from "firebase/database"
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDdlbXrsLI60ZblmOhJnb14vSWi9GBfyho",
  authDomain: "y3project-d8b42.firebaseapp.com",
  projectId: "y3project-d8b42",
  storageBucket: "y3project-d8b42.firebasestorage.app",
  messagingSenderId: "961501041725",
  appId: "1:961501041725:web:ffae89ec86be67ced1c654"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);
export { auth }
export default database
setPersistence(auth, browserLocalPersistence).catch(console.error);

{/*"use client"
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {Database, getDatabase} from "firebase/database"
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCmjQ9DV3iWL4BGAybRiPEawl2sS0FsJeU",
  authDomain: "android2projectliornoyavraham.firebaseapp.com",
  projectId: "android2projectliornoyavraham",
  storageBucket: "android2projectliornoyavraham.firebasestorage.app",
  messagingSenderId: "27207264947",
  appId: "1:27207264947:web:982ff49818d1d0dde9dec6",
  measurementId: "G-73RGZLF78T"};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);
export { auth }
export default database*/}
