import React from 'react';
import FaqList from './FaqList';

const Faq = () => {
    return (
        <section className="w-full p-5">
        <header>
          <h1 className="p-5 text-center font-bold text-3xl">FAQ</h1>
          <p className='text-center w-full text-sm font-[300]'>Guides for navigating and working with this app. </p>
        </header>
        <FaqList />
      </section>
    )
}

export default Faq;