
import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authInfo, setAuthInfo] = useState(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("auth");
    if (stored) {
      setAuthInfo(JSON.parse(stored));
    }
  }, []);

  const login = ({ identifier, is_employee }) => {
    const data = { identifier, is_employee };
    sessionStorage.setItem("auth", JSON.stringify(data));
    setAuthInfo(data);
  };

  const logout = () => {
    sessionStorage.removeItem("auth");
    setAuthInfo(null);
  };

  return (
    <AuthContext.Provider value={{ authInfo, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
