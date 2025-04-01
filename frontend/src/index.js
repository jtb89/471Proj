import React from "react";
import { createRoot } from "react-dom/client"; 
import App from "./components/App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement); // Create the root
root.render(<App />); // Render the App
