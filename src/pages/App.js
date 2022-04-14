import NotFound from 'components/common/NotFound/NotFound';
import PrivateRoute from 'components/common/PrivateRoute/PrivateRoute';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './auth/Signin/Signin';
import Signup from './auth/Signup/Signup';
import Dashboard from './dashboard/Dashboard';
import Home from './home/Home';
import Util from './utils/Util';

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" index element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          {['/labels', '/archive', '/trash'].map((route) => (
            <Route
              path={route}
              key={route}
              element={
                <PrivateRoute>
                  <Util />
                </PrivateRoute>
              }
            />
          ))}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <Toaster />
    </>
  );
};

export default App;
