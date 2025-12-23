import { db, auth } from "./firebase.js";
import { addDoc, collection } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

// Function to log any action performed by user
export async function logAction(action) {
  const currentUser = auth.currentUser;

  let email = "Unknown User";

  if (currentUser && currentUser.email) {
    email = currentUser.email;
  }

  try {
    await addDoc(collection(db, "logs"), {
      userEmail: email,
      action: action,
      timestamp: new Date().toISOString()
    });

    console.log("LOGGED ACTION:", action);
  } catch (error) {
    console.error("Error writing log:", error);
  }
}
