import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDQXgzsTUPpcjXlMwfLHa-FiXUlzxy4BEs",
  authDomain: "dafam1.firebaseapp.com",
  projectId: "dafam1",
  storageBucket: "dafam1.appspot.com",
  messagingSenderId: "597844090325",
  appId: "1:597844090325:web:db7aef8237f0bc0794b15c",
  databaseURL: "https://dafam1-default-rtdb.firebaseio.com",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

type CreateUserPayload = {
  email: string;
  password: string;
  displayName: string;
};
export async function createUser({
  email,
  password,
  displayName,
}: CreateUserPayload) {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;
  await updateProfile(user, {
    displayName,
  });
  return user;
}

export async function login({ email, password }) {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;
  return user;
}
