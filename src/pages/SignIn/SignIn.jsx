import React, {useRef} from 'react';
import SignInForm from './SignInForm';

const SignIn = () => {
    const loginInfo = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(loginInfo.current.getLoginData());
    }

    return ( 
        <>
        <h1>Sign In!</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
            <SignInForm ref={loginInfo} />
            <button type='submit'>Log In</button>
        </form>
        </>
    );
}
 
export default SignIn;