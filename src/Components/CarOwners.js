import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function CarOwners(props) {
  const [formData, setFormData] = useState({
    model: "",
    capacity: "",
    photos: [],
    dailyPrice: "",
    owner: {
      name: "",
      phone: "",
    },
  });

  const [submittedData, setSubmittedData] = useState([]);
  const [errors, setErrors] = useState([]);
  function handleChange(event) {
    const { name, value } = event.target;


    const nameArray = name.split(".");
    let updatedFormData = { ...formData };

    let nestedState = updatedFormData;
    for (let i = 0; i < nameArray.length - 1; i++) {
      const key = nameArray[i];
      nestedState = nestedState[key];
    }

    const lastKey = nameArray[nameArray.length - 1];
    nestedState[lastKey] = value;

    setFormData(updatedFormData);
  }


  async function handleSubmit(event) {
    event.preventDefault();

    if (formData.model.length > 0) {
      const updatedFormData = {
        id: uuidv4(),
        ...formData,
        photos: [
          formData.photoOne,
          formData.photoTwo,
          formData.photoThree,
        ],
      };

      try {
        const response = await fetch("http://localhost:4200/vehicles", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedFormData),
        });

        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.log("Error submitting car:", error);
      }

      const dataArray = [...submittedData, updatedFormData];
      setSubmittedData(dataArray);
      setFormData({
        model: "",
        capacity: "",
        photos: [],
        dailyPrice: "",
        owner: {
          name: "",
          phone: "",
        },
      });
      setErrors([]);
    } else {
      setErrors(["All inputs required!"]);
    }
  }

 const submissionRows = submittedData.map((data) => (
    <tr key={data.id}>
      <td>{data.model}</td>
      <td>{data.capacity}</td>
      <td>{data.dailyPrice}</td>
      <td>{data.owner.name}</td>
      <td>{data.owner.phone}</td>
    </tr>
  ));

  function handlePhotoChange(e, index) {
    const { value } = e.target;
    setFormData((prevFormData) => {
      const updatedPhotos = [...prevFormData.photos];
      updatedPhotos[index] = value;
      return {
        ...prevFormData,
        photos: updatedPhotos
      };
    });
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="form">
        <div className="mb-3">
          <input
            required
            type="text"
            className="form-control"
            onChange={handleChange}
            value={formData.model}
            name="model"
            placeholder="Model"
          />
        </div>
        <div className="mb-3">
          <input
            required
            type="number"
            className="form-control"
            onChange={handleChange}
            value={formData.capacity}
            name="capacity"
            placeholder="Capacity"
          />
        </div>

        {formData.photos.length === 0 && (
          <div className="mb-3">
            <input
              required
              type="text"
              className="form-control"
              onChange={(e) => handlePhotoChange(e, 0)}
              value={formData.photos[0] || ""}
              placeholder="Photo 1"
            />
          </div>
        )}

        {formData.photos.length > 0 &&
          formData.photos.map((photo, index) => (
            <div className="mb-3" key={index}>
              <input
                required
                type="text"
                className="form-control"
                onChange={(e) => handlePhotoChange(e, index)}
                value={photo}
                placeholder={`Photo ${index + 1}`}
              />
            </div>
          ))}

        <div className="mb-3">
          <input
            required
            type="text"
            className="form-control"
            onChange={handleChange}
            value={formData.dailyPrice}
            name="dailyPrice"
            placeholder="Daily Price"
          />
        </div>
        <div className="mb-3">
          <input
            required
            type="text"
            className="form-control"
            onChange={handleChange}
            value={formData.owner.name}
            name="owner.name"
            placeholder="Owner Name"
          />
        </div>
        <div className="mb-3">
          <input
            required
            type="text"
            className="form-control"
            onChange={handleChange}
            value={formData.owner.phone}
            name="owner.phone"
            placeholder="Owner Phone"
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>

      {errors.length > 0 &&
        errors.map((error, index) => (
          <p key={index} style={{ color: "red" }}>
            {error}
          </p>
        ))}
      <h3>Submissions</h3>
      {submittedData.length > 0 ? (
        <table class="table table-bordered border-primary">
          <thead>
            <tr>
              <th>Model</th>
              <th>Capacity</th>
              <th>Daily Price</th>
              <th>Owner Name</th>
              <th>Owner Phone</th>
            </tr>
          </thead>
          <tbody>{submissionRows}</tbody>
        </table>
      ) : (
        <p>No submissions yet.</p>
      )}
    </div>
  );
}

export default CarOwners;
