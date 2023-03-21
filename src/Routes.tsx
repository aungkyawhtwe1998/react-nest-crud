import { useDispatch } from "react-redux";
import { lazy, useEffect } from "react";
import useAuth from "./lib/hooks/useAuth";
import { isExpired } from "react-jwt";
import { Routes, Route } from "react-router-dom";
import { loggedIn, loggedOut } from "./lib/store/userSlice";
import ProtectedRoute from "./components/utils/ProtectedRoute";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Signup from "./pages/signup";
const Profile = lazy(() => import("./pages/Profile"));
export default () => {
  const dispatch = useDispatch();
  const { handleLogout } = useAuth();

  useEffect(() => {
    if (typeof window !== undefined) {
      let info = localStorage.getItem("inf");
      let token = localStorage.getItem("at");
      if (info && token) {
        if (isExpired(token)) {
          const timeout = setTimeout(() => handleLogout(), 5000);
          if (confirm("Token expired") == true) {
            handleLogout;
          }
          return () => clearTimeout(timeout);
        }
        const user = JSON.parse(info);
        dispatch(
          loggedIn({
            email: user.email,
            company: user.comapny,
            isAdmin: user.isAdmin,
          })
        );
      }
    } else dispatch(loggedOut());
  }, []);

  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/"
          element={<Home />}></Route>
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};
