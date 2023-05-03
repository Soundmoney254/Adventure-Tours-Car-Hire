import React, { useEffect, useState } from 'react';
import CarCard from './CarCard';

function CompareCars() {
  const [cars, setCars]=useState()
  useEffect(()=>{
    fetchCars();
  },[])

  async function fetchCars() {
    try {
      const response = await fetch('http://localhost:4200/vehicles');
      const data = await response.json();
      setCars(data.vehicles);
    } catch (error) {
      console.log('Error fetching cars:', error);
    }
  }

  return (
    <div>
      {cars.map((car, index) => (
        <CarCard key={index} vehicle={car} />
      ))}
    </div>
  )
}

export default CompareCars;