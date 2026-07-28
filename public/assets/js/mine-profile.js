import { auth, db } from './firebase-config.js';
import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-auth.js";
import { doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-firestore.js";

// Top-level listeners that do not depend on auth state.
document.querySelector('#logout').addEventListener('click', async () => {
  try {
    await signOut(auth);
    window.location.href = '../index.html';
  } catch (error) {
    console.error('Error signing out:', error);
  }
});

document.querySelector('#save-profile').addEventListener('click', async () => {
  try {
    const mineName = document.querySelector('#mine-name').value;
    const mineType = document.querySelector('input[name="mine-type"]:checked').value;
    const state = document.querySelector('#mine-state').value;
    const annualOutput = document.querySelector('#annual-output').value;
    const forestArea = document.querySelector('#forest-area').value;
    const user = auth.currentUser;

    if (user) {
      await setDoc(doc(db, "users", user.uid, "mineProfile", "data"), {
        mineName, mineType, state, annualOutput, forestArea, timestamp: new Date()
      });
      alert('Mine profile saved successfully!');
    } else {
      alert('User not authenticated. Please log in again.');
      window.location.href = '../index.html';
    }
  } catch (error) {
    console.error('Error saving mine profile:', error);
    alert('Failed to save mine profile. Please try again.');
  }
});

// Auth-dependent logic stays inside the auth callback.
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = '../index.html';
    return;
  }

  const mineProfileRef = doc(db, "users", user.uid, "mineProfile", "data");
  const mineProfileSnap = await getDoc(mineProfileRef);

  if (mineProfileSnap.exists()) {
    const data = mineProfileSnap.data();
    document.querySelector('#mine-name').value = data.mineName || '';
    document.querySelector('#type-opencast').checked = data.mineType === 'opencast';
    document.querySelector('#type-underground').checked = data.mineType === 'underground';
    document.querySelector('#mine-state').value = data.state || '';
    document.querySelector('#annual-output').value = data.annualOutput || '';
    document.querySelector('#forest-area').value = data.forestArea || '';
    document.querySelector('#timestamp').value = data.timestamp || '';
  }
});
