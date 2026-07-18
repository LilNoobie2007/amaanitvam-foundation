import admin from "firebase-admin";
import { cert } from "firebase-admin/app"; // Modern ES import for credentials
import { readFile } from "fs/promises";
import path from "path";

let serviceAccount;
try {
  // Bulletproof pathing using process.cwd()
  const accountPath = path.join(process.cwd(), "serviceAccountKey.json");
  serviceAccount = JSON.parse(await readFile(accountPath, "utf8"));
  
  // Safe initialization avoiding the undefined length crash
  if (!admin.apps?.length) {
    admin.initializeApp({
      credential: cert(serviceAccount) // Using the modular cert() directly
    });
  }
} catch (error) {
  console.error("🚨 ACTUAL FIREBASE ERROR:", error);
  console.warn("Firebase Admin initialization skipped: serviceAccountKey.json not found.");
}

// Exporting the default admin object so the rest of your app doesn't break
export default admin;