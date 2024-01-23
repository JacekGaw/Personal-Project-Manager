import React, {useRef, useState, useContext} from 'react';
import Button from '../../components/UI/Button';
import { AuthContext } from '../../store/auth-context';
import { useNavigate } from 'react-router-dom';

const ChangePasswordForm = () => {
    const navigate = useNavigate();
    const [errorMessage,setErrorMessage] = useState();
    const {user, logout, updateUsersPassword} = useContext(AuthContext);
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const newPasswordRef = useRef();
    const newRepeatedPasswordRef = useRef();

    const handleChangePassword = async (e) => {
        setErrorMessage();
        e.preventDefault();
        if(newPasswordRef.current.value !== '' || newRepeatedPasswordRef.current.value !== ''){
            if(newPasswordRef.current.value === newRepeatedPasswordRef.current.value){
                try {
                    await updateUsersPassword(newPasswordRef.current.value);
                    await logout();
                    navigate("/signin", {replate: true});
                } catch (e) {
                    setErrorMessage(e.message);
                }
            } 
            else setErrorMessage("Passwords do not match");
        }
        else setErrorMessage("New Password cannot be empty");
    }

    return (
        <section className="mx-auto max-w-[600px]  p-5 my-2 bg-white rounded-xl">
      <header>
        <h3 className="px-2 pb-2 text-center font-[400] text-slate-700 text-lg">
          Change Password:
        </h3>
      </header>
      {errorMessage && <p className="mx-10 my-2 text-red-600 text-center text-lg border-2 border-red-600 font-[800]">{errorMessage} <button className="text-black font-[900]" onClick={() => {setErrorMessage()}}>x</button></p>}
      <form onSubmit={handleChangePassword} className="flex flex-col gap-2 justify-center items-center">
        <div>
        <label htmlFor="new-user-name" className='font-[600] text-slate-700 text-sm mr-2'>
          New Password:
        </label>
        <input id="new-user-name" type="password" ref={newPasswordRef} className="mr-2 bg-slate-100 border text-sm border-lightjeans rounded-md p-1"></input>
        </div>
        <div>
        <label htmlFor="new-user-name" className='font-[600] text-slate-700 text-sm mr-2'>
          Repeat New Password:
        </label>
        <input id="new-user-name" type="password" ref={newRepeatedPasswordRef} className="mr-2 bg-slate-100 border text-sm border-lightjeans rounded-md p-1"></input>
        </div>
        <Button
          disabled={buttonDisabled}
          type="submit"
          className={`disabled:bg-cream text-sm py-1 px-2`}
        >
          Update
        </Button>
      </form>
    </section>
    )
}

export default ChangePasswordForm;