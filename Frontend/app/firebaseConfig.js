// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyD7BDSs0Q_1wPKG2XTPvRbqLO7rnR-paIs",
    authDomain: "abcd-53b0b.firebaseapp.com",
    projectId: "abcd-53b0b",
    storageBucket: "abcd-53b0b.firebasestorage.app",
    messagingSenderId: "805064190716",
    appId: "1:805064190716:web:5e6f1ea761c9db6c7fc579",
    measurementId: "G-PY47R7EKMB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics only if supported
let analytics = null;
if (typeof window !== 'undefined') {
    isSupported().then(supported => {
        if (supported) {
            analytics = getAnalytics(app);
        }
    }).catch(err => {
        console.log('Analytics not supported:', err);
    });
}

export default app;
export { analytics };
