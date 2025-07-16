"use client"
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
export default database
