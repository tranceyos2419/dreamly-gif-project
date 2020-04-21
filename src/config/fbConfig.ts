
import firebase from "firebase/app";
import { createFirestoreInstance } from "redux-firestore";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage"
import store from "../redux/store";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API,
  authDomain: "dreamly-gif-project.firebaseapp.com",
  databaseURL: "https://dreamly-gif-project.firebaseio.com",
  projectId: "dreamly-gif-project",
  storageBucket: "dreamly-gif-project.appspot.com",
  messagingSenderId: "766495470500",
  appId: "1:766495470500:web:c76c459448472dece64731",
  measurementId: "G-BQMETBC1M2"
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();


const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true,
  enableClaims: true
};

export const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance
};
