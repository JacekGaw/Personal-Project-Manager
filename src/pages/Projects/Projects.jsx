import React, { useRef, lazy, Suspense } from "react";
import Button from "../../components/UI/Button";
import Modal from "../../components/UI/Modal";
import AddProjectForm from "./AddProjectForm";
import Loading from "../../components/Loading";

const ProjectsList = lazy(() => import("./ProjectsList"));

const Projects = () => {
  const modalRef = useRef();

  const handleClick = () => {
    modalRef.current.open();
  };

  const handleAddProject = () => {
    modalRef.current.close();
  };

  return (
    <>
      <Modal ref={modalRef}>
        <AddProjectForm onAddProject={handleAddProject} />
      </Modal>
      <section className="w-full p-5">
        <header>
          <h1 className="p-5 text-center font-bold text-3xl">Projects</h1>
        </header>
        <div className="my-2 text-center">
          <Button onClick={handleClick}>Add Project</Button>
        </div>
        <Suspense fallback={<Loading />}>
          <ProjectsList />
        </Suspense>
      </section>
    </>
  );
};

export default Projects;
