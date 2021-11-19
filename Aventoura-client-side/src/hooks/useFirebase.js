import {
  getAuth,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
} from "firebase/auth";
import initializeFirebase from "../firebase/firebase.init";
import { useEffect, useState } from "react";

initializeFirebase();

const provider = new GoogleAuthProvider();

const useFirebase = () => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const auth = getAuth();

  const signInUsingGoogle = () => {
    return signInWithPopup(auth, provider);
  };

  const logOut = () => {
    setIsLoading(true);
    signOut(auth).then(() => {
      setUser({});
      setIsLoading(false);
    });
  };

  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser({});
      }
      setIsLoading(false);
    });

    return () => unsubscribed;
  }, []);

  return {
    signInUsingGoogle,
    logOut,
    user,
    setUser,
    isLoading,
    setIsLoading,
  };
};

export default useFirebase;
