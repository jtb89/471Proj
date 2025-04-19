// import React from "react";
// import { createRoot } from "react-dom/client"; 
// import App from "./components/App";



// const appDiv = document.getElementById("app");
// console.log("JavaScript bundle loaded!");

// if (appDiv) {
//     const root = createRoot(appDiv);  
//     // In your src/index.js, before the React rendering code
//     root.render(<App />);
// } else {
//     console.error("Element with id 'app' not found");
// }


import React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App";

const root = createRoot(document.getElementById("app"));
root.render(<App />);
