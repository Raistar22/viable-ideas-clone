// src/lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBgv9FU8_zs-wAeUNXLRrHrmQfoMJRYqVs",
  authDomain: "viapro-f8280.firebaseapp.com",
  projectId: "viapro-f8280",
  storageBucket: "viapro-f8280.firebasestorage.app",
  messagingSenderId: "950918931805",
  appId: "1:950918931805:web:2e927f156a73578b2eb4b4",
  measurementId: "G-W59PYBRXS4"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export { auth, googleProvider, githubProvider };
