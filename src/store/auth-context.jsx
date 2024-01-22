import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

export const AuthContext = createContext({
  user: {},
  signUp: () => {},
  signIn: () => {},
  logout: () => {},
});


const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);

  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => { 
    return signInWithEmailAndPassword(auth, email, password);
  }

  const logout = () => {
    return signOut(auth);
  }


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser);
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const ctxValue = {
    user: user,
    signUp: signUp,
    signIn: signIn,
    logout: logout,
  };

  return (
    <AuthContext.Provider value={ctxValue}>{!loading && children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
