import { useState, createContext } from "react";

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
