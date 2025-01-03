import { Route, Routes } from 'react-router-dom';
import About from './components/About';
import Navbar from './components/Navbar';
import './index.css';
import AddNew from './pages/AddNew';
import Home from './pages/Home';
import SalesOverview from './pages/SalesOverview';
import Dashboard from './pages/Dashboard';
function App() {
  return (
    <div className="grid">
      <Navbar />
      <div className="flex-grow flex justify-center items-center ml-28  overflow-auto p-5 bg-gray-100">
        <Routes >
        <Route path="/" element={<Home />} />
          <Route path="/AddNew" element={<AddNew />} />
          <Route path="/about" element={<About />} />
          <Route path="/SalesOverview"  element={<SalesOverview />} />
          <Route path="/Dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
