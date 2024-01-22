import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import Account from "./pages/Account/account";
import Home from "./pages/Home/Home";
import { Route, Routes } from "react-router-dom";
import AuthContextProvider from "./store/auth-context";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <AuthContextProvider>
      <main>
        <Routes>

            
          {/* <Route path="*" element={}/> */}
          <Route path="/" element={<Home />}/>
          {/* <Route path='/' element={} /> */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
        </Routes>
        </main>
      </AuthContextProvider>
    </>
  );
}

export default App;
