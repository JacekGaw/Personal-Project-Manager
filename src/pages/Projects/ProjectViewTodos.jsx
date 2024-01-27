import React, { useContext, useState, useRef } from "react";
import { ProjectsContext } from "../../store/projects-context";
import { useParams } from "react-router-dom";
import Button from "../../components/UI/Button";

const ProjectViewTodos = (todos) => {
  const newTodoRef = useRef();
  const [newTodoInputVisibility, setNewTodoInputVisibility] = useState(false);
  const { projectIDparam } = useParams();
  const {deleteTodo, addTodo, changeStatus} = useContext(ProjectsContext);

    const countWithStatus = (status) => {
        const arr = todos.todos.filter(todo => todo.status === status);
        return arr.length;
    }

    const handleDeleteTodo = async (todoIndex) => {
        try {
            await deleteTodo(projectIDparam, todoIndex);
        } catch (err) {console.log(err);}
    }

    const handleClickAddTodo = async () => {
      setNewTodoInputVisibility(true);
    }

    const handleAddTodo = async () => {
      if(newTodoRef.current.value !== ''){
        try {
          await addTodo(projectIDparam, newTodoRef.current.value);
        } catch (err) {console.log(err);}
      }
      setNewTodoInputVisibility(false);
    };

    const handleChangeStatus = async (index, status) => {
      try {
        await changeStatus(projectIDparam, index, status);
      } catch (err) {console.log(err);}
    }

  return (
    <section className="w-full p-2">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 text-sm text-slate-600 font-[300]" >
            <p>Active: {countWithStatus('active')}</p>
            <p>Done: {countWithStatus('done')}</p>
            <p>Urgent: {countWithStatus('urgent')}</p>
        </div>
        <div className="flex justify-center gap-1">
          {newTodoInputVisibility ? <input type="text" ref={newTodoRef} className="text-xs p-1 max-w-200px border border-lightjeans rounded-sm hover:border-darkjeans transition-all duration-200" /> : ""}
          
        <Button className={`text-xs`} onClick={newTodoInputVisibility ? handleAddTodo : handleClickAddTodo}>{newTodoInputVisibility ? "Add Todo" : "+"}</Button>
        </div>
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
                  <span className="font-[700]">{index + 1}.</span> {todo.todo} - {todo.status}
                </p>
                <div className="flex gap-1">
                <button className="group-hover:opacity-100 group-hover:translate-x-0 -translate-x-1 opacity-0 transition-all duration-200 flex justify-center items-center hover:translate-y-[2px]">
                  <span className="material-symbols-outlined text-[20px]" onClick={() => handleChangeStatus(index, "urgent")}>local_fire_department</span>
                </button>
                <button className="group-hover:opacity-100 group-hover:translate-x-0 -translate-x-1 opacity-0 transition-all duration-200 flex justify-center items-center hover:translate-y-[2px]">
                  <span className="material-symbols-outlined text-[20px]" onClick={() => handleChangeStatus(index, "done")}>check_circle</span>
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
