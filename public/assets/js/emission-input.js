import { auth, db } from './firebase-config.js';
import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-auth.js";
import { doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-firestore.js";

const API_BASE = 'http://localhost:8080';
document.querySelector('#logout').addEventListener('click', async () => {
  try {
    await signOut(auth);
    window.location.href = '../index.html'; // Redirect to homepage after sign out
  } catch (error) {
    console.error('Error signing out:', error);
  }
});
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = '../index.html';
    return;
  }
  // Load forestArea from mine profile
  const profileSnap = await getDoc(doc(db, "users", user.uid, "mineProfile", "data"));
  if (!profileSnap.exists()) {
    window.location.href = 'mine-profile.html';
    return;
  }
  const forestArea = parseFloat(profileSnap.data().forestArea);
  //Collect and send:
  // When calculate button is clicked, collect all field values, build a request object, send to your Spring Boot API
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

      const excavationResult = document.querySelector('#excavation-result').textContent =
        `Excavation: ${data.excavationEmissions.toFixed(2)} tCO₂`;
      const transportResult = document.querySelector('#transport-result').textContent =
        `Transport: ${data.transportEmissions.toFixed(2)} tCO₂`;
      const equipmentResult = document.querySelector('#equipment-result').textContent =
        `Equipment: ${data.equipmentEmissions.toFixed(2)} tCO₂`;
      const totalResult = document.querySelector('#total-result').textContent =
        `Total: ${data.totalEmissions.toFixed(2)} tCO₂`;
      document.querySelector('#calc-error').textContent = ''; // Clear any previous errors

      if (user) {
        await setDoc(doc(db, "users", user.uid, "lastCalculation", "data"), {
          excavationResult, transportResult, equipmentResult, totalResult, timestamp: new Date()
        });
        alert('Emissions calculated and saved successfully!');
      }
      else {
        alert('User not authenticated. Please log in again.');
        window.location.href = '../index.html';
      }

    } catch (error) {
      console.error('Error calculating emissions:', error);
      const errorEl = document.querySelector('#calc-error');

      if (error instanceof TypeError) {
        // This runs when fetch fails completely: Spring Boot not running, no internet, CORS
        errorEl.textContent = 'Cannot reach server. Please check if the server is running.';
      } else {
        // This runs when server responded with 4xx/5xx and you threw an Error
        errorEl.textContent = 'Server error calculating emissions. Please try again.';
      }
    }
  });
});