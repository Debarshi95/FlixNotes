import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './auth/Signin/Signin';
import Signup from './auth/Signup/Signup';
import Home from './home/Home';

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" index element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
