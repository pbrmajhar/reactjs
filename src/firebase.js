import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBJ8MwWZOfgiRgkz_yLx3S2xI7dZEVp_-c",
  authDomain: "ecom-a945b.firebaseapp.com",
  projectId: "ecom-a945b",
  storageBucket: "ecom-a945b.appspot.com",
  messagingSenderId: "248710618201",
  appId: "1:248710618201:web:a8f58232988dc8a4aea548",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
