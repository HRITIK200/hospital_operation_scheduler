import { db, auth } from "./firebase.js";
import { 
  addDoc,
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc 
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

import { logAction } from "./logger.js";


// ----------------------
// ADD NEW OPERATION
// ----------------------
document.getElementById("addOperationBtn").addEventListener("click", async () => {
    const patientName = document.getElementById("patientName").value;
    const doctorName = document.getElementById("doctorName").value;
    const otId = document.getElementById("otId").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    const anesthesia = document.getElementById("anesthesia").value;
    const remarks = document.getElementById("remarks").value;

    if (!patientName || !doctorName || !otId || !date || !time) {
        alert("Please fill all required fields");
        return;
    }

    await addDoc(collection(db, "operations"), {
        patientName,
        doctorName,
        otId,
        date,
        time,
        anesthesia,
        remarks,
        status: "Pending",
        createdAt: new Date().toISOString()
    });

    await logAction(`Admin added operation for ${patientName}`);

    alert("Operation added successfully!");
    loadOperations();
});


// ----------------------
// LOAD ALL OPERATIONS
// ----------------------
async function loadOperations() {
    const tableBody = document.getElementById("operationList");
    tableBody.innerHTML = "";

    const querySnapshot = await getDocs(collection(db, "operations"));
    querySnapshot.forEach((docSnap) => {
        const data = docSnap.data();

        const row = `
            <tr>
                <td>${data.patientName}</td>
                <td>${data.doctorName}</td>
                <td>${data.otId}</td>
                <td>${data.date}</td>
                <td>${data.time}</td>
                <td>${data.anesthesia}</td>
                <td>${data.remarks}</td>
                <td><strong>${data.status}</strong></td>
                
                <td>
                    <button class="complete-btn" onclick="markCompleted('${docSnap.id}', '${data.patientName}')">Complete</button>
                    <button class="delete-btn" onclick="deleteOperation('${docSnap.id}', '${data.patientName}')">Delete</button>
                </td>
            </tr>
        `;

        tableBody.innerHTML += row;
    });
}
loadOperations();


// ----------------------
// MARK OPERATION AS COMPLETED
// ----------------------
window.markCompleted = async (id, patientName) => {
    await updateDoc(doc(db, "operations", id), {
        status: "Completed"
    });

    await logAction(`Operation marked as completed for ${patientName}`);

    alert("Marked as completed");
    loadOperations();
};


// ----------------------
// DELETE OPERATION
// ----------------------
window.deleteOperation = async (id, patientName) => {
    if (!confirm("Are you sure you want to delete this operation?")) return;

    await deleteDoc(doc(db, "operations", id));

    await logAction(`Operation deleted for ${patientName}`);

    alert("Operation deleted");
    loadOperations();
};
