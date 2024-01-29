import React, { useContext, useEffect, useState, useRef } from "react";
import { ProjectsContext } from "../../store/projects-context";
import { Link, useParams } from "react-router-dom";
import { decodeTimestamp } from "../../helpers/decodeTimestamp";
import ProjectViewTodos from "./ProjectViewTodos";
import Button from "../../components/UI/Button";
import { compareDates } from "../../helpers/compareDates";
import { countDaysLeft } from "../../helpers/countDaysLeft";

const ProjectView = () => {
  const newDescRef = useRef();
  const newPlannedEndDateRef = useRef();
  const { projectIDparam } = useParams();
  const { projects, getSingleProjectInfo, changeDescription, changeEndDate } =
    useContext(ProjectsContext);
  const [project, setProject] = useState();
  const [editDesc, setEditDesc] = useState(false);
  const [editDate, setEditDate] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        await setProject(getSingleProjectInfo(projectIDparam));
      } catch (err) {
        console.log(err);
      }
    };
    fetch();
  }, [projects]);

  const handleClickChangeDesc = () => {
    setEditDesc((prevState) => {
      return !prevState;
    });
  };

  const handleChangeDesc = async () => {
    try {
      await changeDescription(projectIDparam, newDescRef.current.value);
    } catch (err) {
      console.log(err);
    }
    setEditDesc(false);
  };

  const handleClickChangeDate = () => {
    setEditDate((prevState) => {
      return !prevState;
    });
  };

  const handleChangeDate = async () => {
    
    const pickedDate = compareDates(
      newPlannedEndDateRef.current.value,
      new Date()
    );
    if (pickedDate === 0 || pickedDate === 1) {
      try {
        await changeEndDate(projectIDparam, newPlannedEndDateRef.current.value);
      } catch (err) {
        console.log(err);
      }
    }
    setEditDate(false);
  };

  return (
    <>
      <section className="w-full  p-5">
        <header className="w-full relative">
          <Link
            to={"/dashboard/projects"}
            className="absolute flex justify-center items-center top-[50%] left-0 translate-y-[-50%]"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          <h1 className="p-5 text-center font-bold text-3xl">
            {project && project.Title}
          </h1>
        </header>
        <section className="my-2 w-full xl:w-[80%] mx-auto bg-white rounded-md shadow-sm">
          <div className="flex flex-col md:flex-row md:gap-2 items-center md:justify-center mb-2 px-5 py-2 bg-dustgold rounded-t-md">
          <div className="flex gap-2">
              <h3 className="font-[700] text-sm text-darkjeans">Days Left: </h3>
              <p className="text-sm font-[300]">
                {project &&
                  countDaysLeft(decodeTimestamp(project.plannedEndDate))}
              </p>
            </div>
            <div className="flex gap-2">
              <h3 className="font-[700] text-sm text-darkjeans">Created: </h3>
              <p className="text-sm font-[300]">
                {project &&
                  decodeTimestamp(project.created).toLocaleDateString()}
              </p>
            </div>
            <div className="flex gap-2">
              <div className="flex items-center gap-1">
                <h3 className="font-[700] text-sm text-darkjeans">
                  Planned End Date:{" "}
                </h3>
                
                {!editDate ? (
                <p className="text-sm font-[300]">
                {project &&
                  decodeTimestamp(
                    project.plannedEndDate
                  ).toLocaleDateString()}
              </p>
              ) : (
                <div className="flex justify-center items-center">
                  <input type="date" ref={newPlannedEndDateRef} className="text-xs p-1 w-full border border-lightjeans rounded-sm hover:border-darkjeans transition-all duration-200 whitespace-pre-line" />
                  <Button onClick={handleChangeDate} className={`text-xs`}>Change</Button>
                </div>
              )}
                <button
                  className="flex justify-center items-center"
                  onClick={handleClickChangeDate}
                >
                  <span className="material-symbols-outlined text-[18px] hover:-translate-y-[2px] transition-all duration-200">
                    {editDate ? "close" : "edit"}
                  </span>
                </button>
              </div>
              
            </div>
          </div>
          <div className="p-5 flex flex-col gap-2 lg:flex-row lg:justify-between">
            <div className="w-full lg:w-1/2">
              <div className="flex items-center gap-2">
                <h3 className="font-[700] text-md text-darkjeans">
                  Project Description:
                </h3>
                <button
                  className="flex justify-center items-center"
                  onClick={handleClickChangeDesc}
                >
                  <span className="material-symbols-outlined text-[18px] hover:-translate-y-[2px] transition-all duration-200">
                    {editDesc ? "close" : "edit"}
                  </span>
                </button>
              </div>
              {!editDesc ? (
                <p className="whitespace-pre-line text-md text-justify font-[300] p-2">
                  {project && project.Description}
                </p>
              ) : (
                <div>
                  <textarea
                    className="text-xs p-1 w-full border border-lightjeans rounded-sm hover:border-darkjeans transition-all duration-200 whitespace-pre-line"
                    rows="5"
                    type="text"
                    ref={newDescRef}
                    defaultValue={project.Description}
                  />
                  <Button onClick={handleChangeDesc}>Change</Button>
                </div>
              )}
            </div>
            <div className="w-full lg:w-1/2">
              <h3 className="font-[700] text-md text-darkjeans">To Do:</h3>
              {project && <ProjectViewTodos todos={project.Todos} />}
            </div>
          </div>
        </section>
      </section>
    </>
  );
};

export default ProjectView;
