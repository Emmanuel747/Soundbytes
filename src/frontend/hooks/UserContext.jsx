import { useEffect, useState, createContext } from "react";
import { onAuthStateChanged } from "@firebase/auth";
import { FireAuth } from "../../backend";

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [currentUID, setCurrentUID] = useState("");
    const [currentUsername, setCurrentUsername] = useState("");

    return (
        <UserContext.Provider
            value={{
                currentUID,
                setCurrentUID,
                currentUsername,
                setCurrentUsername,
            }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserProvider, UserContext };
