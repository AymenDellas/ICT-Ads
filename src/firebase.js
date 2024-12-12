import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAK3g3r3H5cM5TGnkTyD4hRAlZW8Xcoc6A",
  authDomain: "advertisments-ee5d0.firebaseapp.com",
  projectId: "advertisments-ee5d0",
  storageBucket: "advertisments-ee5d0.firebasestorage.app",
  messagingSenderId: "328477779785",
  appId: "1:328477779785:web:0149128a3f43b072a31c98",
  measurementId: "G-RSG7KZTDLK",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
