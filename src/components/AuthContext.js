// AuthContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);

  const login = (id) => {
    setUserId(id);
  };

 const logout = () => {
    setUserId(null);
  };

  return (
    <AuthContext.Provider value={{ userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
 export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
      console.log('useAuth must be used within an AuthProvider');
    }
    return context;
  };
  