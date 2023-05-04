import React, { useEffect, useState } from 'react';
import { BrowserRouter as NavLink, Route, Routes } from 'react-router-dom';
import BookingDetails from './BookingDetails';
import { v4 as uuidv4 } from 'uuid';
import CarCard from './CarCard';

function CompareCars({ cars }) {
  const [showCars, setShowCars] = useState(null);

  useEffect(() => {
    if (cars) {
      const renderedCars = cars.map((car) => (
        <CarCard key={uuidv4()} vehicle={car} />
      ));
      setShowCars(renderedCars);
    } else {
      setShowCars(
        <div>
          <h3>Vehicles Loading...</h3>
        </div>
      );
    }
  }, [cars]);

  return <div>
        <div>
          <nav>
            <NavLink to="/booking-details" activeclassname="active"><h2>Book your Ride</h2></NavLink>
          </nav>
          <Routes>
            <Route path="/booking-details" element={<BookingDetails />} />
          </Routes>
        </div>
   
      {showCars}
    </div>;
}

export default CompareCars;