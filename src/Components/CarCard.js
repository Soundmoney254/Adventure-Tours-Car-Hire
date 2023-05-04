import React, { useState } from 'react';

function CarCard({ vehicle }) {
    const { model, capacity, photos, dailyPrice, vehicleFeedback } = vehicle;
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

    const handleNextPhoto = () => {
        setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % photos.length);
    };

    const handlePrevPhoto = () => {
        setCurrentPhotoIndex((prevIndex) =>
            prevIndex === 0 ? photos.length - 1 : prevIndex - 1
        );
    };

    return (
        <div className="carCardContainer">
        <div className="carCard">
            <div className="carCardImages">
                <img
                    src={photos[currentPhotoIndex]}
                    alt={model}
                    className="carCardImage"
                />
                {photos.length > 1 && (
                    <div className="carCardViewImages">
                        <button onClick={handlePrevPhoto}>&lt;</button>
                        <button onClick={handleNextPhoto}>&gt;</button>
                    </div>
                )}
            </div>
            <h3 className="carCardModel">{model}</h3>
            <p className="carCardCapacity">Capacity: {capacity}</p>
            <p className="carCardPrice">Daily Price: Ksh {dailyPrice}</p>

            <div className="carCardFeedback">
                <h4>Vehicle Feedback:</h4>
                {vehicleFeedback.map((feedback, index) => (
                    <p key={index}>{feedback}</p>
                ))}
            </div>
        </div>
        </div>
    );
}

export default CarCard;
