import firebase from "firebase/compat/app";
import { getFirestore } from "@firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBR5Gs1nazB-1tH9r6-FU855T1FrD_f6eY",
  authDomain: "endlessquiz-e5c0b.firebaseapp.com",
  projectId: "endlessquiz-e5c0b",
  storageBucket: "endlessquiz-e5c0b.appspot.com",
  messagingSenderId: "672953767220",
  appId: "1:672953767220:web:14e6695afb417b15410161",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
