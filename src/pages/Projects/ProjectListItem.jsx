import React from "react";
import { decodeTimestamp } from "../../helpers/decodeTimestamp";
import { Link } from "react-router-dom";
import { countDaysLeft } from "../../helpers/countDaysLeft";

const ProjectListItem = ({ projectInfo }) => {
  return (
    <>
      <li >
        <Link to={`/dashboard/projects/${projectInfo.id}`} className="relative group w-full rounded-md bg-white p-5 flex justify-between drop-shadow-sm hover:drop-shadow-md transition-all duration-200">
        <header>
          <h5 className=" font-[600] text-slate-800 text-md">
            {projectInfo.Title}
          </h5>
          <div className="flex gap-2">
            <p className="text-xs font-[300] text-slate-700">
              Todos: {projectInfo && projectInfo.Todos.length}
            </p>
            <p className="text-xs font-[300] text-slate-700">
              Days left:{" "}
              {projectInfo &&
                countDaysLeft(decodeTimestamp(projectInfo.plannedEndDate))}
            </p>
          </div>
          <div className="flex gap-2">
            <p className="text-xs font-[300] text-slate-700">
              Created:{" "}
              {projectInfo &&
                decodeTimestamp(projectInfo.created).toLocaleDateString()}
            </p>
            <p className="text-xs font-[300] text-slate-700">
              Planned End Date:{" "}
              {projectInfo &&
                decodeTimestamp(
                  projectInfo.plannedEndDate
                ).toLocaleDateString()}
            </p>
          </div>
        </header>
        <div className="flex gap-2">
          <div className="flex ">
            <Link
              to={`/dashboard/projects/${projectInfo.id}`}
              className=" flex justify-center items-center"
            >
              <span className="material-symbols-outlined text-2xl sm:opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
                arrow_right_alt
              </span>
            </Link>
          </div>
        </div>
        {projectInfo.Todos.length > 0 && (
          <progress
            id="progress-bar"
            max={projectInfo.Todos.length}
            value={
              projectInfo.Todos.filter((todo) => todo.status === "done").length
            }
            className="w-full absolute bottom-0 left-0 h-[5px] [&::-webkit-progress-bar]:bg-lightcream [&::-webkit-progress-value]:bg-jeans"
          />
        )}
        </Link>
      </li>
    </>
  );
};

export default ProjectListItem;
