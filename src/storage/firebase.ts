// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDM8XQhmtADn8rWfDZEa70ZJrJeWVDYCGw',
  authDomain: 'reactfp-89cea.firebaseapp.com',
  projectId: 'reactfp-89cea',
  storageBucket: 'reactfp-89cea.appspot.com',
  messagingSenderId: '213505899475',
  appId: '1:213505899475:web:03f6b9e7e907d713360d26',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
