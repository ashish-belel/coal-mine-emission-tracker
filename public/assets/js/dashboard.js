import { auth } from './firebase-config.js';
import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-auth.js";

// Top-level listener that does not depend on auth state.
document.querySelector('.signout-btn').addEventListener('click', async () => {
  try {
    await signOut(auth);
    window.location.href = '../index.html';
  } catch (error) {
    console.error('Error signing out:', error);
  }
});

// Auth-dependent redirect logic stays inside the auth callback.
const currentUser = onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = '../index.html';
  }
});