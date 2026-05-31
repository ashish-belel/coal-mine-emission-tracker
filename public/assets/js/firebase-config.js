import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-firestore.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyBKX8O3CewRBoZQWxH13DELflo4UppGUjg",
  authDomain: "greenmine-c91db.firebaseapp.com",
  projectId: "greenmine-c91db",
  storageBucket: "greenmine-c91db.firebasestorage.app",
  messagingSenderId: "168155039850",
  appId: "1:168155039850:web:5274f6d82643beb7a62213",
  measurementId: "G-Z8ND1L4VFC"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);