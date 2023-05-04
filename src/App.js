import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, NavLink, Route, Routes } from 'react-router-dom';
import CarOwners from './Components/CarOwners';
import BookingDetails from './Components/BookingDetails';
import CompareCars from './Components/CompareCars';


function App() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetchCars();
  }, []);

  async function fetchCars() {
    try {
      const response = await fetch('http://localhost:4200/vehicles');
      const data = await response.json();
      setCars(data);
    } catch (error) {
      console.log('Error fetching cars:', error);
    }
  }

  return (
    <Router>
      <div className="App">
        <h1>ADVENTURE TOURS CAR HIRE</h1>
        <nav>
          <NavLink to="/compare-cars" activeClassName="active"><h2>Find your Ride</h2></NavLink>
          <NavLink to="/car-owners" activeClassName="active"><h2>Add your Ride</h2></NavLink>
        </nav>
        <Routes>
          <Route path="/car-owners" element={<CarOwners />} />
          <Route path="/compare-cars" element={<CompareCars cars={cars} />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
