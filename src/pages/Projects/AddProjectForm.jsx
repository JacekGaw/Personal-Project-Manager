import React, { useRef, useState, useContext } from "react";
import Button from "../../components/UI/Button";
import { compareDates } from "../../helpers/compareDates.js";
import { ProjectsContext } from "../../store/projects-context.jsx";

const AddProjectForm = ({ onAddProject }) => {
  const [errorMessage, setErrorMessage] = useState();
  const [todosArr, setTodosArr] = useState([]);
  const titleRef = useRef();
  const todoRef = useRef();
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
          plannedEndDateRef.current.value,
          todosArr
        );
        await onAddProject();
      } catch (e) {
        console.log(e);
      }

      titleRef.current.value = "";
      descriptionRef.current.value = "";
      plannedEndDateRef.current.value = "";
      setTodosArr([]);
      todoRef.current.value = "";
    } else {
      setErrorMessage("Project Planned End Date must be in the future!");
    }
  };

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (todoRef.current.value !== "") {
      setTodosArr((prevTodos) => {
        return [...prevTodos, todoRef.current.value];
      });
    }
  };

  const handleClearInputs = (e) => {
    e.preventDefault();
    titleRef.current.value = "";
    descriptionRef.current.value = "";
    plannedEndDateRef.current.value = "";
    todoRef.current.value = "";
    setTodosArr([]);
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
        <div className="flex flex-col gap-1 ">
          <header>
            <h5 className="text-center text-sm font-[600]">
              Add ToDo to project:
            </h5>
          </header>
          <div className="w-full flex gap-2 justify-center">
            <input
              id="todo-input"
              className="shadow-sm border border-lightjeans hover:border-darkjeans transition-all duration-200 rounded-md p-2 text-sm text-darkjeans"
              placeholder="ToDo"
              ref={todoRef}
            />
            <Button className={`bg-vibrantgold`} onClick={handleAddTodo}>
              Add Todo
            </Button>
          </div>
          <ul>
            {todosArr.map((todo, index) => {
              return (
                <li key={index} className="text-xs font-[400] ">
                  {index + 1}. {todo}
                </li>
              );
            })}
          </ul>
        </div>
        <button
          className="block text-xs border-b border-slate-400 hover:border-lightjeans"
          onClick={handleClearInputs}
        >
          Clear inputs
        </button>
        <Button type="submit">Add</Button>
      </form>
    </div>
  );
};

export default AddProjectForm;
