import { NavLink } from "react-router-dom" 

const NavBar = () => {

  return (
    <>
      <nav >
        <NavLink to='/'>Chirps</NavLink>
        <NavLink to='/login'>Login</NavLink>
      </nav>
    </>
  )

}

export default NavBar;