import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {    
    const navigate = useNavigate();

    return (
        <>
            <header>
                <h1>Personal Project Manager</h1>
            </header>
            <section>
                <button onClick={() => {navigate("/signup")}}>Sign Up</button>
                <button onClick={() => {navigate("/signin")}}>Log In</button>
            </section>
        </>
    )

}

export default Home;