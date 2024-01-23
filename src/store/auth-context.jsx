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
import { db, auth } from "../firebase";
import { setDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";

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
    return createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredidencial) => {
        console.log(userCredidencial);
        await setDoc(doc(db, "users", userCredidencial.user.uid), {
          userID: userCredidencial.user.uid,
          name: userCredidencial.user.displayName,
          email: userCredidencial.user.email,
          createdAt: userCredidencial.user.metadata.creationTime,
          projectsIDs: [],
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  const updateDisplayName = (dislplayName) => {
    return updateProfile(user, { displayName: dislplayName })
      .then(async (userCredidencial) => {
        await updateDoc(doc(db, "users", userCredidencial.user.uid), {
          name: dislplayName,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteCurrUser = () => {
    return deleteUser(user)
      .then(async (userCredidencial) => {
        await deleteDoc(doc(db, "users", userCredidencial.user.uid));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateUsersPassword = (newPassword) => {
    return updatePassword(user, newPassword);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // console.log(currentUser);
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
