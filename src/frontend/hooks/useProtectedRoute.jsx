import { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "@firebase/auth";

import { FireAuth } from "../../backend";

export default function useProtectedRoute() {
    const navigate = useNavigate();

    useEffect(() => {
        const unsub = onAuthStateChanged(FireAuth, function (user) {
            if (!user) {
                navigate("/auth");
            }
        });

        return unsub;
    }, [navigate]);
}
