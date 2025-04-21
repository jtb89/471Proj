import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./Homepage";
import Header from "./header";
import About from "./about";
import Explore from "./explore";
import Signin from "./signin";
import BookManagement from "./bookmange";
import Addbook from "./addbook";
import DisplayName from "./displayname";
import Order from "./orderbook";
import Makeaccount from "./makeaccount";

import { AuthProvider } from "./authcontext";


import "/static/css/index.css"





const App = () => {
  return (
    <AuthProvider>
    <BrowserRouter>

    <Header />
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/explore" element={<Explore />} />
    <Route path="/signin" element={<Signin />} />
    <Route path="/bookmange" element={<BookManagement />} />
    <Route path="/addbook" element={<Addbook />} />
    <Route path="/displayname" element={<DisplayName />} />
    <Route path="/order" element={<Order />} />
    <Route path="/makeaccount" element={<Makeaccount />} />


    </Routes>
    </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
