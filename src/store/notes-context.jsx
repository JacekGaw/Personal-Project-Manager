import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  Timestamp,
  setDoc,
  deleteDoc,
  updateDoc,
  orderBy,
} from "firebase/firestore";

export const NotesContext = createContext({
  currentLoggedUser: {},
  notes: [],
  addNote: () => {},
  deleteNote: () => {},
});

const NotesContextProvider = ({ children }) => {
  const [currentLoggedUser, setCurrentLoggedUser] = useState();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadNotes = async (currentUser) => {
    if (currentUser !== null) {
      console.log("Event to firebase occured");
      const notesFirebase = collection(db, "NotesCollection");
      const q = query(notesFirebase, where("authorID", "==", currentUser.uid), orderBy("created", "desc"));
      const querySnapshot = await getDocs(q);
      let arr = [];
      if (querySnapshot) {
        querySnapshot.forEach((doc) => {
          arr = [...arr, { id: doc.id, ...doc.data() }];
        });
      }
      setNotes(arr);
    }
  };

  const addNote = (title, note, assign) => {
    console.log("Event to firebase occured");
    const noteData = {
      title: title,
      noteText: note,
      assign: assign,
      authorID: currentLoggedUser.uid,
      created: Timestamp.fromDate(new Date()),
      files: [],
    };
    const newNoteRef = doc(collection(db, "NotesCollection"));
    return setDoc(newNoteRef, noteData).then(
      () => {
        setNotes((prevStatus) => {
          return [...prevStatus, { id: newNoteRef.id, ...noteData }];
        });
      },
      (err) => console.log(err)
    );
  };

  const deleteNote = (noteID) => {
    return deleteDoc(doc(db, "NotesCollection", noteID)).then(
      () => {
        const arr = notes.filter((note) => note.id !== noteID);
        setNotes(arr);
      },
      (err) => console.log(err)
    );
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Event to firebase occured");
      setCurrentLoggedUser(currentUser);
      loadNotes(currentUser);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const ctxValue = {
    currentLoggedUser: currentLoggedUser,
    notes: notes,
    addNote: addNote,
    deleteNote: deleteNote,
  };

  return (
    <NotesContext.Provider value={ctxValue}>
      {!loading && children}
    </NotesContext.Provider>
  );
};

export default NotesContextProvider;