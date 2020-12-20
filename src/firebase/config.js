import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyAmBZksKY5Lz--5QCf6yezmM5jzjbjkpRQ",
    authDomain: "inventory-system-c88da.firebaseapp.com",
    databaseURL: "https://inventory-system-c88da.firebaseio.com",
    projectId: "inventory-system-c88da",
    storageBucket: "inventory-system-c88da.appspot.com",
    messagingSenderId: "310818480767",
    appId: "1:310818480767:web:fd8bb78ebc3f54035c554a",
    measurementId: "G-QJ4TYYK0R9"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
firebase.firestore().enablePersistence()
// firebase.analytics();

// export const firebase = firebase.firebase()
export const firestore = firebase.firestore()
export const auth = firebase.auth()