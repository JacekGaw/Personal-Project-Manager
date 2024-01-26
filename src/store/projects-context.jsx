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
} from "firebase/firestore";

export const ProjectsContext = createContext({
  currentLoggedUser: {},
  projects: [],
  loadProjects: () => {},
  addProject: () => {},
  deleteProject: () => {},
  getSingleProjectInfo: () => {},
});

const ProjectsContextProvider = ({ children }) => {
  const [currentLoggedUser, setCurrentLoggedUser] = useState();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const addProject = (title, description, plannedEndDate, todos) => {
    console.log("Event to firebase occured");
    const projectData = {
      Title: title,
      Description: description,
      Todos: todos,
      authorID: currentLoggedUser.uid,
      created: Timestamp.fromDate(new Date()),
      plannedEndDate: Timestamp.fromDate(new Date(plannedEndDate)),
      active: true,
    };
    const newProjectRef = doc(collection(db, "ProjectsCollection"));
    return setDoc(newProjectRef, projectData).then(
      () => {
        setProjects((prevStatus) => {
          return [...prevStatus, { id: newProjectRef.id, ...projectData }];
        });
      },
      (err) => console.log(err)
    );
  };

  const getSingleProjectInfo = (projectIDfromParam) => {
    const givenReturn = projects.filter((project) => project.id === projectIDfromParam)[0];
    return givenReturn;
  };

  const deleteProject = (projectID) => {
    return deleteDoc(doc(db, "ProjectsCollection", projectID)).then(
      () => {
        const arr = projects.filter((project) => project.id !== projectID);
        console.log(arr);
        setProjects(arr);
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
    deleteProject: deleteProject,
    getSingleProjectInfo: getSingleProjectInfo,
  };

  return (
    <ProjectsContext.Provider value={ctxValue}>
      {!loading && children}
    </ProjectsContext.Provider>
  );
};

export default ProjectsContextProvider;
