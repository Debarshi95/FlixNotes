import { useAuth } from 'providers/AuthProvider/AuthProvider';
import { Button, Typography } from 'components';
import './Home.css';

const Home = () => {
  const { user } = useAuth();
  return (
    <div className="Home__root">
      <section className="d-flex content-center py-1">
        <div className="d-flex flex-col content-evenly flex-1">
          <Typography variant="h1" size="xxlg">
            FlixNote
          </Typography>
          <div className="d-flex flex-col">
            <Typography className="py-1 text-bold" variant="h5" size="mmd">
              Meet your modern Note Taking app
            </Typography>
            <Typography variant="p" className="mx-auto max-w-75" align="center" size="ssm">
              Manage your daily tasks in a moren way and boost your efficacy and production limits
              with any efforts
            </Typography>
          </div>
          <div className="d-flex mt-2 content-center">
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
              to={user ? '/dashboard' : '/signin'}
              className="Home__continueBtn"
              variant="outlined"
            >
              {user ? 'Dashboard' : 'SignIn '}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
