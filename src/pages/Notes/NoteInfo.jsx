import React from "react";
import { decodeTimestamp } from "../../helpers/decodeTimestamp";

const NoteInfo = ({ note, onDelete }) => {

  return (
    <section className="max-w-screen-md">
      <header className="flex flex-col gap-1">
        <div className="flex justify-between items-center">
            <h2 className="text-xl font-[700]">{note.title}</h2>
            <div className="flex">
            <button className="material-symbols-outlined flex justify-center items-center text-[18px]">
                edit
              </button>
            <button className="material-symbols-outlined flex justify-center items-center text-[18px]" onClick={onDelete}>
                delete
              </button>
            </div>
        </div>
        <div className="flex flex-row gap-2">
          <p className="text-sm font-[500] text-slate-600">Created: {decodeTimestamp(note.created).toLocaleDateString()}</p>
          <p className="text-sm font-[500] text-slate-600">Assigned to: {note.assignTitle}</p>
       </div>
      </header>
      <div className="p-5 bg-slate-100 mt-2">
        <p className="whitespace-pre-wrap text-sm">{note.noteText}</p>
      </div>
    </section>
  );
};

export default NoteInfo;
