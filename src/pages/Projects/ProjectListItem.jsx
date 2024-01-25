import React,{useRef, useContext, useState} from "react";
import Button from "../../components/UI/Button";
import { decodeTimestamp } from "../../helpers/decodeTimestamp";
import Modal from "../../components/UI/Modal";
import { ProjectsContext } from "../../store/projects-context";

const ProjectListItem = ({ projectInfo, arrayIndex }) => {
  const {deleteProject} = useContext(ProjectsContext);
  const [disabled, setDisabled] = useState(false);
  const modalRef = useRef();

  const handleClickDelete = () => {
    modalRef.current.open();
  }

  const handleDelete = async () => {
    try {
      setDisabled(true);
      await deleteProject(projectInfo.id);
    } catch (err) {console.log(err)}
    setDisabled(false);
  }

  return (
    <>
    <Modal ref={modalRef}>
      <div className="flex flex-col gap-2 items-center mb-5">
        <header className="mb-5"> 
          <h3 className="text-center text-xl font-[500]">Project Delete</h3>
        </header>
        <p className="text-md mb-5">Do you want to delete project "{projectInfo.Title}"?</p>
        <p className="bg-red-700/30 p-4 text-center text-xs text-red-700 font-[900]">NOTE: This operation is irreversible! </p>
        
        <Button onClick={handleDelete} disabled={disabled} className={`bg-red-700 disabled:bg-red-200`}>Yes, DELETE</Button>
      </div>
    </Modal>
    <li className="group w-full rounded-md bg-white p-5 flex justify-between drop-shadow-sm hover:drop-shadow-md transition-all duration-200">
      <header>
        <h5 className=" font-[600] text-slate-800 text-md">
          {projectInfo.Title}
        </h5>
        <div className="flex gap-2">
          <p className="text-xs font-[300] text-slate-700">
            Created: {decodeTimestamp(projectInfo.created).toLocaleDateString()}
          </p>
          <p className="text-xs font-[300] text-slate-700">
            Planned End Date:{" "}
            {decodeTimestamp(projectInfo.plannedEndDate).toLocaleDateString()}
          </p>
        </div>
      </header>
      <div className="flex gap-2">
        <div className="flex ">
        <button className=" flex justify-center items-center">
          <span className="material-symbols-outlined text-2xl opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">arrow_right_alt</span>
        </button>
        <button className=" flex justify-center items-center">
          <span className="material-symbols-outlined text-2xl opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" onClick={handleClickDelete} >delete</span>
        </button>
        </div>
      </div>
    </li>
    </>
  );
};

export default ProjectListItem;
