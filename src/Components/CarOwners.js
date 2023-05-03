import React, { useState } from "react";

function CarOwners(props) {
  const [fullNames, setFullNames] = useState("");
  const [ownerAddress, setOwnerAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [identificationNumber, setIdentificationNumber] = useState("");
  const [submittedData, setSubmittedData] = useState([]);
  const [errors, setErrors] = useState([]);
  
  function handleFullNamesChange(event) {
    setFullNames(event.target.value);
  }

  function handleOwnerAddress(event) {
    setOwnerAddress(event.target.value);
  }
  function handlePhoneNumbers(event) {
    setPhoneNumber(event.target.value);
  }
  function handleVehicleModel(event) {
    setVehicleModel(event.target.value);
  }
  function handleIdentificationNumber(event) {
    setIdentificationNumber(event.target.value);
  }
  function handleSubmit(event) {
    event.preventDefault();
  // full names is required
  if (fullNames.length > 0) {
    const formData = { fullNames: fullNames, ownerAddress: ownerAddress, phoneNumber: phoneNumber, vehicleModel: vehicleModel, identificationNumber: identificationNumber,};
    const dataArray = [...submittedData, formData];
    setSubmittedData(dataArray);
    setFullNames("");
    setOwnerAddress("");
    setPhoneNumber("");
    setVehicleModel("");
    setIdentificationNumber("");
    setErrors([]);
  } else {
    setErrors(["Full names is required!"]);
  }
}

  const listOfSubmissions = submittedData.map((data, index) => {
    return (
      <div key={index}>
        {data.fullNames} {data.ownerAddress} {data.ownerAddress} {data.phoneNumber} {data.vehicleModel} {data.identificationNumber}
      </div>
    );
  });

  return (
    <div>
    <form onSubmit={handleSubmit}>
      <input type="text" onChange={handleFullNamesChange} value={fullNames} />
      <input type="text" onChange={handleOwnerAddress} value={ownerAddress} />
      <input type="number" onChange={handlePhoneNumbers} value={phoneNumber} />
      <input type="text" onChange={handleVehicleModel} value={vehicleModel} />
      <input type="text" onChange={handleIdentificationNumber} value={identificationNumber} />
      <button type="submit">Submit</button>
    </form>
    {/* conditionally render error messages */}
    {errors.length > 0
      ? errors.map((error, index) => (
          <p key={index} style={{ color: "red" }}>
            {error}
          </p>
        ))
      : null}
      <h3>Submissions</h3>
    {listOfSubmissions}
  </div>
  );
}

export default CarOwners;