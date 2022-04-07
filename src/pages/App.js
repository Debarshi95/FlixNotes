import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './auth/Signin/Signin';
import Signup from './auth/Signup/Signup';
import Dashboard from './dashboard/Dashboard';
import Home from './home/Home';

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" index element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
      <Toaster />
    </div>
  );
};

export default App;
