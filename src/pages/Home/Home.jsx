import React from 'react';
import Button from '../../components/UI/Button';
import { useNavigate } from 'react-router-dom';

const Home = () => {    
    const navigate = useNavigate();

    return (
        <section className='bg-slate-100 w-full min-h-screen flex flex-col items-center justify-center'>
            <header className='text-center p-10'>
                <h1 className='text-6xl text-jeans font-bold mb-5'><span className='text-jeans'>Per<span className='text-gold'>Project</span></span> Manager</h1>
                <p className='font-[400] max-w-[600px] text-slate-700 text-sm'>Welcome to PerProject Manager, the ultimate solution for individuals seeking seamless project management at their fingertips. PerProject is not just another task manager; it's your dedicated companion for turning ideas into reality and achieving your goals with efficiency and precision. <br/><br />
                With TaskMate, you can effortlessly organize your tasks, set priorities, and track progress in real-time. The intuitive interface makes it easy to create, edit, and categorize tasks, ensuring that you stay on top of your projects, whether they're personal endeavors, work-related tasks, or collaborative initiatives.</p>
            </header>
            <section className='flex gap-4'>
                <Button onClick={() => {navigate("/signup")}} className="bg-gold p-3">Sign Up</Button>
                <Button onClick={() => {navigate("/signin")}}>Log In</Button>
            </section>
        </section>
    )

}

export default Home;