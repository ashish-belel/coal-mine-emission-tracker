import { auth, db } from './firebase-config.js';
import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-auth.js";
import { doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-firestore.js";

const API_BASE = 'http://localhost:8080';

// Top-level listener that does not depend on auth state.
document.querySelector('#logout').addEventListener('click', async () => {
  try {
    await signOut(auth);
    window.location.href = '../index.html';
  } catch (error) {
    console.error('Error signing out:', error);
  }
});

// Auth-dependent logic stays inside the auth callback.
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = '../index.html';
    return;
  }

  const profileSnap = await getDoc(doc(db, "users", user.uid, "mineProfile", "data"));

  if (!profileSnap.exists()) {
    window.location.href = 'mine-profile.html';
    return;
  }

  const forestArea = parseFloat(profileSnap.data().forestArea);

  document.querySelector('#calculate-btn').addEventListener('click', async () => {
    const excavationVolume = parseFloat(document.querySelector('#excavation-volume').value);
    const coalExtracted = parseFloat(document.querySelector('#coal-extracted').value);
    const transportDistance = parseFloat(document.querySelector('#transport-distance').value);
    const fuelType = document.querySelector('#fuel-type').value;
    const equipmentHoursPerMonth = parseFloat(document.querySelector('#equipment-hours').value);
    const requestData = { excavationVolume, coalExtracted, transportDistance, fuelType, equipmentHoursPerMonth, forestArea };

    try {
      const response = await fetch(`${API_BASE}/api/emissions/gap-analysis`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }

      const data = await response.json();

      if (user) {
        await setDoc(doc(db, "users", user.uid, "lastCalculation", "data"), {
          excavationEmissions: data.excavationEmissions,
          transportEmissions: data.transportEmissions,
          equipmentEmissions: data.equipmentEmissions,
          totalEmissions: data.totalEmissions,
          carbonSink: data.carbonSink,
          gap: data.gap,
          status: data.status,
          calculatedAt: new Date().toISOString()
        });
        alert('Emissions calculated and saved successfully!');
      }
    } catch (error) {
      console.error('Error calculating emissions:', error);
      const errorEl = document.querySelector('#calc-error');

      if (error instanceof TypeError) {
        errorEl.textContent = 'Cannot reach server. Please check if the server is running.';
      } else {
        errorEl.textContent = 'Server error calculating emissions. Please try again.';
      }
    }
  });
});