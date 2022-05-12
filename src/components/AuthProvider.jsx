import { useState, createContext, useEffect } from "react";

export const authContext = createContext();

const AuthProvider = ({children}) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState({})

  const contextValue = {
    token,
    setToken,
    user,
    setUser
  }

  return <>
    <authContext.Provider value={contextValue}>
      {children}
    </authContext.Provider>
  </>
}

export default AuthProvider;