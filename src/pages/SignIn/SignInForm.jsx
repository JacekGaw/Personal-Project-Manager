import {forwardRef, useImperativeHandle, useRef} from 'react';

const SignInForm = forwardRef(function SignInForm(props, ref) {
    const emailRef = useRef();
    const passwordRef = useRef();

    useImperativeHandle(ref, () => {
        return {
            getLoginData(){
                return {email: emailRef.current.value, password: passwordRef.current.value};
            }
        }
    }, []);

    return (
        <>
            <div>
            <label htmlFor="email">E-mail:</label>
            <input type="mail" id="email" ref={emailRef} required/>
            </div>
            <div>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" ref={passwordRef} required />
            </div>
        </>
    )
    
});
 
export default SignInForm;