import React, { useContext, useState, useRef, useEffect } from "react";
import { ProjectsContext } from "../../store/projects-context";
import { useParams } from "react-router-dom";
import Button from "../../components/UI/Button";
import ProjectViewTodosItem from "./ProjectViewTodosItem";

const ProjectViewTodos = (todos) => {
  const newTodoRef = useRef();
  const [newTodoInputVisibility, setNewTodoInputVisibility] = useState(false);
  const { projectIDparam } = useParams();
  const { addTodo } = useContext(ProjectsContext);

  const countWithStatus = (status) => {
    const arr = todos.todos.filter((todo) => todo.status === status);
    return arr.length;
  };

  const handleClickAddTodo = async () => {
    setNewTodoInputVisibility(true);
  };

  const handleAddTodo = async () => {
    if (newTodoRef.current.value !== "") {
      try {
        await addTodo(projectIDparam, newTodoRef.current.value);
      } catch (err) {
        console.log(err);
      }
    }
    setNewTodoInputVisibility(false);
  };

  return (
    <section className="w-full p-2">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 text-sm text-slate-600 font-[300]">
          <p>Active: {countWithStatus("active")}</p>
          <p>Done: {countWithStatus("done")}</p>
          <p>Urgent: {countWithStatus("urgent")}</p>
        </div>
        <div className="flex justify-center gap-1">
          {newTodoInputVisibility ? (
            <input
              type="text"
              ref={newTodoRef}
              className="text-xs p-1 max-w-200px border border-lightjeans rounded-sm hover:border-darkjeans transition-all duration-200"
            />
          ) : (
            ""
          )}

          <Button
            className={`text-xs`}
            onClick={
              newTodoInputVisibility ? handleAddTodo : handleClickAddTodo
            }
          >
            {newTodoInputVisibility ? "Add Todo" : "+"}
          </Button>
        </div>
      </div>
      <div className="lg:flex lg:flex-row lg:justify-between">
      <div className="bg-jeans flex-1">
        <h5 className="text-xs bg-white text-slate-500 border-b border-b-slate-300">
          Urgent:
        </h5>
        <ul className="w-full bg-jeans flex flex-col gap-2 p-2 max-h-[500px] overflow-y-auto">
          {todos.todos.filter((todo) => todo.status === "urgent").length > 0 ?
            todos.todos
              .filter((todo) => todo.status === "urgent")
              .map((todo, index) => {
                return (
                  <ProjectViewTodosItem todo={todo} index={index} key={index} />
                );
              }) : <p className="text-xs text-white">No urgent Todos</p>}
        </ul>
      </div>
      <div className="bg-lightjeans flex-1">
        <h5 className="text-xs bg-white text-slate-500 border-b border-b-slate-300">
          Active:
        </h5>
        <ul className="w-full bg-lightjeans flex flex-col gap-2 p-2 max-h-[500px] overflow-y-auto">
          {todos.todos.filter((todo) => todo.status === "active").length > 0 ?
            todos.todos
              .filter((todo) => todo.status === "active")
              .map((todo, index) => {
                return (
                  <ProjectViewTodosItem todo={todo} index={index} key={index} />
                );
              }): <p className="text-xs">No active Todos</p> }
        </ul>
      </div>
      <div className="bg-cream flex-1">
        <h5 className="text-xs bg-white text-slate-500 border-b border-b-slate-300">
          Done:
        </h5>
        <ul className="w-full bg-cream flex flex-col gap-2 p-2 max-h-[500px] overflow-y-auto">
          {todos.todos.filter((todo) => todo.status === "done").length > 0 ?
            todos.todos
              .filter((todo) => todo.status === "done")
              .map((todo, index) => {
                return (
                  <ProjectViewTodosItem todo={todo} index={index} key={index} />
                );
              }):<p className="text-xs">No active Todos</p> }
        </ul>
      </div>
      </div>
    </section>
  );
};

export default ProjectViewTodos;
