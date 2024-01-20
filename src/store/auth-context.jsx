import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

export const AuthContext = createContext({
  user: {},
  signUp: () => {},
});


const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState({});

  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser);
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const ctxValue = {
    user: user,
    signUp: signUp,
  };

  return (
    <AuthContext.Provider value={ctxValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
