import { initializeApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";

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
const db = getFirestore(app);

// Temporary Substitution for Firebase ----------------------------------------

class FireAuth implements IAuthenticator {
    authenticateUser(username: String, password: String): boolean {
        return true;
    }
    updateProfile(details: Object): void {
        throw new Error("Method not implemented.");
    }
}

class FireDB implements IDatabase {
    updateUserProfile(user: any): void {
        throw new Error("Method not implemented.");
    }
    getFeedData(): Object {
        throw new Error("Method not implemented.");
    }
    getUserProfile(): Object {
        throw new Error("Method not implemented.");
    }
    createPost(post: Post): void {
        throw new Error("Method not implemented.");
    }
    updatePost(post: Post): void {
        throw new Error("Method not implemented.");
    }
}

export { FireAuth, FireDB };
