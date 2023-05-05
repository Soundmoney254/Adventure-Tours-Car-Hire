import React, { useEffect, useState } from 'react';
import CarCard from './CarCard';

function CompareCars({ cars }) {
  const [showCars, setShowCars] = useState(null);
  const [sortAscending, setSortAscending] = useState(false);
  const [filterCapacity, setFilterCapacity] = useState('');

  useEffect(() => {
    if (cars) {
      let filteredCars = cars;

      if (filterCapacity !== '') {
        filteredCars = filteredCars.filter(car => car.capacity === parseInt(filterCapacity));
      }

      filteredCars = filteredCars.sort((a, b) => {
        if (sortAscending) {
          return a.dailyPrice - b.dailyPrice;
        } else {
          return b.dailyPrice - a.dailyPrice;
        }
      });

      const renderedCars = filteredCars.map((car) => (
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
  }, [cars, sortAscending, filterCapacity]);

  const handleSort = () => {
    setSortAscending(!sortAscending);
  };

  const handleFilter = (e) => {
    setFilterCapacity(e.target.value);
  };

  return (
    <div id='showCars'>
      <div>
        <button onClick={handleSort} className="btn btn-secondary" id='sortButton'>
          Sort by Price {sortAscending ? 'Descending' : 'Ascending'}
        </button>
        <select value={filterCapacity} onChange={handleFilter} className="form-select">
          <option value="">Filter by Capacity</option>
          {Array.from({ length: 10 }, (_, i) => (
            <option value={i + 1} key={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
      </div>
      {showCars}
    </div>
  );
}

export default CompareCars;
