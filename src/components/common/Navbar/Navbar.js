import { GiHamburgerMenu } from 'react-icons/gi';
import { MdOutlineClear } from 'react-icons/md';
import { useMediaQuery } from 'react-responsive';
import { useAuth } from 'providers/AuthProvider/AuthProvider';
import { useSideDrawer } from 'providers/SideDrawerProvider/SideDrawerProvider';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const { user } = useAuth();
  const { showDrawer, toggleDrawer } = useSideDrawer();
  const xs = useMediaQuery({ maxWidth: '600px' });

  const renderMenuIcon = () =>
    showDrawer ? (
      <MdOutlineClear className="Navbar__menu" onClick={toggleDrawer} />
    ) : (
      <GiHamburgerMenu className="Navbar__menu" onClick={toggleDrawer} />
    );

  return (
    <div className="Navbar__root">
      <nav className="d-flex content-between max-w-85 mx-auto items-center">
        {xs ? (
          renderMenuIcon()
        ) : (
          <NavLink to="/" className="Navlink--primary text-14 text-bold">
            FlixNote
          </NavLink>
        )}
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
