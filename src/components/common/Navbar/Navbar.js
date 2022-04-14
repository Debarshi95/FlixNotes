import { useAuth } from 'providers/AuthProvider/AuthProvider';
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const { user } = useAuth();

  return (
    <div className="Navbar__root">
      <nav className="d-flex content-between max-w-85 mx-auto items-center">
        <NavLink to="/" className="Navlink--primary text-14 text-bold">
          FlixNote
        </NavLink>
        <div className="d-flex content-between items-center">
          {!user ? (
            <>
              <NavLink to="/signin" className="Typography--uppercase navlink text-bold">
                Signin
              </NavLink>
              <NavLink
                to="/signup"
                className="Typography--uppercase navlink navlink--primary-contained text-bold"
              >
                Signup
              </NavLink>
            </>
          ) : (
            <NavLink
              to="/dashboard"
              className="Typography--uppercase navlink navlink--primary-contained text-bold"
            >
              Dashboard
            </NavLink>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
