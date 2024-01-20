import {forwardRef, useImperativeHandle, useRef, useState} from 'react';

const SignUpForm = forwardRef(function SignUpForm(props, ref) {
    const [error, setError] = useState('');
    const emailRef = useRef();
    const passwordRef = useRef();
    const repeatPasswordRef = useRef();

    useImperativeHandle(ref, () => {
        return {
            getLoginData(){
                if(passwordRef.current.value === repeatPasswordRef.current.value)
                    return {email: emailRef.current.value, password: passwordRef.current.value};
                else 
                    setError("Passwords do not match!");
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
            <label htmlFor="password-repeat">Repeat password:</label>
            <input type="password" id="password-repeat" ref={repeatPasswordRef} required />
            <p>{error}</p>
            </div>
        </>
    )
    
});
 
export default SignUpForm;