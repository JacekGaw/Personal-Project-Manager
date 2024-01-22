import {useRef, useContext} from 'react';
import SignInForm from './SignInForm';
import { AuthContext } from '../../store/auth-context';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
    const { user, signIn} = useContext(AuthContext);
    const loginInfo = useRef();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(loginInfo.current.getLoginData());
        const signInData = loginInfo.current.getLoginData();
        try {
            await signIn(signInData.email, signInData.password);
            navigate("/account");
        } catch (e) {
            console.log(e.message);
        }
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