import { auth, db } from "./firebase.js";
import { signOut } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";
import { logAction } from "./logger.js";


document.getElementById("logoutBtn").addEventListener("click", async () => {
  await logAction("Patient logged out");
  signOut(auth).then(() => {
    alert("Logged out!");
    window.location.href = "index.html";
  });
});

document.getElementById("loadBtn").addEventListener("click", async () => {
  const patientName = document.getElementById("patientName").value.trim();
  if (!patientName) {
    alert("Enter your name!");
    return;
  }

  const operationList = document.getElementById("operationList");
  operationList.innerHTML = "";

  const querySnapshot = await getDocs(collection(db, "operations"));
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    if (data.patientName.toLowerCase() === patientName.toLowerCase()) {
      const row = `
        <tr>
          <td>${data.doctorName}</td>
          <td>${data.otId}</td>
          <td>${data.date}</td>
          <td>${data.time}</td>
          <td>${data.anesthesia}</td>
          <td>${data.remarks}</td>
        </tr>
      `;
      operationList.innerHTML += row;
    }
  });

  if (!operationList.innerHTML) {
    operationList.innerHTML = "<tr><td colspan='6'>No operation found</td></tr>";
  }
  await logAction(`Patient viewed operation details: ${patientName}`);
});
