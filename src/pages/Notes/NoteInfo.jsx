import React from "react";
import { decodeTimestamp } from "../../helpers/decodeTimestamp";

const NoteInfo = ({ note, onDelete }) => {

  return (
    <section className="max-w-screen-md">
      <header className="flex flex-col gap-1">
        <div className="flex justify-between items-center">
            <h2 className="text-xl font-[700]">{note.title}</h2>
            <div className="flex">
            <button className="material-symbols-outlined flex justify-center items-center text-[18px]" onClick={onDelete}>
                delete
              </button>
            </div>
        </div>
        <div className="flex flex-row gap-2">
          <p className="text-sm font-[500] text-slate-600">Created: {decodeTimestamp(note.created).toLocaleDateString()}</p>
          <p className="text-sm font-[500] text-slate-600">Assigned to: {note.assignTitle}</p>
       </div>
       <ul className=" *:text-xs flex flex-wrap gap-1">
        <p>Files: </p>
        {note.files.length > 0 ? note.files.map((file, index) => {
          return <li key={index}><a href={file.fileURL} target="_blank" download={true} className="text-darkjeans hover:text-lightjeans">{file.fileName}</a></li>
        }) : <p>No files found</p>}
       </ul>
      </header>
      <div className="p-5 bg-slate-100 mt-2">
        <p className="whitespace-pre-wrap text-sm">{note.noteText}</p>
      </div>
    </section>
  );
};

export default NoteInfo;
