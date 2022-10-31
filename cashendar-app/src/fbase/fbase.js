// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCvE-Pn3BNxOtULQch7SLvQE27rFxHP_DI",
    authDomain: "cashendar-a418e.firebaseapp.com",
    projectId: "cashendar-a418e",
    storageBucket: "cashendar-a418e.appspot.com",
    messagingSenderId: "774588622828",
    appId: "1:774588622828:web:7c13b136c16749696542c9",
    measurementId: "G-FZ191ZC8JP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
