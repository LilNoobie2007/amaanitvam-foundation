import admin from "firebase-admin";
import { readFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let serviceAccount;
try {
  const accountPath = path.join(__dirname, "../../../serviceAccountKey.json");
  serviceAccount = JSON.parse(await readFile(accountPath, "utf8"));
  
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
  }
} catch (error) {
  console.warn("Firebase Admin initialization skipped: serviceAccountKey.json not found.");
}

export default admin;