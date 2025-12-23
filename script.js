import { auth, db } from './firebase.js';

import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword 
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

import { 
  setDoc, 
  getDoc, 
  doc 
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";


// -----------------------------
// REGISTER USER WITH ROLE
// -----------------------------
document.getElementById("registerBtn").addEventListener("click", async () => {

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const role = document.getElementById("role").value;

  if (!email || !password || !role) {
    alert("Please fill all fields");
    return;
  }

  try {
    // Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Create USERS collection if missing, and add user role
    await setDoc(doc(db, "users", user.uid), {
      email: email,
      role: role
    });

    alert("Registration successful! You can now log in.");
  } catch (error) {
    alert(error.message);
  }
});


// -----------------------------
// LOGIN USER + ROLE REDIRECT
// -----------------------------
document.getElementById("loginBtn").addEventListener("click", async () => {

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  try {
    // Login user
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Get role from USERS collection
    const userRef = doc(db, "users", user.uid);
    const snap = await getDoc(userRef);

    if (!snap.exists()) {
      alert("User role not found in database!");
      return;
    }

    const role = snap.data().role;

    // Redirect based on role
    if (role === "admin") {
      window.location.href = "admin.html";
    } 
    else if (role === "doctor") {
      window.location.href = "doctor.html";
    } 
    else if (role === "patient") {
      window.location.href = "patient.html";
    } 
    else {
      alert("Invalid role stored.");
    }

  } catch (error) {
    alert(error.message);
  }
});
