import React, {forwardRef, useImperativeHandle, useRef} from 'react';
import {createPortal} from 'react-dom';

const Modal = forwardRef(function Modal({className, children, onClose}, ref){
    const dialog = useRef();
    const button = useRef();
    useImperativeHandle(ref, () => {
        return {
            open() {
                dialog.current.showModal();
            },
            close() {
                button.current.click();
            }
        };
    });

    return createPortal( 
        <dialog ref={dialog} className={`${className} backdrop:bg-slate-800/80 p-10 rounded-md shadow-sm`}> 
            {children}
            <form method='dialog'>
                <button ref={button} className="p-2  rounded-md font-bold text-sm bg-jeans text-slate-50 hover:-translate-y-[2px] hover:shadow-sm transition-all duration-200 disabled:bg-cream">Close</button>
            </form>
        </dialog>,
        document.getElementById('modal-root')
    );
});
 
export default Modal;