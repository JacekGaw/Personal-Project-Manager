import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  doc,
  Timestamp,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

export const ProjectsContext = createContext({
  projects: [],
  loadProjects: () => {},
  addProject: () => {},
});

const ProjectsContextProvider = ({ children }) => {
  const [currentLoggedUser, setCurrentLoggedUser] = useState();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  //create function that loads users docs, extract code from useEffect below and trigger
  //that function in useEffect on mount in dashboard component

  const loadProjects = async (currentUser) => {
    if (currentUser !== null) {
      console.log("Event to firebase occured");
      const projectsFirebase = collection(db, "ProjectsCollection");
      const q = query(
        projectsFirebase,
        where("authorID", "==", currentUser.uid)
      );
      const querySnapshot = await getDocs(q);
      let arr = [];
      if (querySnapshot) {
        querySnapshot.forEach((doc) => {
          // console.log(doc.id);
          arr = [...arr, { id: doc.id, ...doc.data() }];
        });
      }
      setProjects(arr);
    }
  };

  const addProject = async (title, description, plannedEndDate, todos) => {
    console.log("Event to firebase occured");
    const projectData = {
      Title: title,
      Description: description,
      Todos: todos,
      authorID: currentLoggedUser.uid,
      created: Timestamp.fromDate(new Date()),
      plannedEndDate: Timestamp.fromDate(new Date(plannedEndDate)),
    };
    // return await addDoc(collection(db, "ProjectsCollection"), projectData).then(() => {
    //   setProjects((prevStatus) => {
    //     return [...prevStatus, projectData];
    //   });
    // }, err => console.log(err));
    const newProjectRef = await doc(collection(db, "ProjectsCollection"));
    return await setDoc(newProjectRef, projectData).then(
      () => {
        setProjects((prevStatus) => {
          return [...prevStatus, {id:newProjectRef.id, ...projectData}];
        });
      },
      (err) => console.log(err)
    );
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Event to firebase occured");
      setCurrentLoggedUser(currentUser);
      loadProjects(currentUser);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const ctxValue = {
    currentLoggedUser: currentLoggedUser,
    projects: projects,
    loadProjects: loadProjects,
    addProject: addProject,
  };

  return (
    <ProjectsContext.Provider value={ctxValue}>
      {!loading && children}
    </ProjectsContext.Provider>
  );
};

export default ProjectsContextProvider;
