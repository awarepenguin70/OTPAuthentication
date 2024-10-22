// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD3Ak8_Meh5Z8HnExsfvJRUw3nU7Hd57cY",
    authDomain: "otp-authentication-app-ec233.firebaseapp.com",
    projectId: "otp-authentication-app-ec233",
    storageBucket: "otp-authentication-app-ec233.appspot.com",
    messagingSenderId: "688055167141",
    appId: "1:688055167141:web:4560b5e66eb9cb23d0ed0d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
