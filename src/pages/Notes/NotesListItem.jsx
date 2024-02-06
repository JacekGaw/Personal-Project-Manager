import React, { useRef, useState, useEffect } from "react";
import { decodeTimestamp } from "../../helpers/decodeTimestamp";

const NotesListItem = ({ note, index }) => {
  const [height, setHeight] = useState(0);
  const textElement = useRef();
  const moreElement = useRef();

  useEffect(() => {
    setHeight(textElement.current.clientHeight);
    console.log(textElement.current.clientHeight);
    if (textElement.current.clientHeight > 64) {
      moreElement.current.style.visibility = "visible";
    }
    textElement.current.style.height = "50px";
  }, []);

  return (
    <>
      <li className="relative group w-full h-fit rounded-md bg-white p-5 flex flex-col justify-between drop-shadow-sm hover:drop-shadow-md transition-all duration-200">
        <header>
          <h3>
            <span>{index}</span> {note.title}
          </h3>
        </header>
        <div>
          <p>Created: {decodeTimestamp(note.created).toLocaleDateString()}</p>
        </div>
        <div>
          <div
            className="relative text-xs font-[400] overflow-hidden whitespace-pre-wrap"
            ref={textElement}
          >
            {note.noteText}
            <p
              ref={moreElement}
              className={`absolute invisible bottom-0 left-0 w-full bg-gradient-to-b from-white/50 to-white/100`}
            >
              <span className="material-symbols-outlined flex justify-center items-center">
                more_horiz
              </span>
            </p>
          </div>
        </div>
      </li>
    </>
  );
};

export default NotesListItem;
