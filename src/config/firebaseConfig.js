import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDesL2lbZWCt6WYip8wOdFjjorC8RIM-7I",
    authDomain: "webapp-d208b.firebaseapp.com",
    projectId: "webapp-d208b",
    storageBucket: "webapp-d208b.appspot.com",
    messagingSenderId: "201791622838",
    appId: "1:201791622838:web:f29fffd49d5333dcc6e017",
    measurementId: "G-F5FZ849ZQX"
  };

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);

export { db };