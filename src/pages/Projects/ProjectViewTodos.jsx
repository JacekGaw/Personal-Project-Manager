import React, { useContext } from "react";
import { ProjectsContext } from "../../store/projects-context";
import { useParams } from "react-router-dom";

const ProjectViewTodos = (todos) => {
  const { projectIDparam } = useParams();
  const {deleteTodo} = useContext(ProjectsContext);

    const countWithStatus = (status) => {
        const arr = todos.todos.filter(todo => todo.status === status);
        return arr.length;
    }

    const handleDeleteTodo = async (todoIndex) => {
        try {
            await deleteTodo(projectIDparam, todoIndex);
        } catch (err) {console.log(err);}
    }

  return (
    <section className="w-full p-2">
        <div className="flex gap-2 text-sm text-slate-600 font-[300]" >
            <p>Active: {countWithStatus('active')}</p>
            <p>Done: {countWithStatus('done')}</p>
            <p>Urgent: {countWithStatus('urgent')}</p>
        </div>
      <ul className="w-full">
        {todos &&
          todos.todos.map((todo, index) => {
            return (
              <li
                key={index}
                className="group flex justify-between my-1 bg-slate-100 p-2 rounded-sm shadow-sm"
              >
                <p className="font-[300] text-sm">
                  <span className="font-[700]">{index + 1}.</span> {todo.todo}
                </p>
                <div className="flex gap-1">
                <button className="group-hover:opacity-100 group-hover:translate-x-0 -translate-x-1 opacity-0 transition-all duration-200 flex justify-center items-center hover:translate-y-[2px]">
                  <span className="material-symbols-outlined text-[20px]">check_circle</span>
                </button>
                <button className="group-hover:opacity-100 group-hover:translate-x-0 -translate-x-1 opacity-0 transition-all duration-200 flex justify-center items-center hover:translate-y-[2px]" onClick={() => handleDeleteTodo(index)}>
                  <span className="material-symbols-outlined text-[20px]">delete</span>
                </button>
                </div>
                
              </li>
            );
          })}
      </ul>
    </section>
  );
};

export default ProjectViewTodos;
