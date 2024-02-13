import React, { useContext, useEffect, useState } from "react";
import { NotesContext } from "../../store/notes-context";
import NotesListItem from "./NotesListItem";


const NotesList = () => {
  const { notes } = useContext(NotesContext);

  return (
    <>
        <div className="max-w-screen-lg m-auto  mt-5 border-b border-b-lightjeans py-1">
        <p className="text-xs font-[800]">{notes && notes.length} projects found.</p>
      </div>
      <ul className="p-5 grid w-full lg:max-w-screen-lg mx-auto gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {notes && notes.map((note, index) => {
          return <NotesListItem key={note.id} index={index+1} note={note}>{note.noteText}</NotesListItem>;
        })}
      </ul>
    </>
  );
};

export default NotesList;
