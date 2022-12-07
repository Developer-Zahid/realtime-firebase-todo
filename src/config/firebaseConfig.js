// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDM26ctItN90eF8y2wXHkSJSH40ZjCj8lM",
  authDomain: "realtime-todo-a6a1a.firebaseapp.com",
  projectId: "realtime-todo-a6a1a",
  storageBucket: "realtime-todo-a6a1a.appspot.com",
  messagingSenderId: "285441950453",
  appId: "1:285441950453:web:2e2c286fb7676e0298fbbc"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export default firebaseConfig