import React from 'react';

function CarCard({ vehicle }) {
    const { model, capacity, photos, dailyPrice, vehicleFeedback } = vehicle;

    return (
        <div className="car-card">
            <img src={photos[0]} alt={model} className="car-card__image" />
            <h3 className="car-card__model">{model}</h3>
            <p className="car-card__capacity">Capacity: {capacity}</p>
            <p className="car-card__daily-price">Daily Price: ${dailyPrice}</p>
         
            <div className="car-card__feedback">
                <h4>Vehicle Feedback:</h4>
                {vehicleFeedback.map((feedback, index) => (
                    <p key={index}>{feedback}</p>
                ))}
            </div>
        </div>
    );
}

export default CarCard;
