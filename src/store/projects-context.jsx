import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../firebase";
import { collection, query, where, getDocs, doc } from "firebase/firestore";

export const ProjectsContext = createContext({
  projects: [],
  loadProjects: () => {},
});

const ProjectsContextProvider = ({ children }) => {
  const [currentLoggedUser, setCurrentLoggedUser] = useState();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  //create function that loads users docs, extract code from useEffect below and trigger 
  //that function in useEffect on mount in dashboard component

  const loadProjects = async () => {
    const projectsFirebase = collection(db, "ProjectsCollection");
      const q = query(
        projectsFirebase,
        where("authorID", "==", currentLoggedUser.uid)
      );
      const querySnapshot =await getDocs(q);
      let arr = [];
      if (querySnapshot) {
        querySnapshot.forEach((doc) => {
          arr = [...arr, doc.data()];
        });
      }
      setProjects(arr);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setCurrentLoggedUser(currentUser);
      
      
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const ctxValue = {
    projects: projects,
    loadProjects: loadProjects,
  };

  return (
    <ProjectsContext.Provider value={ctxValue}>
      {!loading && children}
    </ProjectsContext.Provider>
  );
};

export default ProjectsContextProvider;
