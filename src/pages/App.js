import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './home/Home';

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" index element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
