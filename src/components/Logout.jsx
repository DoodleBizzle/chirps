import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { authContext } from "./AuthProvider";

const Logout = () => {
  const {setUser, setToken} = useContext(authContext)

  const handleClick = () => {
    setUser({})
    setToken('')
    localStorage.clear('token')

  }

  return <>
    <NavLink className="nav-link" onClick={handleClick} to='/'>Logout</NavLink>
  </>
}

export default Logout;