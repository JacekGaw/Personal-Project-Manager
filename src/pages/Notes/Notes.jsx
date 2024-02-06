import React, { useRef, lazy, Suspense } from "react";
import Button from "../../components/UI/Button";
import Modal from "../../components/UI/Modal";
import AddNoteForm from "./AddNoteForm";

import Loading from "../../components/Loading";

const NotesList = lazy(() => import("./NotesList"));

const Notes = () => {
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
        <AddNoteForm onAddProject={handleAddProject} />
      </Modal>
      <section className="w-full p-5">
        <header>
          <h1 className="p-5 text-center font-bold text-3xl">Notes</h1>
        </header>
        <div className="my-2 text-center">
          <Button onClick={handleClick}>Add Note</Button>
        </div>
        <Suspense fallback={<Loading />}>
          <NotesList />
        </Suspense>
      </section>
    </>
  );
};

export default Notes;
