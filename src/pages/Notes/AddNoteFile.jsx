import React, { useState, useContext, useRef } from "react";
import Button from "../../components/UI/Button";
import { NotesContext } from "../../store/notes-context";

const AddNoteFile = ({ onAddFile, note }) => {
  const fileRef = useRef();
  const { addFile, deleteFile } = useContext(NotesContext);
  const [uploadFile, setUploadFile] = useState();

  const handleAddFile = async (e) => {
    e.preventDefault();
    console.log(uploadFile);
    try {
      await addFile(uploadFile, note.id);
    } catch (err) {
      console.log(err);
    }
    fileRef.current.value = "";
    setUploadFile("");
    onAddFile();
  };

  const handleDeleteFile = async (file) => {
    try {
      await deleteFile(file, note.id);
    } catch (err) { console.log(err);}
    onAddFile();
  }

  return (
    <>
      <header className="p-2 mb-2">
        <h3 className="text-center text-xl font-[600] text-darkjeans">
          Add Files:
        </h3>
      </header>
      <h4>Files:</h4>
      <ul className="p-2 *:text-xs">
        {note &&
          note.files.map((file, index) => {
            return (
              <li key={index} className="group flex justify-between items-center">
                <a
                  href={file.fileURL}
                  target="_blank"
                  download
                  className="text-darkjeans hover:text-lightjeans"
                >
                  {file.fileName}
                </a>
                <button className="material-symbols-outlined  justify-center items-center text-[16px] hidden group-hover:flex" onClick={() => handleDeleteFile(file)}>delete</button>
              </li>
            );
          })}
      </ul>
      <form onSubmit={handleAddFile}>
        <input
          type="file"
          ref={fileRef}
          onChange={(e) => setUploadFile(e.target.files[0])}
        />
        <Button type="submit">Add File</Button>
      </form>
    </>
  );
};

export default AddNoteFile;
