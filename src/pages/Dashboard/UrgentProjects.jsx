import React, { useContext, useEffect, useState } from "react";
import { ProjectsContext } from "../../store/projects-context";
import Card from "../../components/UI/Card";
import { countDaysLeft } from "../../helpers/countDaysLeft";
import { decodeTimestamp } from "../../helpers/decodeTimestamp";
import { Link, NavLink } from "react-router-dom";

const UrgentProjects = () => {
  const { projects } = useContext(ProjectsContext);
  const [urgentProjects, setUrgentProjects] = useState([]);
  let arr = [];

  const compareDays = (a, b) => {
    return a.DaysLeft - b.DaysLeft;
  };

  useEffect(() => {
    projects.forEach((project, index) => {
      arr[index] = {
        DaysLeft: countDaysLeft(decodeTimestamp(project.plannedEndDate)),
        Project: project,
      };
    });
    arr.sort(compareDays);
    let newArr = arr.slice(0, 3);
    setUrgentProjects(newArr);
  }, [projects]);
  return (
    <Card className="p-5">
        <h3 className="text-lg font-[600] text-darkjeans pb-2">Most Urgent Projects:</h3>
      <ul className="flex flex-col gap-1">
        <li className="flex justify-between text-xs font-[800] text-slate-500">
        <p>Project:</p>
        <p>Days Left:</p>
        </li>
        {urgentProjects.map((item, index) => {
          return (
            <li key={index}>
              <NavLink  to={`/dashboard/projects/${item.Project.id}`} className={`flex justify-between items-center bg-slate-50 p-2 border rounded-md ${item.DaysLeft < 5 ? "border-red-700" : "border-orange-500"}`}>
                <p className="text-sm">{item.Project.Title}</p>
                <p className="text-sm font-[900]">{item.DaysLeft}</p>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </Card>
  );
};

export default UrgentProjects;
