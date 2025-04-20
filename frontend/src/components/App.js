import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./Homepage";
import Header from "./header";
import About from "./about";
import Explore from "./explore";
import Signin from "./signin";
import BookManagement from "./bookmange";
import Addbook from "./addbook";


import "/static/css/index.css"





const App = () => {
  return (
    <BrowserRouter>

    <Header />
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/explore" element={<Explore />} />
    <Route path="/signin" element={<Signin />} />
    <Route path="/bookmange" element={<BookManagement />} />
    <Route path="/addbook" element={<Addbook />} />
    </Routes>
    </BrowserRouter>
  );
};

export default App;
