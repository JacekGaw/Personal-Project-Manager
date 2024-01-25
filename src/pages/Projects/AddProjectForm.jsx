import React, { useRef, useState, useContext } from "react";
import Button from "../../components/UI/Button";
import { compareDates } from "../../helpers/compareDates.js";
import { ProjectsContext } from "../../store/projects-context.jsx";

const AddProjectForm = ({ onAddProject }) => {
  const [errorMessage, setErrorMessage] = useState();
  const titleRef = useRef();
  const descriptionRef = useRef();
  const plannedEndDateRef = useRef();
  const { addProject } = useContext(ProjectsContext);

  const handleAddProject = async (e) => {
    e.preventDefault();
    setErrorMessage();
    const pickedDate = compareDates(
      plannedEndDateRef.current.value,
      new Date()
    );
    if (pickedDate === 0 || pickedDate === 1) {
      try {
        await addProject(
          titleRef.current.value,
          descriptionRef.current.value,
          plannedEndDateRef.current.value
        );
        await onAddProject();
      } catch (e) {
        console.log(e);
      }

      titleRef.current.value = "";
      descriptionRef.current.value = "";
      plannedEndDateRef.current.value = "";
    } else {
      setErrorMessage("Project Planned End Date must be in the future!");
    }
  };

  return (
    <div>
      <header className="p-2 mb-2">
        <h3 className="text-center text-xl font-[600] text-darkjeans">
          Add Project:
        </h3>
      </header>
      {errorMessage && (
        <p className="p-2 text-center text-red-700 font-[900] text-sm">
          {errorMessage}
        </p>
      )}
      <form onSubmit={handleAddProject} className="flex flex-col gap-4 mb-4">
        <div className="flex flex-col">
          <label
            htmlFor="project-title"
            className="text-sm text-slate-700 font-[400]"
          >
            Project Title:
          </label>
          <input
            type="text"
            id="project-title"
            ref={titleRef}
            className="min-w-[300px] shadow-sm border border-lightjeans hover:border-darkjeans transition-all duration-200 rounded-md p-2 text-sm text-darkjeans"
            required
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="project-description"
            className="text-sm text-slate-700 font-[400]"
          >
            Project Description:
          </label>
          <textarea
            type="text"
            id="project-description"
            ref={descriptionRef}
            className="shadow-sm border border-lightjeans hover:border-darkjeans transition-all duration-200 rounded-md p-2 text-sm text-darkjeans"
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="project-plannedEndDate"
            className="text-sm text-slate-700 font-[400]"
          >
            Project Planned End Date:
          </label>
          <input
            type="date"
            id="project-plannedEndDate"
            ref={plannedEndDateRef}
            className="shadow-sm border border-lightjeans hover:border-darkjeans transition-all duration-200 rounded-md p-2 text-sm text-darkjeans"
            required
          />
        </div>
        <Button type="submit">Add</Button>
      </form>
    </div>
  );
};

export default AddProjectForm;
