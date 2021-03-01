import * as firebase from "firebase";

//Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD0Sz4PXKsfwznGmXlba0rGJX-AySc2wNc",
    authDomain: "emedicine-65d6b.firebaseapp.com",
    projectId: "emedicine-65d6b",
    storageBucket: "emedicine-65d6b.appspot.com",
    messagingSenderId: "177408270823",
    appId: "1:177408270823:web:60c1d64dacf1a1d7285d42",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleAuth = new firebase.auth.googleAuth();
