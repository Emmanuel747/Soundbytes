import { useEffect } from "react";

import { 
  Routes, 
  Route, 
  Link, 
  Navigate,
  useNavigate, 
  Outlet } from "react-router-dom";
import { onAuthStateChanged } from "@firebase/auth";

import { FireAuth } from "../../backend";

export default function useProtectedRoute() {
  const navigate = useNavigate();

  useEffect(() => {
    const ProtectedRoute = ({
      isAuth,
      redirectPath = '/auth',
      children,
    }) => {
      if (!isAuth) {
        return <Navigate to={redirectPath} replace /> ;
      }
      return children ? children : <Outlet />;
    };
      return ProtectedRoute;
  }, [navigate]);
}
