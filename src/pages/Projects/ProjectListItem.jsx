import React from "react";
import { decodeTimestamp } from "../../helpers/decodeTimestamp";
import { Link } from "react-router-dom";
import { countDaysLeft } from "../../helpers/countDaysLeft";

const ProjectListItem = ({ projectInfo }) => {

  return (
    <>
      <li className="relative group w-full rounded-md bg-white p-5 flex justify-between drop-shadow-sm hover:drop-shadow-md transition-all duration-200">
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
              <span className="material-symbols-outlined text-2xl opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
                arrow_right_alt
              </span>
            </Link>
          </div>
        </div>
      </li>
    </>
  );
};

export default ProjectListItem;
