import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import { Route, Routes } from "react-router-dom";
import AuthContextProvider from "./store/auth-context";

function App() {
  return (
    <>
      <AuthContextProvider>
        <Routes>
          {/* <Route path='/' element={} /> */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </AuthContextProvider>
    </>
  );
}

export default App;
