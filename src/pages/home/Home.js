import { Button, Typography } from '../../components';
import './Home.css';

const Home = () => {
  return (
    <div className="Home__root">
      <section className="d-flex content-evenly py-1">
        <div className="d-flex flex-col content-evenly flex-1">
          <Typography variant="h1" className="text-34">
            FlixNote
          </Typography>
          <div className="d-flex flex-col">
            <Typography className="py-1 text-bold" variant="h5">
              <span className="d-block text-bolder text-20"> Meet your modern</span>
              <span className="Typography--primary text-16">Note Taking app</span>
            </Typography>
            <Typography variant="p" className="text-14 max-w-65">
              Manage your daily tasks in a moren way and boost your efficacy and production limits
              with any efforts
            </Typography>
          </div>
          <div className="d-flex w-40 mt-2">
            <Button
              component="link"
              hasLink
              to="/signup"
              className="Home__joinBtn"
              variant="contained"
            >
              Join Now
            </Button>
            <Button
              component="link"
              hasLink
              to="/signin"
              className="Home__continueBtn"
              variant="outlined"
            >
              Sign In
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
