import { Navbar } from 'components';
import './Wrapper.css';

const Wrapper = ({ children, hasNavbar }) => {
  return (
    <main className="Wrapper__root">
      {hasNavbar && <Navbar />}
      <div className="Wrapper__container">{children}</div>
    </main>
  );
};

Wrapper.defaultProps = {
  hasNavbar: true,
};
export default Wrapper;
