import React, { useContext, useEffect } from "react";
import { ProjectsContext } from "../../store/projects-context";
import ProjectListItem from "./ProjectListItem";

const ProjectsList = () => {
  const { projects, currentLoggedUser } = useContext(ProjectsContext);

  return (
    <section className="max-w-screen-lg m-auto">
      <div className="mx-5 mt-5 border-b border-b-lightjeans py-1">
        <p className="text-xs font-[800]">{projects.length} projects found.</p>
      </div>
      <ul className="flex flex-col gap-2 p-5">
        {projects.map((project, index) => {
          return (
            <ProjectListItem
              key={project.id}
              arrayIndex={index}
              projectInfo={project}
            ></ProjectListItem>
          );
        })}
      </ul>
    </section>
  );
};

export default ProjectsList;
