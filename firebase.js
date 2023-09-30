import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-analytics.js";


const firebaseConfig = {
  apiKey: "AIzaSyDhxVIw7mfoOulrueHmDJGL2e4k9x1NxaA",
  authDomain: "login-and-register-form-b55bd.firebaseapp.com",
  projectId: "login-and-register-form-b55bd",
  storageBucket: "login-and-register-form-b55bd.appspot.com",
  messagingSenderId: "772625197568",
  appId: "1:772625197568:web:772db06ecbe3d794a606e5",
  measurementId: "G-K7BWZTQM7V"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);