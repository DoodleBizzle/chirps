import { NavLink } from "react-router-dom" 

const NavBar = () => {

  return (
    <>
      <nav className="nav">
        <NavLink className="nav-link" to='/'>Chirps</NavLink>
        <NavLink className="nav-link" to='/login'>Login</NavLink>
      </nav>
    </>
  )

}

export default NavBar;