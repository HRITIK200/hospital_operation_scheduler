// Import and configure Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-storage.js";

// Your Firebase config (replace with your own)
const firebaseConfig = {
  apiKey: "AIzaSyAd5A-d_9zgdx02P8It1boZPf9ZPhZhIYw",
  authDomain: "hospital-operation-sched-b486c.firebaseapp.com",
  projectId: "hospital-operation-sched-b486c",
  storageBucket: "hospital-operation-sched-b486c.firebasestorage.app",
  messagingSenderId: "1095885941975",
  appId: "1:1095885941975:web:390dde4c15cab5c17f1492"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
