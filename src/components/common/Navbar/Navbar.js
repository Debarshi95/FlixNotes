import { useAuth } from 'providers';
import { FaSignOutAlt } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { signout } from 'services/firebaseApi';
import { Button, Typography, Searchbar } from 'components';
import './Navbar.css';

const Navbar = () => {
  const { user } = useAuth();

  return (
    <div className="Navbar__root">
      <nav className="mx-auto items-center">
        <NavLink to="/" className="Navlink--primary text-14 text-bold">
          FlixNote
        </NavLink>

        <div className="NavLink__wrapper">
          <Searchbar />
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
              <Button component="div">
                <Typography
                  variant="h6"
                  className="d-flex content-evenly items-center"
                  onClick={signout}
                  size="xs"
                >
                  <span className="mr-1">Signout</span>
                  <FaSignOutAlt />
                </Typography>
              </Button>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
