import { useEffect, useState, createContext } from "react";
import { onAuthStateChanged } from "@firebase/auth";
import { FireAuth } from "../../backend";

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [currentUID, setCurrentUID] = useState("");
    const [currentUsername, setCurrentUsername] = useState("");

    useEffect(() => {
        const unsub = onAuthStateChanged(FireAuth, function (user) {
            if (user) {
                console.log("uid:", user.uid, "username:", user.displayName);
                setCurrentUID(user.uid);
                setCurrentUsername(user.displayName);
            } else {
                setCurrentUID("");
                setCurrentUsername("");
            }
        });

        return unsub;
    }, []);

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
