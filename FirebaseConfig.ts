// Import the functions you need from the SDKs you need
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZVsNj8Ayn3A3CQLA4h1VJq1ajgChAzyA",
  authDomain: "proativo-c02f2.firebaseapp.com",
  projectId: "proativo-c02f2",
  storageBucket: "proativo-c02f2.firebasestorage.app",
  messagingSenderId: "285937887978",
  appId: "1:285937887978:web:82685111c724b4e715c593"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

