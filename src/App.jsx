import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import Account from "./pages/Account/account";
import DashboardRoutes from "./pages/Dashboard/DashboardRoutes";
import Home from "./pages/Home/Home";
import { Route, Routes } from "react-router-dom";
import AuthContextProvider from "./store/auth-context";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <AuthContextProvider>
        <main className=" w-full bg-slate-100">
          <Routes>
            {/* <Route path="*" element={}/> */}
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route exact
              path="/dashboard/*"
              element={
                <ProtectedRoute>
                  <DashboardRoutes />
                </ProtectedRoute>
              }
            ></Route>
          </Routes>
        </main>
      </AuthContextProvider>
    </>
  );
}

export default App;
