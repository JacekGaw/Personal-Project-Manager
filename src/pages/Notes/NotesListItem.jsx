import React, { useRef, useState, useEffect, useContext } from "react";
import { decodeTimestamp } from "../../helpers/decodeTimestamp";
import { NotesContext } from "../../store/notes-context";
import Modal from "../../components/UI/Modal";
import Button from "../../components/UI/Button";
import NoteInfo from "./NoteInfo";

const NotesListItem = ({ note, index }) => {
  const {deleteNote} = useContext(NotesContext);
  const modalRef = useRef();
  const [disabled, setDisabled] = useState(false);
  const [height, setHeight] = useState(0);
  const [modalOutput, setModalOutput] = useState();
  const textElement = useRef();
  const moreElement = useRef();

  useEffect(() => {
    setHeight(textElement.current.clientHeight);
    if (textElement.current.clientHeight > 64) {
      moreElement.current.style.visibility = "visible";
    }
    textElement.current.style.height = "60px";
  }, [textElement, moreElement]);

  const handleDeleteNote = async () => {
    try {
      setDisabled(true);
      await deleteNote(note.id);
      setDisabled(false);
    } catch (err) { console.log(err); }
  }

  const handleGetMore = () => {
    modalRef.current.open();
    setModalOutput(<NoteInfo note={note} onDelete={handleDeleteNote} />);
  }

  return (
    <><Modal ref={modalRef}>{modalOutput}</Modal>
      <li className="relative  w-full h-fit rounded-md bg-white p-5 flex flex-col justify-between drop-shadow-sm hover:drop-shadow-md transition-all duration-200">
        <header className="flex justify-between items-start">
          <h3 className="text-md font-[800]">
            <span>{index}.</span> {note.title}
          </h3>
          <div className="relative group p-1">
            <span className="material-symbols-outlined flex justify-center items-center text-[18px]">
              more_vert
            </span>
            <div className=" p-1 bg-white rounded-full absolute hidden gap-1 group-hover:flex right-[100%] top-0 ">
              <button className="material-symbols-outlined flex justify-center items-center text-[18px]" disabled={disabled} onClick={handleDeleteNote}>
                delete
              </button>
              <button className="material-symbols-outlined flex justify-center items-center text-[18px]">
                edit
              </button>
            </div>
          </div>
        </header>
        <div>
          <p className="text-xs text-slate-500 font-[600]">
            Created: {decodeTimestamp(note.created).toLocaleDateString()}
          </p>
        </div>
        <div>
          <div
            className="py-2 border-t border-slate-200 relative mt-2 text-xs font-[400] overflow-hidden whitespace-pre-wrap"
            ref={textElement}
          >
            {note.noteText}
            <p
              ref={moreElement}
              className={`group hover:cursor-pointer absolute flex justify-center items-center invisible bottom-0 left-0 w-full bg-gradient-to-b from-white/50 to-white/100`}
              onClick={handleGetMore}
            >
              <span className="material-symbols-outlined flex justify-center items-center">
                more_horiz
              </span>
              <button className="hidden group-hover:block ">More</button>
            </p>
          </div>
        </div>
      </li>
    </>
  );
};

export default NotesListItem;