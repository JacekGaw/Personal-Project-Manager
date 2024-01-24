import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../firebase";
import { collection, query, where, getDocs, doc } from "firebase/firestore";

export const ProjectsContext = createContext({
  
});

const ProjectsContextProvider = ({ children }) => {
  const [currentLoggedUser, setCurrentLoggedUser] = useState();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  //create function that loads users docs, extract code from useEffect below and trigger 
  //that function in useEffect on mount in dashboard component

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setCurrentLoggedUser(currentUser);
      const projectsFirebase = collection(db, "ProjectsCollection");
      const q = query(
        projectsFirebase,
        where("authorID", "==", currentUser.uid)
      );
      const querySnapshot = await getDocs(q);
      let arr = [];
      if (querySnapshot) {
        querySnapshot.forEach((doc) => {
          console.log(doc.data());
          arr = [...arr, doc.data()];
        });
      }
      console.log(arr);
      setProjects(arr);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const ctxValue = {};

  return (
    <ProjectsContext.Provider value={ctxValue}>
      {!loading && children}
    </ProjectsContext.Provider>
  );
};

export default ProjectsContextProvider;
