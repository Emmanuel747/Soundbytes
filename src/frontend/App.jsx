import { useContext, useState } from "react";
import {
  BasePage,
  AuthPage,
  FeedPage,
  RecordingPage,
  ProfilePage,
  ErrorPage,
} from "./pages";
import { 
  Routes, 
  Route, 
  Link, 
  Navigate, 
  Outlet } from "react-router-dom";

import useProtectedRoute from "../frontend/hooks/useProtectedRoute"
import { Navbar } from "../frontend/components";
import "./styles.css";


export default function App() {
  const [userData, setUserData] = useState({});
  const [isAuth, setIsAuth] = useState(false);
  const ProtectedRoute = ({
    isAuth,
    redirectPath = '/auth',
    children,
  }) => {
    if (!isAuth) 
      return <Navigate to={redirectPath} replace />; 
    return children ? children : <Outlet />;
  };

  return (
    <>
      {isAuth ?       
        <Navbar 
          userData={userData}
          isAuth={isAuth} setIsAuth={setIsAuth}
        /> : ""
      }
      <Routes>
        <Route path='/auth' element={
          <AuthPage
            userData={userData} setUserData={setUserData}
            isAuth={isAuth} setIsAuth={setIsAuth}
          />}
        />
        {/* Place any route that is restricted to registered users in here ~Eman April 1, 2022 */}
        <Route element={<ProtectedRoute isAuth={isAuth} />}>
          <Route path='/feed' element={<FeedPage />} />
          <Route path='/recording' element={<RecordingPage />} />
          <Route path='/profile'>
            <Route index element={<ProfilePage />} />
            <Route path=':username' element={<ProfilePage />} />
          </Route>
          <Route path='/' element={<FeedPage />} />
        </Route> 
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </>
  );
}
