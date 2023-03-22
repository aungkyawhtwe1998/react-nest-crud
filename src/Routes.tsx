import { useDispatch } from "react-redux";
import { Suspense, lazy, useEffect } from "react";
import useAuth from "./lib/hooks/useAuth";
import { isExpired } from "react-jwt";
import { Routes, Route } from "react-router-dom";
import { loggedIn, loggedOut } from "./lib/store/userSlice";
import ProtectedRoute from "./components/utils/ProtectedRoute";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import { Snackbar } from "@mui/material";
import useSnackBar from "./lib/hooks/useSnackBar";
import FallbackLoading from "./components/FallBackLoading";
import Dashboard from "./pages/dashboard";
const Settings = lazy(() => import("./pages/dashboard/settings"));
export default () => {
  const dispatch = useDispatch();
  const { handleLogout } = useAuth();
  const { showSnackBar, snackBarText } = useSnackBar();

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
      <Snackbar
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
        open={showSnackBar}
        autoHideDuration={3000}
        message={snackBarText}
      />
      <Suspense fallback={<FallbackLoading />}>
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
            path="/dashboard/*"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Suspense>
    </>
  );
};
