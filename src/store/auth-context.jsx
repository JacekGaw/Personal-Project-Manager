import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  updatePassword,
  deleteUser,
  updateProfile,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase";

export const AuthContext = createContext({
  user: {},
  signUp: () => {},
  signIn: () => {},
  logout: () => {},
  updateDisplayName: () => {},
  deleteCurrUser: () => {},
  updateUsersPassword: () => {},
});

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  const updateDisplayName = (dislpayName) => {
    return updateProfile(user, { displayName: dislpayName });
  };

  const deleteCurrUser = () => {
    return deleteUser(user);
  };

  const updateUsersPassword = (newPassword) => {
    return updatePassword(user, newPassword);
  };

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
    updateDisplayName: updateDisplayName,
    deleteCurrUser: deleteCurrUser,
    updateUsersPassword: updateUsersPassword,
  };

  return (
    <AuthContext.Provider value={ctxValue}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
