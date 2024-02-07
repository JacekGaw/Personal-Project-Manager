import React, { useContext, useEffect, useState, useRef } from "react";
import { NotesContext } from "../../store/notes-context";
import Button from "../../components/UI/Button";
import Modal from "../../components/UI/Modal";
import AddNoteForm from "../Notes/AddNoteForm";
import NotesListItem from "../Notes/NotesListItem";

const ProjectNotes = ({ projectID }) => {
    const modalRef = useRef();
  const { notes } = useContext(NotesContext);
  const [projectNotes, setProjectNotes] = useState([]);
  const [modalOutput, setModalOutput] = useState();


  useEffect(() => {
    setProjectNotes(notes.filter((note) => note.assign === projectID));
  }, [notes, projectID]);

  const handleClickAddNote = () => {
    setModalOutput(<AddNoteForm onAddProject={handleCloseModal} projectID={projectID}/>);
    modalRef.current.open(); 
  }
  const handleCloseModal = () => {
    modalRef.current.close();
  }

  return (
    <>
        <Modal ref={modalRef}>{modalOutput}</Modal>
      <div className="w-full p-5">
        <div className="flex justify-between items-center">
          <h3 className="font-[700] text-md text-darkjeans">Notes:</h3>
          <Button onClick={handleClickAddNote} className={`material-symbols-outlined text-[10px]`}>add</Button>
        </div>
        <ul className="bg-slate-100 mt-2 p-5 grid w-full lg:max-w-screen-lg mx-auto gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {projectNotes.map((note, index) => {
          return <NotesListItem note={note} index={index+1} key={note.id}/>;
        })}
        </ul>
      </div>
    </>
  );
};

export default ProjectNotes;
