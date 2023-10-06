import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { GrazProvider } from "graz";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <GrazProvider>
            <App />
        </GrazProvider>
    </React.StrictMode>
);