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
import { db, auth, storage } from "../firebase";
import { setDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

export const AuthContext = createContext({
  user: {},
  signUp: () => {},
  signIn: () => {},
  logout: () => {},
  updateDisplayName: () => {},
  deleteCurrUser: () => {},
  updateUsersPassword: () => {},
  updateUserAvatar: () => {},
});

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  const signUp = (email, password) => {
    console.log("Event to firebase occured");

    return createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredidencial) => {
        console.log(userCredidencial);
        await setDoc(doc(db, "users", userCredidencial.user.uid), {
          userID: userCredidencial.user.uid,
          name: userCredidencial.user.displayName,
          email: userCredidencial.user.email,
          createdAt: userCredidencial.user.metadata.creationTime,
          projectsIDs: [],
          avatar: userCredidencial.user.photoURL,
        });
      });
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
    };

  const logout = () => {
    console.log("Event to firebase occured");

    return signOut(auth);
  };

  const updateDisplayName = (dislplayName) => {
    console.log("Event to firebase occured");

    updateDisplayNameInDB(dislplayName);
    return updateProfile(user, { displayName: dislplayName });
  };

  const updateDisplayNameInDB = async (dislplayName) => {
    console.log(user);
    try {
      console.log("Event to firebase occured");

      await updateDoc(doc(db, "users", user.uid), {
        name: dislplayName,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCurrUser = () => {
    console.log("Event to firebase occured");
    deleteUserFromDB();
    return deleteUser(user);
  };

  const deleteUserFromDB = async () => {
    try {
      console.log("Event to firebase occured");
      await deleteDoc(doc(db, "users", user.uid));
    } catch (error) {
      console.log(error);
    }
  };

  const updateUserAvatar = async (file) => {
    const fileRef = ref(storage, `avatars/${user.uid}.png`);
    let photoURL = "";
    try {
      await uploadBytes(fileRef, file);
      photoURL = await getDownloadURL(fileRef);
    } catch (e) {
      console.log(e);
    }

    return updateProfile(user, { photoURL }).then(() => {
      location.reload();
    });
  };

  const updateUsersPassword = (newPassword) => {
    console.log("Event to firebase occured");

    return updatePassword(user, newPassword);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Event to firebase occured");

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
    updateUserAvatar: updateUserAvatar,
  };

  return (
    <AuthContext.Provider value={ctxValue}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
