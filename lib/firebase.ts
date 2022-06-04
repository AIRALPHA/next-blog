import { initializeApp } from "firebase/app"
import { getAuth } from "@firebase/auth"
import { getFirestore } from "@firebase/firestore"
import { getStorage } from "@firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyAg1XR0mdaGlfQO830MqrOY2aheLkkUhZg",
  authDomain: "next-blog-34de3.firebaseapp.com",
  projectId: "next-blog-34de3",
  storageBucket: "next-blog-34de3.appspot.com",
  messagingSenderId: "554431756448",
  appId: "1:554431756448:web:59d0b5da879dc99eb0b1c5",
  measurementId: "G-24HHY9SPFB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);
export const firestore = getFirestore(app);
