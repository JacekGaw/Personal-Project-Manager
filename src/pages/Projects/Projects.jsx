import React, {useRef} from "react";
import Button from "../../components/UI/Button";
import Modal from "../../components/UI/Modal";
import ProjectsList from "./ProjectsList";
import AddProjectForm from "./AddProjectForm";

const Projects = () => {
    const modalRef = useRef();

    const handleClick = () => {
        modalRef.current.open();
    }

  return (
    <>
    <Modal ref={modalRef}><AddProjectForm /></Modal>
    <section className="w-full p-5">
      <header>
        <h1 className="p-5 text-center font-bold text-3xl">Projects</h1>
      </header>
      <div className="my-2 text-center">
        <Button onClick={handleClick} >Add Project</Button>
        </div>
        <ProjectsList />
    </section>
    </>
  );
};

export default Projects;
