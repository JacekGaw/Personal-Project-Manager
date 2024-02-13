import React, { useContext } from "react";
import { ProjectsContext } from "../../store/projects-context";
import { useParams } from "react-router-dom";

const ProjectViewTodosItem = ({ todo, index }) => {
  const { changeTodoStatus, deleteTodo } = useContext(ProjectsContext);
  const { projectIDparam } = useParams();

  const handleChangeStatus = async (todoID, status) => {
    try {
      await changeTodoStatus(projectIDparam, todoID, status);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteTodo = async (todoIndex) => {
    try {
      await deleteTodo(projectIDparam, todoIndex);
    } catch (err) {
      console.log(err);
    }
  };
  // ${todo.status == 'urgent' && "bg-jeans text-slate-100"} ${todo.status == 'active' && "bg-lightjeans"} ${todo.status == 'done' && "bg-lightcream "}
  return (
    <li
      key={index}
      className={`group flex justify-between p-2 rounded-sm shadow-sm bg-slate-50`}
    >
      <p className="font-[400] text-sm">
        <span className="font-[500]">{index + 1}.</span> {todo.todo}
      </p>
      <div className="flex gap-1">
        <button className="group-hover:opacity-100 group-hover:translate-x-0 -translate-x-1 opacity-0 transition-all duration-200 flex justify-center items-center hover:translate-y-[2px]">
          <span
            className="material-symbols-outlined text-[20px]"
            onClick={() =>
              handleChangeStatus(
                todo.id,
                todo.status == "urgent" ? "active" : "urgent"
              )
            }
          >
            local_fire_department
          </span>
        </button>
        <button className="group-hover:opacity-100 group-hover:translate-x-0 -translate-x-1 opacity-0 transition-all duration-200 flex justify-center items-center hover:translate-y-[2px]">
          <span
            className="material-symbols-outlined text-[20px]"
            onClick={() =>
              handleChangeStatus(
                todo.id,
                todo.status == "done" ? "active" : "done"
              )
            }
          >
            check_circle
          </span>
        </button>
        <button
          className="group-hover:opacity-100 group-hover:translate-x-0 -translate-x-1 opacity-0 transition-all duration-200 flex justify-center items-center hover:translate-y-[2px]"
          onClick={() => handleDeleteTodo(todo.id)}
        >
          <span className="material-symbols-outlined text-[20px]">delete</span>
        </button>
      </div>
    </li>
  );
};

export default ProjectViewTodosItem;
