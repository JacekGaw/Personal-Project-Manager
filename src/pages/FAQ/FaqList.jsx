import React, { useState } from "react";
import { Faq_q } from "../../store/FAQ_QUESTIONS";

const FaqList = () => {
  const [open, setOpen] = useState();

  const handleOpenQ = (index) => {
    setOpen(prevState => {
        if(prevState === index){
            return "";
        }
        else return index;
    });
  };

  return (
    <ul className="p-5 flex flex-col gap-2 max-w-screen-md m-auto">
      {Faq_q.map((faq, index) => {
        return (
          <li className="group bg-white p-5 " key={index} onClick={() => handleOpenQ(index)}>
            <header className="flex justify-between items-center">
              <h3>{faq.Q}</h3>
              <button
                className="material-symbols-outlined flex justify-center items-center group-hover:rotate-180 transition-all duration-200"
              >
                {open === index ? "remove" : "add"}
              </button>
            </header>
            <div className={`grid overflow-hidden transition-all duration-300 ease-in-out text-slate-600 text-sm ${
          open === index 
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}>
              <p
                className={"overflow-hidden"}>
                {faq.A}
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default FaqList;
