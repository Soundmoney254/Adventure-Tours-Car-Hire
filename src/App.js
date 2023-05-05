import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, NavLink, Route, Routes } from 'react-router-dom';
import CarOwners from './Components/CarOwners';
import CompareCars from './Components/CompareCars';
import HomePage from './Components/HomePage';
import About from './Components/About';

function App() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetchCars();
  }, []);

  async function fetchCars() {
    try {
      const response = await fetch('https://my-json-server-kcbo.onrender.com/vehicles');
      const data = await response.json();
      setCars(data);
    } catch (error) {
      console.log('Error fetching cars:', error);
    }
  }

  const basename = '/Adventure-Tours-Car-Hire';

  return (
    <Router basename={basename}>
      <div className="App">
        <h1>ADVENTURE TOURS CAR HIRE</h1>
        <nav>
          <NavLink to="/" className="nav-link" activeClassName="activeLink">
            <h2>Homepage</h2>
          </NavLink>
          <NavLink to="/compare-cars" className="nav-link" activeClassName="activeLink">
            <h2>Find Ride</h2>
          </NavLink>
          <NavLink to="/car-owners" className="nav-link" activeClassName="activeLink">
            <h2>Add Ride</h2>
          </NavLink>
          <NavLink to="/about-us" className="nav-link" activeClassName="activeLink">
            <h2>About Us</h2>
          </NavLink>
        </nav>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/car-owners" element={<CarOwners cars={cars} setCars={setCars}/>} />
          <Route path="/compare-cars" element={<CompareCars cars={cars} />} />
          <Route path="/about-us" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
