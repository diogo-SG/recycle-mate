import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "sg-recyclemate.firebaseapp.com",
  projectId: "sg-recyclemate",
  storageBucket: "sg-recyclemate.appspot.com",
  messagingSenderId: "242075171441",
  appId: "1:242075171441:web:8d870cafdc6eb990d879d0",
  measurementId: "G-G8ZWG0XDRY",
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);
export const functions = getFunctions(app);

connectFirestoreEmulator(firestore, document.location.hostname, 8080);
connectFunctionsEmulator(functions, document.location.hostname, 5001);
connectAuthEmulator(auth, `http://${document.location.hostname}:9099`);
