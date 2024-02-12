import React, { useContext, useState, useRef } from "react";
import Button from "../../components/UI/Button";
import { AuthContext } from "../../store/auth-context";

const UpdateNameForm = () => {
  const newUserNameRef = useRef();
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const { user, updateDisplayName } = useContext(AuthContext);

  const handleUpdateUserName = async (e) => {
    e.preventDefault();
    setErrorMessage();
    console.log(newUserNameRef.current.value, user.displayName);
    if (newUserNameRef.current.value !== "") {
      if (newUserNameRef.current.value !== user.displayName) {
        try {
          setButtonDisabled(true);
          await updateDisplayName(newUserNameRef.current.value);
        } catch (e) {
          setErrorMessage(e.message);
          console.log(e.message);
        }
        newUserNameRef.current.value = "";
        setButtonDisabled(false);
        location.reload();
      }
      else {
        e.preventDefault();
        setErrorMessage("New user name must be different from the current one!");
      }
      

    } else {
      e.preventDefault();
      setErrorMessage("New user name cannot be empty!");
    }
  };

  return (
    <section className=" sm:mx-auto  sm:max-w-[600px]  p-5 my-2 bg-white rounded-xl">
      <header>
        <h3 className="px-2 pb-2 text-center font-[400] text-slate-700 text-lg">
          Update User Name:
        </h3>
      </header>
      {errorMessage && (
        <p className="mx-10 my-2 text-red-600 text-center text-lg border-2 border-red-600 font-[800]">
          {errorMessage}{" "}
          <button
            className="text-black font-[900]"
            onClick={() => {
              setErrorMessage();
            }}
          >
            x
          </button>
        </p>
      )}

      <form
        onSubmit={handleUpdateUserName}
        className="flex justify-center flex-col sm:flex-row gap-2 "
      >
        <label
          htmlFor="new-user-name"
          className="font-[600] text-slate-700 text-sm mr-2"
        >
          New User Name:
        </label>
        <input
          id="new-user-name"
          type="text"
          ref={newUserNameRef}
          className="mr-2 bg-slate-100 border text-sm border-lightjeans rounded-md p-1"
        ></input>
        <Button
          disabled={buttonDisabled}
          type="submit"
          className={`disabled:bg-cream text-sm py-1 px-2`}
        >
          Update
        </Button>
      </form>
    </section>
  );
};

export default UpdateNameForm;
