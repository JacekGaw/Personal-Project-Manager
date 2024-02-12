import { useRef, useContext, useState } from "react";
import SignUpForm from "./SignUpForm";
import { AuthContext } from "../../store/auth-context";
import { useNavigate } from "react-router-dom";
import Button from "../../components/UI/Button";
import { Link } from "react-router-dom";

const SignUp = () => {
  const { user, signUp, registerUserInDatabase } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const loginInfo = useRef();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const signUpData = loginInfo.current.getLoginData();
    try {
      setLoading(true);
      setErrorMessage();
      await signUp(signUpData.email, signUpData.password);
      await navigate("/signin");
    } catch (e) {
      console.log(e.message);
      setErrorMessage("Error! Try again!");
    }
    setLoading(false);
    loginInfo.current.clearInputs();
  };

  return (
    <section className=" w-full min-h-screen flex flex-col justify-center items-center p-5">
      <Link to={'/'} className="flex justify-center font-[300] items-center text-slate-400 mb-5 gap-2 hover:gap-4 transition-all duration-200">
        <p className="flex justify-center items-center text-sm material-symbols-outlined">arrow_back</p>
        <p className="text-sm ">Back to homepage</p>
      </Link>
      <header className="text-center mb-5">
        <h1 className="text-5xl text-jeans font-bold">
          Sign <span className="text-vibrantgold">Up!</span>
        </h1>
      </header>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="w-full flex flex-col items-center"
      >
        <SignUpForm ref={loginInfo} />
        <p className="text-red-700 text-sm text-center font-[300]">
          {errorMessage}
        </p>
        <Button
          type="submit"
          className=" p-3 mt-5 disabled:bg-cream"
          disabled={loading}
        >
          Sign Up
        </Button>
        <p className="p-2 border-t border-slate-400 mt-5 text-sm font-[300] text-slate-700">
          Allready have an account?{" "}
          <Link
            to={"/signin"}
            className="font-[600] underline hover:text-vibrantgold decoration-solid	"
          >
            Log In!
          </Link>
        </p>
      </form>
    </section>
  );
};

export default SignUp;
