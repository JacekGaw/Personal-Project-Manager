import React, {useRef} from 'react';
import SignUpForm from './SignUpForm';

const SignUp = () => {
    const loginInfo = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(loginInfo.current.getLoginData());
    }

    return ( 
        <>
        <h1>Sign Up!</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
            <SignUpForm ref={loginInfo} />
            <button type='submit'>Log In</button>
        </form>
        </>
    );
}
 
export default SignUp;