// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import firebase from "firebase/compat/app";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAnAqUaEgmIgvLdYYJbuA2Cm1WTMqT3DrI",
  authDomain: "oauthweb-2.firebaseapp.com",
  projectId: "oauthweb-2",
  storageBucket: "oauthweb-2.appspot.com",
  messagingSenderId: "797942299093",
  appId: "1:797942299093:web:f600e699e4500ec6ba655c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
