import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { FirebaseAuth } from "@/services/firebase/config";
import { User, UserRegistrationData } from "@/types";
import { COLLECTION_USERS } from "@/lib/constants";
import { getDocumentById, updateDocument } from "@/services/firebase/helper";

const googleProvider = new GoogleAuthProvider();

export const getUserById = async (userId: string) => {
  try {
    const user = await getDocumentById<User>(COLLECTION_USERS, userId);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (e) {
    console.error(e);
    return null;
  }
};

const verifyEmail = async () => {
  const { currentUser } = FirebaseAuth;
  try {
    if (!currentUser) {
      throw Error("No user");
    }

    await sendEmailVerification(currentUser);
    console.log("email sent");
  } catch (e) {
    console.error(e);
  }
};

// AUTHENTICATION
export const logIn = async (email: string, password: string) => {
  try {
    const result = await signInWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    );
    return result.user.uid;
  } catch (e) {
    console.error(e);
  }
};

export const logInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(FirebaseAuth, googleProvider);

    return result.user.uid;
  } catch (e) {
    console.error(e);
  }
};

export const register = async (registerData: UserRegistrationData) => {
  try {
    const { email, password, ...userData } = registerData;

    const result = await createUserWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    );

    const newUser: User = {
      id: result.user.uid,
      email,
      ...userData,
    };
    await updateDocument(COLLECTION_USERS, newUser.id, newUser);

    verifyEmail();
    return newUser;
  } catch (e) {
    console.error(e);
  }
};

type UserFn = (user: User | null) => void;

export const onAuthStateHasChanged = (setUser: UserFn) => {
  const unsubscribe = onAuthStateChanged(FirebaseAuth, async (authUser) => {
    console.log(authUser);
    if (authUser) {
      try {
        const user = await getUserById(authUser.uid);
        setUser(user);
      } catch (error) {
        setUser(null);
      }
    } else {
      setUser(null);
    }
  });
  return unsubscribe;
};

export const logout = async () => await FirebaseAuth.signOut();
