import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
} from "react-router-dom";


export default function Navbar() {
  return (
    <div
      style={{
        backgroundColor: 'black',
        color: 'White',

      }}
    >
      <p
        style={{fontWeight: 'bold', textAlign: 'center', padding: '10px'}}
      >Welcome to SoundBytes</p>
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
          to="/auth"
          className={isActive =>
            "nav-link" + (!isActive ? " unselected" : "")
          }
        > Login/Sign up </NavLink>

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
      </div>
    </div>

  );
}
>>>>>>> 96054f9b2dc2c39114f7117c785951d2eaf25a9c
