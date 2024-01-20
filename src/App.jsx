import React from 'react';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import { Route, Routes } from 'react-router-dom';

function App() {

  return (
    <>
      <Routes>
        {/* <Route path='/' element={} /> */}
        <Route path='/signin' element={<SignIn />}/>
        <Route path='/signup' element={<SignUp />}/>
      </Routes>
    </>
  )
}

export default App
