import {React, useContext} from "react";
import { UserContext } from "../hooks/UserContext";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
  useNavigate,
} from "react-router-dom";


export default function Navbar({userData, setUserData, isAuth, setIsAuth}) {
  const { currentUID, setCurrentUID, currentUsername, setCurrentUsername } = 
  useContext(UserContext);
  const navigate = useNavigate();

  const devLogout = () => {
    setUserData({});
    navigate('/feed')
  }

  return (
    <div
      style={{
        backgroundColor: 'black',
        color: 'White',
      }}
    >
      <p
        style={{fontWeight: 'bold', textAlign: 'center', padding: '10px'}}
      >Welcome to SoundBytes{userData.username !== undefined ? `, ${userData.username}` : ''}</p>
      <div
        style={{
          fontWeight: 'bold', 
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'space-evenly',
          padding: '10px',
          color: 'teal',
          backgroundColor: 'lightGrey',
        }}
      >
        <NavLink 
          to="/feed"
          // style={isActive => ({
          //   color: isActive ? "green" : "blue"
          // })}
          className={isActive =>
            "nav-link" + (!isActive ? " unselected" : "")
          }
        > Home </NavLink>
        <NavLink 
          to="/recording"
          // style={isActive => ({
          //   color: isActive ? "green" : "blue",
          //   fontWeight: isActive ? "bold" : "normal"
          // })}
          className={isActive =>
            "nav-link" + (!isActive ? " unselected" : "")
          }
        > Create Byte </NavLink>

        <NavLink
          to="/profile"
          className={isActive =>
            "nav-link" + (!isActive ? " unselected" : "")
          }
        > Profiles </NavLink>
        {isAuth ?        
          <a
            href="/auth"
            onClick={devLogout}
            style={{color: 'red'}}
          >
            Sign Out
          </a> :
          <NavLink 
            to="/auth"
            className={isActive =>
              "nav-link" + (!isActive ? " unselected" : "")
            }
          > Login/Sign up </NavLink>
        }
      </div>
    </div>

  );
}
