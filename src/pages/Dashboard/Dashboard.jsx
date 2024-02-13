import React, { useContext } from "react";
import { AuthContext } from "../../store/auth-context";
import { ProjectsContext } from "../../store/projects-context";
import Loading from "../../components/Loading";
import { NotesContext } from "../../store/notes-context";
import Clock from "./Clock";
import Card from "../../components/UI/Card";
import UrgentProjects from "./UrgentProjects";
import Bookmarks from "./Bookmarks";
import StatisticsItem from "./StatisticsItem";

const Dashboard = () => {
  const { notes } = useContext(NotesContext);
  const {projects} = useContext(ProjectsContext);
  const { user } = useContext(AuthContext);
  console.log(user);

  const activeTodos = () => {
    let allTodosArrays = projects.map(project => project.Todos);
    let allTodos = allTodosArrays.flat(1);
    return allTodos.filter(todos => todos.status !== 'done').length;
  }

  return (
    <section className="w-full p-5 gap-4 flex flex-col max-w-screen-lg m-auto mb-2">
      <header>
        <h1 className="p-5 text-center font-bold text-3xl">Dashboard</h1>
      </header>
      <div className="w-full gap-4 grid grid-cols-3">
        <Card className="col-span-2 flex p-5 justify-center items-center">
          <h2 className="sm:text-3xl font-[700] text-darkjeans text-center ">
            Hello <span className="material-symbols-outlined">waving_hand</span>{" "}
            {user.displayName}!
          </h2>
        </Card>
        <div>
          <Clock />
        </div>
      </div>
      <div className="w-full gap-4 grid sm:grid-cols-2">
        <UrgentProjects />
        <Bookmarks />
      </div>
      <div className="w-full gap-4 grid grid-cols-3">
        <StatisticsItem label={"Projects:"} value={projects.filter(project => project.status !== "done").length} secondLabel={"Currently active projects."}/>
        <StatisticsItem label={"Todos:"} value={activeTodos()} secondLabel={"Currently active ToDos."}/>
        <StatisticsItem label={"Notes:"} value={notes.length} secondLabel={"Currently saved notes."}/>
      
      </div>
    </section>
  );
};

export default Dashboard;
