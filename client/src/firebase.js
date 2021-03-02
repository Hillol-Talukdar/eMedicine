import firebase from "firebase/app";
import "firebase/auth";

//Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCodKK6MIZbrENICS0dvySYfqE55rOSsWk",
    authDomain: "emedicine-e3e8f.firebaseapp.com",
    projectId: "emedicine-e3e8f",
    storageBucket: "emedicine-e3e8f.appspot.com",
    messagingSenderId: "597008919126",
    appId: "1:597008919126:web:ca718ee09fd7b02348e9f7",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleAuth = new firebase.auth.GoogleAuthProvider();
