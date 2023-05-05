import React, { useState } from 'react';

function CarCard({ vehicle }) {
    const { model, capacity, photos, dailyPrice, owner, vehicleFeedback } = vehicle;
    const { name, phone } = owner;
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
    const [showOwnerDetails, setShowOwnerDetails] = useState(false);
    const [comment, setComment] = useState('');
    const [updatedFeedback, setUpdatedFeedback] = useState(vehicleFeedback);


    const handleNextPhoto = () => {
        setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % photos.length);
    };

    const handlePrevPhoto = () => {
        setCurrentPhotoIndex((prevIndex) =>
            prevIndex === 0 ? photos.length - 1 : prevIndex - 1
        );
    };

    const handleBookNow = () => {
        setShowOwnerDetails(true);
    };

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const handleSubmitComment = () => {
        const updatedFeedback = [...vehicleFeedback, comment];

        const updatedVehicle = {
            ...vehicle,
            vehicleFeedback: updatedFeedback,
        };

        fetch(`https://my-json-server-kcbo.onrender.com/vehicles/${vehicle.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedVehicle),
        })
            .then((response) => response.json())
            .then((data) => {
                setUpdatedFeedback(updatedFeedback);
            })
            .catch((error) => {
                console.log("Error adding comment:", error);
            });
        setComment('');
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
                            <button className="btn btn-dark" onClick={handlePrevPhoto}>&lt;</button>
                            <button className="btn btn-dark" onClick={handleNextPhoto}>&gt;</button>
                        </div>
                    )}
                </div>
                <h3 className="carCardModel">{model}</h3>
                <p className="carCardCapacity">Capacity: {capacity}</p>
                <p className="carCardPrice">Daily Price: Ksh {dailyPrice}</p>

                <div className="carCardFeedback">
                    <h4>Vehicle Feedback:</h4>
                    {updatedFeedback && updatedFeedback.length > 1 && (
                        <div className="feedback-container">
                            {updatedFeedback.map((feedback, index) => (
                                <p key={index}>{feedback}</p>
                            ))}
                        </div>
                    )}
                    <button className="btn btn-primary" onClick={handleBookNow}>Book Now</button>
                    {showOwnerDetails && (
                        <div className="carCardOwner">
                            <h3>Owner:</h3>
                            <h4>Name: {name}</h4>
                            <h4>Phone: {phone}</h4>
                        </div>
                    )}
                    {showOwnerDetails && (
                        <div className="carCardCommentSection">
                            <label htmlFor="comment">Add Comment:</label>
                            <input
                                required
                                className="mb-3"
                                type="text"
                                value={comment}
                                onChange={handleCommentChange}
                                id="comment"
                                placeholder="Add your comment..."
                            />
                            <button onClick={handleSubmitComment} className="btn btn-primary">Add Comment</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
export default CarCard;
