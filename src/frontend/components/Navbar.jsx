import { useContext, useEffect } from "react";
import { UserContext } from "../hooks/UserContext";
import { NavLink, useNavigate } from "react-router-dom";

import { Authenticator } from "../../backend";

export default function Navbar() {
    const { currentUsername } = useContext(UserContext);
    const navigate = useNavigate();

    const signOut = () => {
        new Authenticator().signOut();
        navigate("/auth");
    };

    return (
        <div>
            <p>Welcome to SoundBytes, {currentUsername}</p>
            <div>
                <NavLink to='/feed'>Home</NavLink>
                <NavLink to='/recording'>Create Byte</NavLink>
                <NavLink to='/profile'>Profiles</NavLink>
                <NavLink to='/auth' onClick={signOut}>
                    Sign Out
                </NavLink>
            </div>
        </div>
    );
}
