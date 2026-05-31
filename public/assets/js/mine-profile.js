import { auth, db } from './firebase-config.js';
import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-firestore.js";

// Check authentication state and redirect if not authenticated

document.querySelector('.signout-btn').addEventListener('click', async () => {
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

document.querySelector('#save-profile').addEventListener('click', async () => {
  try {
    const mineName = document.querySelector('#mine-name').value;
    const location = document.querySelector('#location').value;
    const coalType = document.querySelector('#coal-type').value;
    const productionCapacity = document.querySelector('#production-capacity').value;
    const contactInfo = document.querySelector('#contact-info').value;
    const user = auth.currentUser;
    if (user) {
      const mineProfileRef = doc(db, 'mineProfiles', user.uid);
      await setDoc(doc(db, "users", user.uid, "mineProfile", "data"), {
        mineName, mineType, state, annualOutput, forestArea
      });
      alert('Mine profile saved successfully!');
    } else {
      alert('User not authenticated. Please log in again.');
      window.location.href = '../index.html';
    }
  }
  catch (error) {
    console.error('Error saving mine profile:', error);
    alert('Failed to save mine profile. Please try again.');
  }
});

// Load existing mine profile data on page load
window.addEventListener('DOMContentLoaded', async () => {
  try {
    const user = auth.currentUser;
    if (user) {
      const mineProfileRef = doc(db, 'mineProfiles', user.uid);
      const mineProfileSnap = await getDoc(mineProfileRef);
      if (mineProfileSnap.exists()) {
        const data = mineProfileSnap.data();
        document.querySelector('#mine-name').value = data.mineName || '';
        document.querySelector('#type-opencast').value = data.mineType || '';
        document.querySelector('#type-underground').value = data.mineType || '';
        document.querySelector('#mine-state').value = data.state || '';
        document.querySelector('#annual-output').value = data.annualOutput || '';
        document.querySelector('#forest-area').value = data.forestArea || '';
        // document.querySelector('#contact-info').value = data.contactInfo || '';
      }
    }
  } catch (error) {
    console.error('Error loading mine profile:', error);
  }
});
