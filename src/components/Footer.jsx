import React from 'react';

const Footer = () => {
    return (
        <footer className='flex border-t border-slate-300 p-2 justify-center gap-2 items-center'>
            <p className='text-xs text-slate-500 font-[600]'>Created By Jacek Gawlyta</p>
            <div className='*:text-xs *:text-jeans *:underline flex gap-2'>
                <a href='https://github.com/JacekGaw/Personal-Project-Manager' target='_blank' >Github</a>
                <a href='' target='_blank'>LinkedIn</a>
            </div>
        </footer>
    )
}

export default Footer;