import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
  Timestamp,
  setDoc,
  deleteDoc,
  updateDoc,
  arrayRemove,
  arrayUnion
} from "firebase/firestore";

export const ProjectsContext = createContext({
  currentLoggedUser: {},
  projects: [],
  loadProjects: () => {},
  getUserById: () => {},
  addProject: () => {},
  deleteProject: () => {},
  getSingleProjectInfo: () => {},
  deleteTodo: () => {},
  addTodo: () => {},
  changeTodoStatus: () => {},
  changeDescription: () => {},
  changeEndDate: () => {},
  changeProjectStatus: () => {},
  lookForContributors: () => {},
  addContributorToProject: () => {},
  removeContributorFromProject: () => {}
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
        getDocs(contributorQuery),
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
      contributorsIds: [],
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
              return { ...project, Description: newDesc };
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
              return {
                ...project,
                plannedEndDate: Timestamp.fromDate(new Date(newDate)),
              };
            else return project;
          });
        });
      },
      (err) => {
        console.log(err);
      }
    );
  };

  const changeProjectStatus = (projectID, newStatus) => {
    const projectRef = doc(db, "ProjectsCollection", projectID);
    return updateDoc(projectRef, {
      status: newStatus,
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
  };

  const lookForContributors = async (contributorInfo) => {
    if (!contributorInfo) {
      return [];
    }
    const usersCollection = collection(db, "users");
  
    try {
      // Create a query that checks if the email starts with the provided string
      const q = query(
        usersCollection,
        where('email', '>=', contributorInfo),
        where('email', '<=', contributorInfo + '\uf8ff')
      );
  
      // Execute the query
      const querySnapshot = await getDocs(q);
  
      // Map the results to an array of user objects
      const users = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
  
      return users;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const getUserById = async (userId) => {
    try {
      if (!userId) {
        console.error("getUserById called with null or undefined userId");
        return null;
      }
      const userRef = doc(db, "users", userId);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        return { id: userSnap.id, ...userSnap.data() };
      } else {
        console.log(`No user found with id: ${userId}`);
        return null;
      }
    } catch (error) {
      console.error(`Error in getUserById for userId ${userId}:`, error);
      throw error;
    }
  }

  const addContributorToProject = (projectId, userId) => {
    console.log(projectId, userId);
    const projectRef = doc(db, "ProjectsCollection", projectId);
    return updateDoc(projectRef, {
      contributorsIds: arrayUnion(userId),
    }).then(
      () => {
        setProjects((prevState) => {
          return prevState.map((project) => {
            if (project.id === projectId){
              const newContributorsArr = [...project.contributorsIds, userId];
              return { ...project, contributorsIds: newContributorsArr };
            }
            else return project;
          });
        });
      },
      (err) => {
        console.log(err);
      }
    )
  }

  const removeContributorFromProject = async (projectId, userId) => {
    const projectRef = doc(db, "ProjectsCollection", projectId);
    try {
      await updateDoc(projectRef, {
        contributorsIds: arrayRemove(userId),
      });
      
      setProjects((prevState) => 
        prevState.map((project) => 
          project.id === projectId
            ? { ...project, contributorsIds: project.contributorsIds.filter(id => id !== userId) }
            : project
        )
      );
      
      return true; // Indicate success
    } catch (err) {
      console.error(err);
      return false; // Indicate failure
    }
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
    getUserById: getUserById,
    addProject: addProject,
    deleteProject: deleteProject,
    getSingleProjectInfo: getSingleProjectInfo,
    deleteTodo: deleteTodo,
    addTodo: addTodo,
    changeTodoStatus: changeTodoStatus,
    changeDescription: changeDescription,
    changeEndDate: changeEndDate,
    changeProjectStatus: changeProjectStatus,
    lookForContributors: lookForContributors,
    addContributorToProject: addContributorToProject,
    removeContributorFromProject: removeContributorFromProject
  };

  return (
    <ProjectsContext.Provider value={ctxValue}>
      {!loading && children}
    </ProjectsContext.Provider>
  );
};

export default ProjectsContextProvider;
