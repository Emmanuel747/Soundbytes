import { useEffect, useContext } from "react";
import { UserContext } from "./hooks/UserContext";
import {
    BasePage,
    AuthPage,
    FeedPage,
    RecordingPage,
    ProfilePage,
    ErrorPage,
} from "./pages";
import { onAuthStateChanged } from "@firebase/auth";
import { FireAuth } from "../backend";
import { Routes, Route } from "react-router-dom";

import "./styles.css";

export default function App() {
    const { currentUID, currentUsername, setCurrentUID, setCurrentUsername } =
        useContext(UserContext);

    useEffect(() => {
        const unsub = onAuthStateChanged(FireAuth, function (user) {
            console.log("Auth user:", user);
            if (user) {
                setCurrentUID(user.uid);
                setCurrentUsername(user.displayName);
            } else {
                setCurrentUID("");
                setCurrentUsername("");
            }
        });

        console.log(
            "Refreshing useEffect. Auth status:",
            currentUID,
            currentUsername
        );

        return unsub;
    }, []);
    return (
        <Routes>
            <Route path='/auth' element={<AuthPage />} />
            <Route element={<BasePage />}>
                <Route path='/feed' element={<FeedPage />} />
                <Route path='/recording' element={<RecordingPage />} />
                <Route path='/profile'>
                    <Route index element={<ProfilePage />} />
                    <Route path=':username' element={<ProfilePage />} />
                </Route>
                <Route index element={<FeedPage />} />
            </Route>
            <Route path='*' element={<ErrorPage />} />
        </Routes>
    );
}
