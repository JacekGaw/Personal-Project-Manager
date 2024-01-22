import { useRef, useContext, useState } from "react";
import SignUpForm from "./SignUpForm";
import { AuthContext } from "../../store/auth-context";
import { useNavigate } from "react-router-dom";
import Button from "../../components/UI/Button"

const SignUp = () => {
  const { user, signUp } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const loginInfo = useRef();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const signUpData = loginInfo.current.getLoginData();
    try {
        setLoading(true)
      await signUp(signUpData.email, signUpData.password);
      navigate("/signin");
    } catch (e) {
      console.log(e.message);
    }
    setLoading(false);
    loginInfo.current.clearInputs();
  };

  return (
    <section className=" w-full min-h-screen flex flex-col justify-center items-center p-5">
      <header className="text-center mb-5">
        <h1 className="text-5xl text-jeans font-bold">Sign <span className="text-vibrantgold">Up!</span></h1>
      </header>
      <form onSubmit={(e) => handleSubmit(e)} className="w-full flex flex-col items-center">
        <SignUpForm ref={loginInfo} />
        <Button type="submit" className=" p-3 mt-5 disabled:bg-cream" disabled={loading}>Sign Up</Button>
      </form>
    </section>
  );
};

export default SignUp;
