import { FaArchive, FaTrash, FaHome, FaSignOutAlt } from 'react-icons/fa';
import { useCallback } from 'react';
import cn from 'classnames';
import { useMediaQuery } from 'react-responsive';
import { MdLabel } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import Button from 'components/common/Button/Button';
import Typography from 'components/common/Typography/Typography';
import { signout } from 'services/firebaseApi';
import { useSideDrawer } from 'providers/SideDrawerProvider/SideDrawerProvider';
import './Sidebar.css';

const linksProps = [
  {
    path: '/',
    name: 'Home',
    icon: <FaHome className="Sidebar__icon" />,
  },
  {
    path: '/labels',
    name: 'Labels',
    icon: <MdLabel className="Sidebar__icon" />,
  },
  {
    path: '/archive',
    name: 'Archive',
    icon: <FaArchive className="Sidebar__icon" />,
  },
  {
    path: '/trash',
    name: 'Trash',
    icon: <FaTrash className="Sidebar__icon" />,
  },
  // {
  //   path: '/profile',
  //   name: 'Profile',
  //   icon: <FaUserCircle className="Sidebar__icon" />,
  // },
];

const Sidebar = () => {
  const { showDrawer, toggleDrawer } = useSideDrawer();
  const xs = useMediaQuery({ maxWidth: '600px' });

  const renderMobileDrawer = useCallback(
    () => (
      <div className="Sidebar__drawer">
        {linksProps.map((linkObj) => (
          <NavLink to={linkObj.path} key={linkObj.path} onClick={toggleDrawer}>
            <div className="d-flex items-center Sidebar__drawer--link">
              {linkObj.icon}
              <p className="ml-2">{linkObj.name}</p>
            </div>
          </NavLink>
        ))}
        <Button component="div" className="my-2 content-start mx-1">
          <Typography variant="h6" className="d-flex items-center" onClick={signout}>
            <FaSignOutAlt className="mx-1" />
            <span className="d-block">Debarshi</span>
          </Typography>
        </Button>
      </div>
    ),
    [toggleDrawer]
  );

  return !xs ? (
    <div className={cn('Sidebar__root')}>
      <nav className="d-flex flex-col content-between h-full">
        <div>
          {linksProps.map((linkObj) => (
            <NavLink to={linkObj.path} key={linkObj.path}>
              <div className="Sidebar__link">
                {linkObj.icon}
                <p className="ml-2">{linkObj.name}</p>
              </div>
            </NavLink>
          ))}
        </div>
        <Button component="div" className="mb-4">
          <Typography variant="h6" className="d-flex content-evenly items-center" onClick={signout}>
            <span className="d-block">Debarshi</span>
            <FaSignOutAlt className="mx-1" />
          </Typography>
        </Button>
      </nav>
    </div>
  ) : (
    showDrawer && renderMobileDrawer()
  );
};

export default Sidebar;
