import React, { useContext, useState } from "react";
import Button from "../../components/UI/Button";
import AccountInfo from "./AccountInfo";
import UpdateNameForm from "./UpdateNameForm";
import ChangePasswordForm from "./ChangePasswordForm";
import { AuthContext } from "../../store/auth-context";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const { logout, deleteCurrUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState();

  const handleLogOut = async () => {
    try {
      await logout();
      navigate("/signin");
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleDeleteUser = async () => {
    try {
      await deleteCurrUser();
      navigate("/signup", { replace: true });
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <section className="w-full p-5">
      <header>
        <h1 className="p-5 text-center font-bold text-3xl">Account Settings</h1>
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
      <AccountInfo />
      <UpdateNameForm />
      <ChangePasswordForm />
      <Button onClick={handleLogOut}>Log out</Button>
      <Button onClick={handleDeleteUser} className={"bg-red-600"}>
        Delete User
      </Button>
    </section>
  );
};

export default Account;
