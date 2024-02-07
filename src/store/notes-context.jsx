import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth, storage } from "../firebase";
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
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

export const NotesContext = createContext({
  currentLoggedUser: {},
  notes: [],
  addNote: () => {},
  deleteNote: () => {},
  editNote: () => {},
  addFile: () => {},
});

const NotesContextProvider = ({ children }) => {
  const [currentLoggedUser, setCurrentLoggedUser] = useState();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadNotes = async (currentUser) => {
    if (currentUser !== null) {
      console.log("Event to firebase occured");
      const notesFirebase = collection(db, "NotesCollection");
      const q = query(
        notesFirebase,
        where("authorID", "==", currentUser.uid),
        orderBy("created", "desc")
      );
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

  const addNote = (title, note, assign, assignTitle) => {
    console.log("Event to firebase occured");
    const noteData = {
      title: title,
      noteText: note,
      assign: assign,
      assignTitle: assignTitle,
      authorID: currentLoggedUser.uid,
      created: Timestamp.fromDate(new Date()),
      files: [],
    };
    const newNoteRef = doc(collection(db, "NotesCollection"));
    return setDoc(newNoteRef, noteData).then(
      () => {
        setNotes((prevStatus) => {
          return [
            ...prevStatus,
            { id: newNoteRef.id, assignTitle: assignTitle, ...noteData },
          ];
        });
      },
      (err) => console.log(err)
    );
  };

  const editNote = (noteID, title, noteText, assign, assignTitle) => {
    const noteRef = doc(db, "NotesCollection", noteID);
    return updateDoc(noteRef, {
      title: title,
      noteText: noteText,
      assign: assign,
      assignTitle: assignTitle,
    }).then(
      () => {
        setNotes((prevState) => {
          return prevState.map((note) => {
            if (note.id === noteID) {
              return {
                ...note,
                title: title,
                noteText: noteText,
                assign: assign,
                assignTitle: assignTitle,
              };
            } else {
              return note;
            }
          });
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
  const addFile = async (file, noteID) => {
    const fileRef = ref(storage, `notefiles/${noteID}/${file.name}`);
    let fileUrl = "";
    try {
      await uploadBytes(fileRef, file);
      fileUrl = await getDownloadURL(fileRef);
    } catch (e) {
      console.log(e);
    } finally {
      if (fileUrl !== "") {
        const noteRef = doc(db, "NotesCollection", noteID);
        return updateDoc(noteRef, {
          files: [
            ...notes.filter((note) => note.id === noteID)[0].files,
            fileUrl,
          ],
        }).then(() => {
          setNotes((prevState) => {
            return prevState.map((note) => {
              if (note.id === noteID) {
                return {
                  ...note,
                  files: [
                    ...prevState.filter((note) => note.id === noteID)[0].files,
                    fileUrl,
                  ],
                };
              } else {
                return note;
              }
            });
          });
        });
      }
    }
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
    editNote: editNote,
    deleteNote: deleteNote,
    addFile: addFile,
  };

  return (
    <NotesContext.Provider value={ctxValue}>
      {!loading && children}
    </NotesContext.Provider>
  );
};

export default NotesContextProvider;
