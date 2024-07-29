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
import { getDownloadURL, ref, uploadBytes, deleteObject  } from "firebase/storage";

export const NotesContext = createContext({
  currentLoggedUser: {},
  notes: [],
  addNote: () => {},
  deleteNote: () => {},
  editNote: () => {},
  addFile: () => {},
  deleteFile: () => {},
});

const NotesContextProvider = ({ children }) => {
  const [currentLoggedUser, setCurrentLoggedUser] = useState();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadNotes = async (currentUser) => {
  if (currentUser !== null) {
    console.log("Event to firebase occurred");
    const notesFirebase = collection(db, "NotesCollection");
    const projectsFirebase = collection(db, "ProjectsCollection");

    // Query for notes where user is the author
    const authorNotesQuery = query(
      notesFirebase,
      where("authorID", "==", currentUser.uid),
      orderBy("created", "desc")
    );
    
    // Query for projects where user is a contributor
    const contributorProjectsQuery = query(
      projectsFirebase,
      where("contributorsIds", "array-contains", currentUser.uid)
    );

    try {
      // Execute both queries
      const [authorNotesSnapshot, contributorProjectsSnapshot] = await Promise.all([
        getDocs(authorNotesQuery),
        getDocs(contributorProjectsQuery)
      ]);
      
      // Get project IDs where user is a contributor
      const contributorProjectIds = contributorProjectsSnapshot.docs.map(doc => doc.id);

      // Query for notes assigned to projects where user is a contributor
      const projectNotesQuery = query(
        notesFirebase,
        where("assign", "in", contributorProjectIds),
        orderBy("created", "desc")
      );

      // Execute project notes query
      const projectNotesSnapshot = await getDocs(projectNotesQuery);

      // Combine results, avoiding duplicates
      const notesMap = new Map();

      authorNotesSnapshot.forEach((doc) => {
        notesMap.set(doc.id, { id: doc.id, ...doc.data() });
      });

      projectNotesSnapshot.forEach((doc) => {
        if (!notesMap.has(doc.id)) {
          notesMap.set(doc.id, { id: doc.id, ...doc.data() });
        }
      });

      // Convert map to array and sort by created date
      const arr = Array.from(notesMap.values()).sort((a, b) => b.created - a.created);

      setNotes(arr);
    } catch (error) {
      if (error.code === 'failed-precondition') {
        console.error('This query requires an index. ', error.message);
        // Here you could add logic to show a user-friendly message
      } else {
        console.error('Unexpected error: ', error);
      }
      
      // Fall back to only author's notes if there's an error
      const authorNotesSnapshot = await getDocs(authorNotesQuery);
      const arr = authorNotesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setNotes(arr);
    }
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
        // eslint-disable-next-line no-unsafe-finally
        return updateDoc(noteRef, {
          files: [
            ...notes.filter((note) => note.id === noteID)[0].files,
            {
              fileURL: fileUrl,
              fileName: file.name,
              fileID: Math.random()
            }
          ],
        }).then(() => {
          setNotes((prevState) => {
            return prevState.map((note) => {
              if (note.id === noteID) {
                return {
                  ...note,
                  files: [
                    ...prevState.filter((note) => note.id === noteID)[0].files,
                    {
                      fileURL: fileUrl,
                      fileName: file.name,
                      fileID: Math.random()
                    }
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

  const deleteFile = async (file, noteID) => {
    const fileRef = ref(storage, `notefiles/${noteID}/${file.fileName}`);
    return await deleteObject(fileRef).then(() => {
      const noteRef = doc(db, "NotesCollection", noteID);
      let arr = notes.filter((note) => note.id === noteID)[0].files;
      return updateDoc(noteRef, {
        files: [
          ...arr.filter(fileOld => fileOld.fileID !== file.fileID)
        ]
      });
    }).finally(() => {
      setNotes((prevState) => {
        return prevState.map((note) => {
          if (note.id === noteID) {
            let arr = prevState.filter((note) => note.id === noteID)[0].files;
            return {
              ...note,
              files: [
                ...arr.filter(fileOld => fileOld.fileID !== file.fileID)
              ],
            };
          } else {
            return note;
          }
        })
      })
    }).catch((err) => { console.log(err) });
  }

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
    deleteFile: deleteFile,
  };

  return (
    <NotesContext.Provider value={ctxValue}>
      {!loading && children}
    </NotesContext.Provider>
  );
};

export default NotesContextProvider;
