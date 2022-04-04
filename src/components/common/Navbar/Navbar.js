import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const user = {};

  return (
    <div className="Navbar__root">
      <nav className="d-flex content-between max-w-85 mx-auto items-center">
        <NavLink to="/" className="Navlink--primary text-14 text-bold">
          FlixNote
        </NavLink>
        <div className="d-flex w-10 content-between items-center">
          {user?.id ? (
            <>
              <NavLink to="/cart" className="Navbar__IconButton">
                {/* <BsFillCartFill /> */}
              </NavLink>
              <button type="button" className="Navbar__IconButton">
                {/* <FaSignOutAlt /> */}
              </button>
            </>
          ) : (
            <>
              <NavLink to="/signin" className="text-bold">
                Signin
              </NavLink>
              <NavLink to="/signup" className="text-bold">
                Signup
              </NavLink>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
