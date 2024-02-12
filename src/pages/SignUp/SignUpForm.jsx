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
            },
            clearInputs() {
                emailRef.current.value = '';
                passwordRef.current.value = '';
                repeatPasswordRef.current.value = '';
            }
        }
    }, []);

    return (
        <>
            <div className='flex flex-col mb-2'>
            <label htmlFor="email" className='text-sm text-slate-500'>E-mail:</label>
            <input type="mail" id="email" ref={emailRef} className='shadow-sm border border-lightjeans hover:border-darkjeans transition-all duration-200 rounded-md p-2 text-sm text-darkjeans' required/>
            </div>
            <div className='flex flex-col mb-2'>
            <label htmlFor="password" className='text-sm text-slate-500'>Password:</label>
            <input type="password" id="password" className='shadow-sm border border-lightjeans hover:border-darkjeans transition-all duration-200  rounded-md p-2 text-sm text-darkjeans' ref={passwordRef} required />
            </div>
            <div className='flex flex-col mb-2'>
            <label htmlFor="password-repeat" className='text-sm text-slate-500'>Repeat password:</label>
            <input type="password" id="password-repeat" className='shadow-sm border hover:border-darkjeans transition-all duration-200 border-lightjeans rounded-md p-2 text-sm text-darkjeans' ref={repeatPasswordRef} required />
            </div>
            <p className="text-red-700 text-sm text-center font-[300]">{error}</p>

        </>
    )
    
});
 
export default SignUpForm;