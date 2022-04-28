import { useCallback } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdOutlineClear } from 'react-icons/md';
import { useAuth } from 'providers/AuthProvider/AuthProvider';
import { useSideDrawer } from 'providers/SideDrawerProvider/SideDrawerProvider';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const { user } = useAuth();
  const { showDrawer, toggleDrawer } = useSideDrawer();

  const renderMenuIcon = useCallback(
    () => (
      <div className="Navbar__menuContainer">
        {showDrawer ? (
          <MdOutlineClear className="Navbar__menu" onClick={toggleDrawer} />
        ) : (
          <GiHamburgerMenu className="Navbar__menu" onClick={toggleDrawer} />
        )}
      </div>
    ),
    [showDrawer, toggleDrawer]
  );

  return (
    <div className="Navbar__root">
      <nav className="d-flex content-between mx-auto items-center">
        {renderMenuIcon()}
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
