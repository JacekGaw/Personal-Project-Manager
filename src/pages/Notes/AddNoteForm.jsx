import React, { useContext, useRef, useState } from "react";
import Button from "../../components/UI/Button";
import { ProjectsContext } from "../../store/projects-context";
import { NotesContext } from "../../store/notes-context";

const AddNoteForm = ({ onAddProject, projectID, noteEdit }) => {
  const titleRef = useRef();
  const noteRef = useRef();
  const assignRef = useRef();
  const { projects } = useContext(ProjectsContext);
  const { addNote, editNote } = useContext(NotesContext);
  const [disabled, setDisabled] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let assignTitle = "";
    let assignID = "none";

    if (projectID) {
      assignID = projectID;
      assignTitle = projects.filter((project) => project.id === projectID)[0]
        .Title;
    } else if (assignRef.current.value !== "none") {
      assignID = assignRef.current.value;
      assignTitle = projects.filter((project) => project.id === assignID)[0]
        .Title;
    } else assignTitle = "none";

    try {
      setDisabled(true);
      if (noteEdit) {
        await editNote(
          noteEdit.id,
          titleRef.current.value,
          noteRef.current.value,
          assignID,
          assignTitle
        );
      } else if (!noteEdit) {
        await addNote(
          titleRef.current.value,
          noteRef.current.value,
          assignID,
          assignTitle
        );
      }
      setDisabled(false);
    } catch (err) {
      console.log(err);
    }
    titleRef.current.value = "";
    noteRef.current.value = "";
    if (!projectID) {
      assignRef.current.value = "none";
    }
    onAddProject();
  };

  return (
    <>
      <header className="p-2 mb-2">
        <h3 className="text-center text-xl font-[600] text-darkjeans">
          Add Note:
        </h3>
      </header>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-4">
        <div className="flex flex-col">
          <label
            htmlFor="note-title"
            className="text-sm text-slate-700 font-[400]"
          >
            Note Title:
          </label>
          <input
            type="text"
            id="note-title"
            className="min-w-[300px] shadow-sm border border-lightjeans hover:border-darkjeans transition-all duration-200 rounded-md p-2 text-sm text-darkjeans"
            ref={titleRef}
            defaultValue={noteEdit && noteEdit.title}
            required
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="note-text"
            className="text-sm text-slate-700 font-[400]"
          >
            Note:
          </label>
          <textarea
            id="note-text"
            className="h-48 shadow-sm border border-lightjeans hover:border-darkjeans transition-all duration-200 rounded-md p-2 text-sm text-darkjeans"
            ref={noteRef}
            defaultValue={noteEdit && noteEdit.noteText}
            required
          />
        </div>
        {!projectID && (
          <div>
            <label
              htmlFor="note-assign"
              className="text-sm text-slate-700 font-[400]"
            >
              Asign To:
            </label>
            <select
              id="note-assign"
              className="text-sm text-slate-700 font-[400]"
              ref={assignRef}
              defaultValue={noteEdit && noteEdit.assign}
            >
              <option value="none">--None--</option>
              {projects.map((project, index) => {
                return (
                  <option value={project.id} key={index}>
                    {project.Title}
                  </option>
                );
              })}
            </select>
          </div>
        )}

        <Button type="submit" disabled={disabled}>
          {noteEdit ? "Update Note" : "Add Note"}
        </Button>
      </form>
    </>
  );
};

export default AddNoteForm;
