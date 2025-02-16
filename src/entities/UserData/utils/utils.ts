import bcrypt from "bcryptjs";
import Cookies from "js-cookie";
import { collection, doc, getDoc } from "firebase/firestore";

import { db } from "shared/config";

const SECRET_KEY = import.meta.env.VITE_SECRET_KEY as string;

export const getUserData = async (username: string) => {
  const userRef = doc(collection(db, "users"), username);
  const docSnap = await getDoc(userRef);
  return docSnap.exists() ? docSnap.data() : null;
};

export const comparePassword = (password: string, hashedPassword: string) => {
  return bcrypt.compareSync(password, hashedPassword);
};

export const handleLogin = async (username: string, password: string) => {
  const userData = await getUserData(username);
  if (userData && comparePassword(password, userData.password)) {
    const token = btoa(`${username}:${SECRET_KEY}`);
    Cookies.set("token", token, { expires: 1 });
    return { success: true };
  } else {
    throw new Error("Invalid username or password");
  }
};

export const verifyToken = (token: string) => {
  try {
    const decoded = atob(token);
    const [username, secret] = decoded.split(":");

    console.log("User: ", username);
    return secret === SECRET_KEY;
  } catch (e: unknown) {
    console.error(e);
    return false;
  }
};
