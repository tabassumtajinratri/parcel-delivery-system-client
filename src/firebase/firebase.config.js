import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain:import.meta.env.VITE_authDomain ,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);

 export const auth= getAuth();

//  "rewrites": [
//           {
//             "source": "**",
//             "destination": "/index.html"
//           }
//         ],
