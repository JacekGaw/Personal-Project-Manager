import React, { useContext, useEffect, useState } from "react";
import { ProjectsContext } from "../../store/projects-context";
import Card from "../../components/UI/Card";
import { Link, NavLink } from "react-router-dom";

const Bookmarks = () => {
  const { projects } = useContext(ProjectsContext);
  const [bookmarks, setMookmarks] = useState([]);
  useEffect(() => {
    let arr = projects.filter((project) => project.status === "important");
    setMookmarks(arr);
  }, [projects]);

  return (
    <Card className={"p-5"}>
      <h3 className="text-lg font-[600] text-darkjeans pb-2">
        Important Projects:
      </h3>
      <ul className="flex flex-col gap-1 sm:overflow-y-scroll">
        <li className="flex justify-between text-xs font-[800] text-slate-500">
          <p>Project:</p>
        </li>
        {bookmarks.length > 0 &&
          bookmarks.map((bookmark, index) => {
            return (
              <li key={index}>
                <NavLink
                  to={`/dashboard/projects/${bookmark.id}`}
                  className={
                    "flex justify-between items-center bg-slate-50 p-2 border rounded-md $"
                  }
                >
                  <p className="text-sm font-[400]">{bookmark.Title}</p>
                </NavLink>
              </li>
            );
          })}
      </ul>
      {bookmarks.length === 0 && (
        <p className="font-[700] text-xs text-center px-2 py-5">
          No projects marked as important
        </p>
      )}
    </Card>
  );
};

export default Bookmarks;
