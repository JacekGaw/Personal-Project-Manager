import { useRef, useContext, useState } from "react";
import SignInForm from "./SignInForm";
import { AuthContext } from "../../store/auth-context";
import { useNavigate } from "react-router-dom";
import Button from "../../components/UI/Button";
import { Link } from "react-router-dom";

const SignIn = () => {
  const { user, signIn } = useContext(AuthContext);
  const loginInfo = useRef();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const signInData = loginInfo.current.getLoginData();
    try {
        setLoading(true);
        setErrorMessage();
      await signIn(signInData.email, signInData.password);
      navigate("/dashboard");
    } catch (e) {
      console.log(e.message);
      setErrorMessage("Nieprawidłowe dane logowania! Spróbuj jeszcze raz!");
    }
    loginInfo.current.clearInputs();
    setLoading(false);
  };

  return (
    <section className=" w-full min-h-screen flex flex-col justify-center items-center p-5">
      <Link to={'/'} className="flex justify-center items-center font-[300] text-slate-400 mb-5 gap-2 hover:gap-4 transition-all duration-200">
        <p className="flex justify-center items-center text-sm material-symbols-outlined">arrow_back</p>
        <p className="text-sm ">Back to homepage</p>
      </Link>
      <header className="text-center mb-5">
        <h1 className="text-5xl text-jeans font-bold">Log <span className="text-vibrantgold">In!</span></h1>
      </header>
      <form onSubmit={(e) => handleSubmit(e)} className="w-full flex flex-col items-center">
        <SignInForm ref={loginInfo} />
        <p className="text-red-700 text-sm text-center font-[300]">{errorMessage}</p>
        <Button type="submit" className="p-3 mt-5 disabled:bg-lightjeans" disabled={loading}>Log In</Button>
      </form>
      <p className="p-2 border-t border-slate-400 mt-5 text-sm font-[300] text-slate-700">Don't have account yet? <Link to={'/signup'} className="font-[600] underline hover:text-vibrantgold decoration-solid	">Sign Up!</Link></p>
    </section>
  );
};

export default SignIn;
