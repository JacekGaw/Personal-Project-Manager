import {useRef, useContext} from 'react';
import SignUpForm from './SignUpForm';
import { AuthContext } from '../../store/auth-context';
import { useNavigate } from "react-router-dom";


const SignUp = () => {
    const {user, signUp} = useContext(AuthContext);
    const loginInfo = useRef();
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        const signUpData = loginInfo.current.getLoginData();
        try {
            await signUp(signUpData.email, signUpData.password);
            navigate("/signin");
        } catch (e) {
            console.log(e.message);
        }
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