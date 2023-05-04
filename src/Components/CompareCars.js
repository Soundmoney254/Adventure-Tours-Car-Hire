import React, { useEffect, useState } from 'react';
import CarCard from './CarCard';

function CompareCars({ cars }) {
  const [showCars, setShowCars] = useState(null);

  useEffect(() => {
    if (cars) {
      const renderedCars = cars.reverse().map((car) => (
        <CarCard key={car.id} vehicle={car} />
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
      {showCars}
    </div>;
}

export default CompareCars;