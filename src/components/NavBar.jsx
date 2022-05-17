import { useContext } from "react";
import { NavLink } from "react-router-dom" 
import { authContext } from "./AuthProvider";
import Logout from "./Logout";

const NavBar = () => {
  const { user } = useContext(authContext);

  return (
    <>
      <nav className="nav">
        <NavLink className="nav-link" to='/'>Chirps</NavLink>
        { user.username ?
          <Logout/>
          :
          <NavLink className="nav-link" to='/login'>Login</NavLink>
        }
      </nav>
    </>
  )

}

export default NavBar;