// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAEIx7HnE4KMbEk_FbTOFf3Hv5Hz0-hjOk",
  authDomain: "plastic-recycling-23edd.firebaseapp.com",
  projectId: "plastic-recycling-23edd",
  storageBucket: "plastic-recycling-23edd.firebasestorage.app",
  messagingSenderId: "574609296655",
  appId: "1:574609296655:web:31cf5772d859efa8e3827a"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, auth, firestore, storage };
