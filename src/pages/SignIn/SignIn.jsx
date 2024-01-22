import { useRef, useContext, useState } from "react";
import SignInForm from "./SignInForm";
import { AuthContext } from "../../store/auth-context";
import { useNavigate } from "react-router-dom";
import Button from "../../components/UI/Button";

const SignIn = () => {
  const { user, signIn } = useContext(AuthContext);
  const loginInfo = useRef();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const signInData = loginInfo.current.getLoginData();
    try {
        setLoading(true);
      await signIn(signInData.email, signInData.password);
      navigate("/dashboard");
    } catch (e) {
      console.log(e.message);
    }
    loginInfo.current.clearInputs();
    setLoading(false);
  };

  return (
    <section className=" w-full min-h-screen flex flex-col justify-center items-center p-5">
      <header className="text-center mb-5">
        <h1 className="text-5xl text-jeans font-bold">Log <span className="text-vibrantgold">In!</span></h1>
      </header>
      <form onSubmit={(e) => handleSubmit(e)} className="w-full flex flex-col items-center">
        <SignInForm ref={loginInfo} />
        <Button type="submit" className="p-3 mt-5 disabled:bg-lightjeans" disabled={loading}>Log In</Button>
      </form>
    </section>
  );
};

export default SignIn;
