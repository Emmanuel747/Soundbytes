import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAJ9HdGf3c7Y-jK1CDWQPtmHR8vHzwfgpo",
    authDomain: "notify-soundbytes.firebaseapp.com",
    projectId: "notify-soundbytes",
    storageBucket: "notify-soundbytes.appspot.com",
    messagingSenderId: "421047656428",
    appId: "1:421047656428:web:4dd7687cba51cf7eb76ac9",
    measurementId: "G-FDMLBBMXM2",
};

const app = initializeApp(firebaseConfig);
const FireAuth = getAuth(app);
const FireDB = getFirestore(app);
const FireStorage = getStorage(app);

export { FireAuth, FireDB, FireStorage };
