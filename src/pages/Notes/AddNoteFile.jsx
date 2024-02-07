import React, {useState, useContext, useRef} from 'react';
import Button from '../../components/UI/Button';
import { NotesContext } from '../../store/notes-context';


const AddNoteFile = ({onAddFile, noteID}) => {
    const fileRef = useRef();
    const {addFile} = useContext(NotesContext);
    const [uploadFile, setUploadFile] = useState();

    const handleAddFile = async(e) => {
        e.preventDefault();
        console.log(uploadFile);
        try {
            await addFile(uploadFile, noteID);

        } catch (err) { console.log(err)}
        fileRef.current.value = "";
        setUploadFile("");
        onAddFile();
    };

    return (
        <>
        <header className="p-2 mb-2">
        <h3 className="text-center text-xl font-[600] text-darkjeans">
          Add Note:
        </h3>
      </header>
      <form onSubmit={handleAddFile}>
        <input type="file" ref={fileRef} onChange={(e) => setUploadFile(e.target.files[0])}/>
        <Button type="submit" >Add File</Button>
      </form>
      </>
    )
}  

export default AddNoteFile;