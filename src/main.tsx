import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { SpinnerProvider } from "./context/spinner-context.tsx";
import { UserProvider } from "./context/user-context.tsx";
import "./index.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <UserProvider>
            <SpinnerProvider>
                <App />
            </SpinnerProvider>
        </UserProvider>
    </React.StrictMode>
);
