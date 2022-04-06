import { FaArchive, FaTrash, FaHome, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import { MdLabel } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import Button from 'components/common/Button/Button';
import Typography from 'components/common/Typography/Typography';
import './Sidebar.css';

const Sidebar = () => {
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
    {
      path: '/profile',
      name: 'Profile',
      icon: <FaUserCircle className="Sidebar__icon" />,
    },
  ];

  return (
    <div className="Sidebar__root">
      <nav className="d-flex flex-col content-between h-full">
        <div>
          {linksProps.map((linkObj) => (
            <NavLink to={linkObj.path}>
              <div className="Sidebar__link">
                {linkObj.icon}
                <p className="ml-2">{linkObj.name}</p>
              </div>
            </NavLink>
          ))}
        </div>
        <Button component="div" className="mb-4">
          <Typography variant="h6" className="d-flex content-evenly items-center">
            <span className="d-block">Debarshi</span>
            <FaSignOutAlt className="mx-1" />
          </Typography>
        </Button>
      </nav>
    </div>
  );
};

export default Sidebar;
