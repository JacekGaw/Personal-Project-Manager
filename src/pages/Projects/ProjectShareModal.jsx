import React, { useRef, useState, useContext, useEffect } from "react";
import { ProjectsContext } from "../../store/projects-context";
import { AuthContext } from "../../store/auth-context";
import Button from "../../components/UI/Button";

const ProjectShareModal = (project) => {
  const contributorRef = useRef();
  const [contributorsList, setContributorsList] = useState([]);
  const [projectContributors, setProjectContributors] = useState([]);
  const { lookForContributors, addContributorToProject, getUserById, removeContributorFromProject } =
    useContext(ProjectsContext);
const {user} = useContext(AuthContext);

useEffect(() => {
    const fetchContributors = async () => {
      if (project.project && project.project.contributorsIds) {
        try {
          const contributors = await Promise.all(
            project.project.contributorsIds.map(async (id) => {
              if (typeof id !== 'string') {
                console.error(`Invalid userId: ${id}. Expected a string.`);
                return null;
              }
              const user = await getUserById(id);
              return user;
            })
          );
          const validContributors = contributors.filter(c => c !== null);
          setProjectContributors(validContributors);
        } catch (error) {
          console.error("Error fetching contributors:", error);
        }
      }
    };
  
    fetchContributors();
  }, [project, getUserById]);

  const handleSubmitContributors = async (e) => {
    e.preventDefault();
    const contributorToFind = contributorRef.current.value;
    try {
      const users = await lookForContributors(contributorToFind);
      if (users) {
        setContributorsList(users);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddContributor = async (contributorId) => {
    try {
      await addContributorToProject(project.project.id, contributorId);
      const newContributor = await getUserById(contributorId);
      setProjectContributors((prev) => [...prev, newContributor]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteContributor = async (userId) => {
    try {
      await removeContributorFromProject(project.project.id, userId);
      setProjectContributors((prev) => prev.filter((contributor) => contributor !== userId));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <header className="p-2 mb-2">
        <h3 className="text-center text-xl font-[600] text-darkjeans">
          Add or remove contributors:
        </h3>
      </header>
      <form
        onSubmit={handleSubmitContributors}
        className="flex flex-col gap-4 mb-4"
      >
        <div className="flex flex-col">
          <label
            htmlFor="contributor-email"
            className="text-sm text-slate-700 font-[400]"
          >
            Note Title:
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              id="contributor-email"
              className="min-w-[300px] shadow-sm border border-lightjeans hover:border-darkjeans transition-all duration-200 rounded-md p-2 text-sm text-darkjeans"
              ref={contributorRef}
              minLength={2}
              onChange={handleSubmitContributors}
            />
            <Button type="submit">Find</Button>
          </div>
        </div>
      </form>
      <div>
        <p className="font-[700] text-center">Users list:</p>
        <div className="h-[100px] overflow-y-auto bg-slate-100">
          {contributorsList.length > 0 ? (
            <ul className=" flex flex-col gap-1 bg-slate-100">
              {contributorsList.map((contributor) => {
                return (
                  <li
                    key={contributor.id}
                    className="flex justify-between items-center gap-2 p-2 border rounded-sm bg-lighterjeans "
                  >
                    <p>{contributor.email}</p>
                    {project.project.contributorsIds.includes(
                      contributor.id
                    ) ? (
                      <Button disabled={true}>Add</Button>
                    ) : (
                      <Button
                        onClick={() => handleAddContributor(contributor.id)}
                      >
                        Add
                      </Button>
                    )}
                  </li>
                );
              })}
            </ul>
          ) : (
            <p>No users found...</p>
          )}
        </div>
      </div>
      <div>
        <p className="font-[700] text-center">Current contributors list:</p>
        <ul>
          {projectContributors.map((contributor) => {
            return (
              <li key={contributor.id} className="group text-sm flex justify-between items-center gap-2">
                <p className="p-1">{contributor.email}</p>
                {user.uid !== contributor.id && 
                <button onClick={() => handleDeleteContributor(contributor.id)} className="opacity-0 group-hover:opacity-100 transition-all duration-200">
                <span className="material-symbols-outlined text-[20px] hover:-translate-x-[2px] transition-all duration-200">
                    delete
                  </span>
                </button>}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default ProjectShareModal;
