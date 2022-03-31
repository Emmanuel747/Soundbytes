import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter } from "react-router-dom";

import App from "./frontend/App";
import { UserProvider } from "./frontend/hooks/UserContext";

ReactDOM.render(
    <React.StrictMode>
        <UserProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </UserProvider>
    </React.StrictMode>,
    document.getElementById("root")
);
