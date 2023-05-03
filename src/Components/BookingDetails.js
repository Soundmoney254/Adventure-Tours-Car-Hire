import React from 'react';

function BookingDetails(props) {
    return (
        <div>
            <div className="car-card__owner">
                <h4>Owner Details:</h4>
                <p>Name: {owner.name}</p>
                <p>Phone: {owner.phone}</p>
            </div> 
        </div>
    );
}

export default BookingDetails;