import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../lib/store";
import { Navigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
  admin?: boolean;
};
const ProtectedRoute = ({ children, admin }: Props) => {
  const { auth, isAdmin } = useSelector(
    (state: RootState) => state.userReducer
  );
  if (!admin && auth) return <>{children}</>;
  if (admin && isAdmin && auth) return <>{children}</>;
  return <Navigate to={"/login"} />;
};

export default ProtectedRoute;
