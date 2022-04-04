import { useEffect, useState, createContext } from "react";
import { onAuthStateChanged } from "@firebase/auth";
import { FireAuth } from "../../backend";

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [currentUID, setCurrentUID] = useState("");
    const [currentUsername, setCurrentUsername] = useState("");

    useEffect(() => {
        const unsub = onAuthStateChanged(FireAuth, function (user) {
            if (user) {
                setUser(user);
                setCurrentUID(user.uid);
                setCurrentUsername(user.displayName);
            } else {
                setUser(undefined);
                setCurrentUID("");
                setCurrentUsername("");
            }
        });

        return unsub;
    }, [user]);

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
