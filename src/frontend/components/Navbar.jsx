import { React, useContext } from "react";
import { UserContext } from "../hooks/UserContext";
import { NavLink, useNavigate } from "react-router-dom";

import { Authenticator } from "../../backend";

export default function Navbar() {
    const { currentUsername } = useContext(UserContext);
    const navigate = useNavigate();

    return (
        <div
        // style={{
        //     backgroundColor: "black",
        //     color: "White",
        // }}
        >
            <p
            // style={{
            //     fontWeight: "bold",
            //     textAlign: "center",
            //     padding: "10px",
            // }}
            >
                Welcome to SoundBytes, {currentUsername}
            </p>
            <div
            // style={{
            //     fontWeight: "bold",
            //     textAlign: "center",
            //     display: "flex",
            //     justifyContent: "space-evenly",
            //     padding: "10px",
            //     color: "teal",
            //     backgroundColor: "lightGrey",
            // }}
            >
                <NavLink
                    to='/feed'
                    // style={isActive => ({
                    //   color: isActive ? "green" : "blue"
                    // })}
                    // className={(isActive) =>
                    //     "nav-link" + (!isActive ? " unselected" : "")
                    // }
                >
                    Home
                </NavLink>
                <NavLink
                    to='/recording'
                    // style={isActive => ({
                    //   color: isActive ? "green" : "blue",
                    //   fontWeight: isActive ? "bold" : "normal"
                    // })}
                    // className={(isActive) =>
                    //     "nav-link" + (!isActive ? " unselected" : "")
                    // }
                >
                    Create Byte
                </NavLink>

                <NavLink
                    to='/profile'
                    // className={(isActive) =>
                    //     "nav-link" + (!isActive ? " unselected" : "")
                    // }
                >
                    Profiles
                </NavLink>
                <NavLink
                    to='/auth'
                    // className={(isActive) =>
                    //     "nav-link" + (!isActive ? " unselected" : "")
                    // }
                    onClick={new Authenticator().signOut}>
                    Sign Out
                </NavLink>
            </div>
        </div>
    );
}
