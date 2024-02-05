import React, {useContext ,useRef} from "react";
import Button from "../../components/UI/Button";
import { ProjectsContext } from "../../store/projects-context";
import { NotesContext } from "../../store/notes-context";

const AddNoteForm = ({ onAddProject }) => {
    const titleRef = useRef();
    const noteRef = useRef();
    const assignRef = useRef();
    const {projects} = useContext(ProjectsContext);
    const {addNote} = useContext(NotesContext);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await addNote(titleRef.current.value, noteRef.current.value, assignRef.current.value);
    } catch (err) { console.log(err); }
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
            required
          />
        </div>
        <div>
        <label
            htmlFor="note-assign"
            className="text-sm text-slate-700 font-[400]"
          >
            Asign To:
          </label>
          <select id="note-assign" className="text-sm text-slate-700 font-[400]" ref={assignRef}>
            <option value="none">--None--</option>
            {projects.map((project, index) => {
                return <option value={project.id} key={index}>{project.Title}</option>
            })}
          </select>
        </div>
        <Button type="submit">Add Note</Button>
      </form>
    </>
  );
};

export default AddNoteForm;
