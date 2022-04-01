import { Outlet } from "react-router";
import { Navbar } from "../components";
import useProtectedRoute from "../hooks/useProtectedRoute";

export default function BasePage() {
    useProtectedRoute();

    return (
        <>
            <Navbar />
            <div>
                <Outlet />
            </div>
        </>
    );
}
