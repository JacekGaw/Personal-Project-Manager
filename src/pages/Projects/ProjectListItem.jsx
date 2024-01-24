import React from "react";
import Button from "../../components/UI/Button";

const ProjectListItem = ({ projectInfo, arrayIndex }) => {
  return (
    <li className="group w-full rounded-md bg-white p-5 flex justify-between drop-shadow-sm hover:drop-shadow-md transition-all duration-200">
      <header>
        <h5 className=" font-[600] text-slate-800 text-md">
          {arrayIndex + 1}. {projectInfo.Title}
        </h5>
        <div className="flex gap-2">
          <p className="text-xs font-[300] text-slate-700">
            Created: {new Date(projectInfo.created.seconds).toISOString()}
          </p>
          <p className="text-xs font-[300] text-slate-700">
            Planned End Date:{" "}
            {new Date(projectInfo.plannedEndDate.seconds).toISOString()}
          </p>
        </div>
      </header>
      <div className="flex gap-2">
        <button className="w-12 flex justify-center items-center">
          <span className="material-symbols-outlined text-2xl opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">arrow_right_alt</span>
        </button>
      </div>
    </li>
  );
};

export default ProjectListItem;
