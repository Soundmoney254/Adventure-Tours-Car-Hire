import './App.css';
import React, { useEffect, useState } from 'react';
import CarOwners from './Components/CarOwners';
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
  console.log(cars);

  return (
    <div className="App">
      <header>ADVENTURE TOURS CAR HIRE</header>
      <p>CAR OWNER DETAILS</p>

      <CarOwners />
      <CompareCars cars={cars} />
    </div>
  );
}

export default App;