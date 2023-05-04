import React, {useState} from 'react';


function BookingDetails(props) {
    const [customerName, setCustomerName] = useState("");
    const [idNumber, setIdNumber] = useState("");
    const [customerAddress, setCustomerAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [submittedData, setSubmittedData] = useState([]);
    const [errors, setErrors] = useState([]);

    function handleCustomerName(event) {
        setCustomerName(event.target.value);
      }
    
      function handleIdNumber(event) {
        setIdNumber(event.target.value);
      }
      function handleCustomerAddress(event) {
        setCustomerAddress(event.target.value);
      }
      function handlePhoneNumber(event) {
        setPhoneNumber(event.target.value);
      }
      function handleSubmit(event) {
        event.preventDefault();
      // customer name is required
      if (customerName.length > 0) {
        const formData = { customerName: customerName, 
          idNumber: idNumber, 
          customerAddress: customerAddress, 
          phoneNumber: phoneNumber};
        const dataArray = [...submittedData, formData];
        setSubmittedData(dataArray);
        setCustomerName("");
        setIdNumber("");
        setCustomerAddress("");
        setPhoneNumber("");
        
        setErrors([]);
      } else {
        setErrors(["customer name is required!"]);
      }
    }
    const listOfSubmissions = submittedData.map((data, index) => {
        return (
          <div key={index}>
            {data.customerName}   {data.idNumber}   {data.customerAddress} {data.phoneNumber} 
          </div>
        );
      });

      return (
        <div>
        <form onSubmit={handleSubmit}>
          <input type="text" onChange={handleCustomerName} value={customerName} name="customerName" placeholder="Customer Name" />
          <input type="number" onChange={handleIdNumber} value={idNumber} name="idnumber" placeholder="Id Number" />
          <input type="text" onChange={handleCustomerAddress} value={customerAddress} name="customerAddress" placeholder="Customer Address" />
          <input type="text" onChange={handlePhoneNumber} value={phoneNumber} name="phoneNumber" placeholder="Phone number" />
          
          <button type="submit">Submit</button>
        </form>
        {/* conditionally render error messages */}
        {errors.length > 0
          ? errors.map((error, index) => (
              <p key={index} style={{ color: "red" }}>
                {error}
              </p>
            ))
          : null
          }
          <h3>Bookings</h3>
        {listOfSubmissions}
      </div>
      );
    }
    
export default BookingDetails;