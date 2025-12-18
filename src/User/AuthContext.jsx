import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

function parseStoredUser(){
    const raw = localStorage.getItem("userr");
    if(!raw) return null;
    try{
        return JSON.parse(raw);
    }catch(err){
        return{email: raw};
    }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(
    parseStoredUser()
  );

  const login = (userData, token, userId) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userr", JSON.stringify(userData));
    localStorage.setItem("userId", userId);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userr");
    localStorage.removeItem("userId");
    setUser(null);
  };

  

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
export const useAuth = () => useContext(AuthContext);