// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAm7V7ESIz4vSlNKTRFsEfAJhtMZ9F0nmY",
  authDomain: "african-aspirations.firebaseapp.com",
  projectId: "african-aspirations",
  storageBucket: "african-aspirations.appspot.com",
  messagingSenderId: "544050341508",
  appId: "1:544050341508:web:9f28cb9f80c6755f7d44d1",
  measurementId: "G-RNQBX711CD",
};

// Initialize Firebase

let app = null;

if (!firebase.apps.length) {
  app = firebase.initializeApp(firebaseConfig);
}

export default firebase;
