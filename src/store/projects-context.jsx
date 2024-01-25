import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  Timestamp,
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

  const loadProjects = async () => {
    console.log("Event to firebase occured");
    const projectsFirebase = collection(db, "ProjectsCollection");
    const q = query(
      projectsFirebase,
      where("authorID", "==", currentLoggedUser.uid)
    );
    const querySnapshot = await getDocs(q);
    let arr = [];
    if (querySnapshot) {
      querySnapshot.forEach((doc) => {
        arr = [...arr, doc.data()];
      });
    }
    setProjects(arr);
  };

  const addProject = async (title, description, plannedEndDate) => {
    console.log("Event to firebase occured");
    return await addDoc(collection(db, "ProjectsCollection"), {
      Title: title,
      Description: description,
      Todos: [],
      authorID: currentLoggedUser.uid,
      created: Timestamp.fromDate(new Date()),
      plannedEndDate: Timestamp.fromDate(new Date(plannedEndDate)),
    }).then((res) => {
      console.log(res);
      const newArr = [...projects, {Title: title, Description: description, Todos: [], authorID: currentLoggedUser.uid, created: Timestamp.fromDate(new Date()), plannedEndDate: Timestamp.fromDate(new Date(plannedEndDate))}];
      setProjects(newArr);
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setCurrentLoggedUser(currentUser);
      loadProjects();
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const ctxValue = {
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
