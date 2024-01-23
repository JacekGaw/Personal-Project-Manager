import React from 'react';

const Button = ({onClick, className, disabled, children}) => {

    return (
        <button onClick={onClick} className={`p-2  rounded-md font-bold text-sm bg-jeans text-slate-50 hover:-translate-y-[2px] hover:shadow-sm transition-all duration-200 disabled:bg-cream ${className}`} disabled={disabled}>{children}</button>
    )

}

export default Button;