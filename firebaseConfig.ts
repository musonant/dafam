import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDQXgzsTUPpcjXlMwfLHa-FiXUlzxy4BEs",
  authDomain: "dafam1.firebaseapp.com",
  projectId: "dafam1",
  storageBucket: "dafam1.appspot.com",
  messagingSenderId: "597844090325",
  appId: "1:597844090325:web:db7aef8237f0bc0794b15c",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export async function createUser({ email, password }) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    return user;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
  }
}

export async function login({ email, password }) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    return user;
  } catch (error) {
    console.log("error", error);
    const errorCode = error.code;
    const errorMessage = error.message;
  }
}
