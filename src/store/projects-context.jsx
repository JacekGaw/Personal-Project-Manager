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
} from "firebase/firestore";

export const ProjectsContext = createContext({
  currentLoggedUser: {},
  projects: [],
  loadProjects: () => {},
  addProject: () => {},
  deleteProject: () => {},
  getSingleProjectInfo: () => {},
  deleteTodo: () => {},
  addTodo: () => {},
  changeTodoStatus: () => {},
  changeDescription: () => {},
  changeEndDate: () => {},
  changeProjectStatus: () => {},
});

const ProjectsContextProvider = ({ children }) => {
  const [currentLoggedUser, setCurrentLoggedUser] = useState();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadProjects = async (currentUser) => {
    if (currentUser !== null) {
      console.log("Event to firebase occurred");
      const projectsFirebase = collection(db, "ProjectsCollection");
      
      // Query for projects where user is the author
      const authorQuery = query(
        projectsFirebase,
        where("authorID", "==", currentUser.uid)
      );
  
      // Query for projects where user is a contributor
      const contributorQuery = query(
        projectsFirebase,
        where("contributorsIds", "array-contains", currentUser.uid)
      );
  
      // Execute both queries
      const [authorSnapshot, contributorSnapshot] = await Promise.all([
        getDocs(authorQuery),
        getDocs(contributorQuery)
      ]);
  
      // Combine results, avoiding duplicates
      const projectMap = new Map();
  
      authorSnapshot.forEach((doc) => {
        projectMap.set(doc.id, { id: doc.id, ...doc.data() });
      });
  
      contributorSnapshot.forEach((doc) => {
        if (!projectMap.has(doc.id)) {
          projectMap.set(doc.id, { id: doc.id, ...doc.data() });
        }
      });
  
      // Convert map to array
      const arr = Array.from(projectMap.values());
  
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
      status: "active",
      contributorsIds: []
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
    const givenReturn = projects.filter(
      (project) => project.id === projectIDfromParam
    )[0];
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

  const deleteTodo = (projectID, todoID) => {
    const project = projects.filter((project) => project.id === projectID)[0];
    const newTodos = project.Todos;
    const todoIndex = newTodos.map((e) => e.id).indexOf(todoID);
    newTodos.splice(todoIndex, 1);
    const projectRef = doc(db, "ProjectsCollection", projectID);
    return updateDoc(projectRef, {
      Todos: newTodos,
    }).then(
      () => {
        setProjects((prevState) => {
          return prevState.map((project) => {
            if (project.id === projectID)
              return { ...project, Todos: newTodos };
            else return project;
          });
        });
      },
      (err) => {
        console.log(err);
      }
    );
  };
  // TODO: merge functions which deal with todos collection
  const changeTodoStatus = (projectID, todoID, newStatus) => {
    const project = projects.filter((project) => project.id === projectID)[0];
    const newTodos = project.Todos;
    const todoIndex = newTodos.map((e) => e.id).indexOf(todoID);
    newTodos[todoIndex] = {
      id: Math.random(),
      todo: newTodos[todoIndex].todo,
      status: newStatus,
    };
    const projectRef = doc(db, "ProjectsCollection", projectID);
    return updateDoc(projectRef, {
      Todos: newTodos,
    }).then(
      () => {
        setProjects((prevState) => {
          return prevState.map((project) => {
            if (project.id === projectID)
              return { ...project, Todos: newTodos };
            else return project;
          });
        });
      },
      (err) => {
        console.log(err);
      }
    );
  };

  const addTodo = (projectID, newTodo) => {
    const project = projects.filter((project) => project.id === projectID)[0];
    let newTodos = project.Todos;
    newTodos = [
      ...newTodos,
      { id: Math.random(), todo: newTodo, status: "active" },
    ];
    const projectRef = doc(db, "ProjectsCollection", projectID);

    return updateDoc(projectRef, {
      Todos: newTodos,
    }).then(
      () => {
        setProjects((prevState) => {
          return prevState.map((project) => {
            if (project.id === projectID)
              return { ...project, Todos: newTodos };
            else return project;
          });
        });
      },
      (err) => {
        console.log(err);
      }
    );
  };

  const changeDescription = (projectID, newDesc) => {
    const projectRef = doc(db, "ProjectsCollection", projectID);
    return updateDoc(projectRef, {
      Description: newDesc,
    }).then(
      () => {
        setProjects((prevState) => {
          return prevState.map((project) => {
            if (project.id === projectID)
              return { ...project, Description: newDesc, };
            else return project;
          });
        });
      },
      (err) => {
        console.log(err);
      }
    );
  };

  const changeEndDate = (projectID, newDate) => {
    const projectRef = doc(db, "ProjectsCollection", projectID);
    return updateDoc(projectRef, {
      plannedEndDate: Timestamp.fromDate(new Date(newDate)),
    }).then(
      () => {
        setProjects((prevState) => {
          return prevState.map((project) => {
            if (project.id === projectID)
              return { ...project, plannedEndDate: Timestamp.fromDate(new Date(newDate)) };
            else return project;
          });
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }

  const changeProjectStatus = (projectID, newStatus) => {
    const projectRef = doc(db, "ProjectsCollection", projectID);
    return updateDoc(projectRef, {
      status: newStatus
    }).then(
      () => {
        setProjects((prevState) => {
          return prevState.map((project) => {
            if (project.id === projectID)
              return { ...project, status: newStatus };
            else return project;
          });
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }

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
    deleteTodo: deleteTodo,
    addTodo: addTodo,
    changeTodoStatus: changeTodoStatus,
    changeDescription: changeDescription,
    changeEndDate: changeEndDate,
    changeProjectStatus: changeProjectStatus,
  };

  return (
    <ProjectsContext.Provider value={ctxValue}>
      {!loading && children}
    </ProjectsContext.Provider>
  );
};

export default ProjectsContextProvider;
