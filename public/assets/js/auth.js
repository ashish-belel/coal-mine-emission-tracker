import { auth } from './firebase-config.js';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signOut
}
  from "https://www.gstatic.com/firebasejs/12.12.1/firebase-auth.js";

document.getElementById('login-btn')?.addEventListener('click', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = 'pages/dashboard.html';
  } catch (error) {
    document.getElementById('error-message').textContent = getErrorMessage(error.code);
  }
}); // login/signin

document.getElementById('register-link')?.addEventListener('click', () => {
  window.location.href = 'pages/register.html';
}); //opens registration page

onAuthStateChanged(auth, (user) => {
  if (user) {
    // Only redirect to dashboard when not already on a dashboard page
    if (!window.location.pathname.includes('dashboard.html')) {
      window.location.href = 'pages/dashboard.html';
    }
  }
});

document.getElementById('forgot-password-link')?.addEventListener('click', () => {
  const email = prompt('Please enter your email address:');
  if (email) {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        document.getElementById('error-message').textContent = 'Password reset email sent!';
      })
      .catch((error) => {
        document.getElementById('error-message').textContent = getErrorMessage(error.code);
      });
  }
});

function getErrorMessage(code) {
  switch(code) {
    case 'auth/user-not-found': return 'No account found with this email.';
    case 'auth/wrong-password': return 'Incorrect password.';
    case 'auth/invalid-email': return 'Please enter a valid email.';
    case 'auth/too-many-requests': return 'Too many attempts. Try again later.';
    default: return 'Something went wrong. Please try again.';
  }
}