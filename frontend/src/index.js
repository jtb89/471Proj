import React from "react";
import { createRoot } from "react-dom/client"; 
import App from "./components/App";
import Homepage from "./components/Homepage";

const appDiv = document.getElementById("app");

if (appDiv) {
    const root = createRoot(appDiv);  
    root.render(<App />);
} else {
    console.error("Element with id 'app' not found");
}
