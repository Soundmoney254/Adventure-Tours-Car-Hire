import './App.css';
import React from'react';
import CarOwners from './Components/CarOwners';

function App() {
  return (
    <div className="App">
      <header> ADVENTURE TOURS CAR HIRE </header>
      <p>CAR OWNER DETAILS</p>
      
      <CarOwners />
    </div>
  );
}

export default App;
