import React, { useContext } from "react";
import { AuthContext } from "../../store/auth-context";
import { ProjectsContext } from "../../store/projects-context";
import Loading from "../../components/Loading";
import { NotesContext } from "../../store/notes-context";
import Clock from "./Clock";
import Card from "../../components/UI/Card";
import UrgentProjects from "./UrgentProjects";
import Bookmarks from "./Bookmarks";

const Dashboard = () => {
  const { notes } = useContext(NotesContext);
  const { user } = useContext(AuthContext);
  console.log(user);

  return (
    <section className="w-full p-5 gap-4 flex flex-col">
      <div className="w-full gap-4 grid grid-cols-3">
        <Card className="col-span-2 flex justify-center items-center">
          <h2 className="text-3xl font-[700] text-darkjeans">
            Hello <span className="material-symbols-outlined">waving_hand</span>{" "}
            {user.displayName}!
          </h2>
        </Card>
        <div>
          <Clock />
        </div>
      </div>
      <div className="w-full gap-4 grid grid-cols-2">
        <UrgentProjects />
        <Bookmarks />
      </div>
    </section>
  );
};

export default Dashboard;
