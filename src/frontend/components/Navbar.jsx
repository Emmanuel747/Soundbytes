import { React, useContext, useEffect } from "react";
import { UserContext } from "../hooks/UserContext";
import { NavLink, useNavigate } from "react-router-dom";
import { Authenticator } from "../../backend";
import { GoSignOut } from 'react-icons/go';
import '../Styles/NavBar.scss';


export default function Navbar() {
  const { currentUsername } = useContext(UserContext);
  const navigate = useNavigate();

  const signOut = () => {
      new Authenticator().signOut();
      navigate("/auth");
  };

  return (
    <div className="header text-white" style={{backgroundColor: '#222'}}>
      <p
        className="emanTitle"
        style={{fontWeight: 'bold', textAlign: 'center', padding: '10px'}}
      > Welcome to SoundBytes🎙{currentUsername !== undefined ? `, ${currentUsername}` : ''} </p>
      <div
        style={{
          display: 'flex',
          textAlign: 'center',
          justifyContent: 'space-evenly',
          padding: '7px',
          color: 'teal',
          backgroundColor: 'lightGrey',
          fontSize: '18px'
        }}
      >
        <NavLink 
          to="/feed"
          className={({ isActive }) => (isActive ? 'active' : 'inactive')}
        > Home </NavLink>

        <NavLink 
          to="/recording"
          className={({ isActive }) => (isActive ? 'active' : 'inactive')}
        > Create Byte </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) => (isActive ? 'active' : 'inactive')}
        > Profiles </NavLink>
          
        <NavLink 
          to="/auth"
          className={({ isActive }) => (isActive ? 'active' : 'inactive')}
          style={({ isActive }) => ({ 
            color: isActive ? "green" : "#008080",
          })}
          onClick={signOut}
        > <GoSignOut size={30} color="rgb(212, 33, 78)" /> </NavLink>
      </div>
    </div>

  );
}

