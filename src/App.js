import './App.css';
import React from'react';
import CarOwners from './Components/CarOwners';
import BookingDetails from './Components/BookingDetails';

function App() {
  return (
    <div className="App">
      <header> ADVENTURE TOURS CAR HIRE </header>
      <p>CAR OWNER DETAILS</p>
      
      <CarOwners />
      <BookingDetails />
    </div>
  );
}

export default App;
