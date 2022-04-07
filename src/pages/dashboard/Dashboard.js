import { Navbar, NotePad, Sidebar } from 'components';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <section className="Dashboard__root">
        <div className="d-flex">
          <Sidebar />
          <div className="Dashboard__itemContainer">
            <NotePad />
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
