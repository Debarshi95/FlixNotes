import { Sidebar, Navbar } from 'components';
import './Wrapper.css';

const Wrapper = ({ children, hasnavbar, hassidebar }) => {
  return (
    <main className="Wrapper__root">
      {hasnavbar && <Navbar />}
      <div className="Wrapper__container">
        {hassidebar && <Sidebar />}
        {children}
      </div>
    </main>
  );
};

Wrapper.defaultProps = {
  hasnavbar: true,
  hassidebar: true,
};
export default Wrapper;
