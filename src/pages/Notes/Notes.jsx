import React, {useRef} from "react";
import Button from "../../components/UI/Button";
import Modal from "../../components/UI/Modal";
import AddNoteForm from "./AddNoteForm";

const Notes = () => {
    const modalRef = useRef();

    const handleClick = () => {
        modalRef.current.open();
    }

    const handleAddProject = () => {modalRef.current.close()};

  return (
    <>
    <Modal ref={modalRef}><AddNoteForm onAddProject={handleAddProject}/></Modal>
    <section className="w-full p-5">
      <header>
        <h1 className="p-5 text-center font-bold text-3xl">Notes</h1>
      </header>
      <div className="my-2 text-center">
        <Button onClick={handleClick} >Add Note</Button>
        </div>
        
    </section>
    </>
  );
};

export default Notes;
