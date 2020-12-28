import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

let firebaseConfig = {
  apiKey: "AIzaSyCKRzfVtPNKoaFRl9xhdHFTEM5C81_hkfE",
  authDomain: "gameigo-1890c.firebaseapp.com",
  projectId: "gameigo-1890c",
  storageBucket: "gameigo-1890c.appspot.com",
  messagingSenderId: "581146013271",
  appId: "1:581146013271:web:6580db0f745920e5edbd12",
  measurementId: "G-HW85YXWZ6Q",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
