import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyB3APTuYq8-eyK0s3MWcAcE4sDD-PA73ns",
  authDomain: "college-lost-found-c0914.firebaseapp.com",
  databaseURL: "https://college-lost-found-c0914-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "college-lost-found-c0914",
  storageBucket: "college-lost-found-c0914.firebasestorage.app",
  messagingSenderId: "50898294829",
  appId: "1:50898294829:web:be7c1e3fa01b5532c000a4"
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);