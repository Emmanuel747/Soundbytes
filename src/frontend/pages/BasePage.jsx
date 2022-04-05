import { Outlet } from "react-router";
import { Navbar } from "../components";
import useProtectedRoute from "../hooks/useProtectedRoute";
import { UserContext } from "../hooks/UserContext";
import { useContext } from "react";

export default function BasePage() {
    useProtectedRoute();

    const { currentUsername } = useContext(UserContext);

    return currentUsername ? (
        <>
            <Navbar />
            <div>
                <Outlet />
            </div>
        </>
    ) : (
        <p>Username not loaded</p>
    );
}
