import { auth } from './firebase-config.js';
import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-auth.js";

document.querySelector('.signout-btn').addEventListener('click', async() => {
  try {
    await signOut(auth);
    window.location.href = '../index.html'; // Redirect to homepage after sign out
  } catch (error) {
    console.error('Error signing out:', error);
  }
});

const currentUser = onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = '../index.html'; // Redirect to homepage if not authenticated
  }
});