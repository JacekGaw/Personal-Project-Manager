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
            <div className='flex flex-col mb-2'>
            <label htmlFor="email" className='text-sm text-slate-500'>E-mail:</label>
            <input type="mail" id="email" ref={emailRef} className='shadow-sm border border-lightjeans hover:border-darkjeans transition-all duration-200 rounded-md p-2 text-sm text-darkjeans' required/>
            </div>
            <div className='flex flex-col mb-2'>
            <label htmlFor="password" className='text-sm text-slate-500'>Password:</label>
            <input type="password" id="password" className='shadow-sm border border-lightjeans hover:border-darkjeans transition-all duration-200  rounded-md p-2 text-sm text-darkjeans' ref={passwordRef} required />
            </div>
        </>
    )
    
});
 
export default SignInForm;