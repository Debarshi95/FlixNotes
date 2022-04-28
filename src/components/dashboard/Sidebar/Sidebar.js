import { memo } from 'react';
import { FaArchive, FaTrash, FaHome, FaSignOutAlt } from 'react-icons/fa';
import cn from 'classnames';
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
];

const Sidebar = () => {
  const { showDrawer, toggleDrawer } = useSideDrawer();

  return (
    <div
      className={cn('Sidebar__root', {
        'Sidebar--slidein': showDrawer,
      })}
    >
      <nav className="d-flex flex-col content-between h-full">
        <div>
          {linksProps.map((linkObj) => (
            <NavLink to={linkObj.path} key={linkObj.path}>
              <div role="button" aria-hidden className="Sidebar__link" onClick={toggleDrawer}>
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
  );
};

export default memo(Sidebar);
