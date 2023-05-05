import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function CarOwners({setCars, cars}) {
  const [formData, setFormData] = useState({
    model: "",
    capacity: "",
    photos: ["", "", ""],
    dailyPrice: "",
    owner: {
      name: "",
      phone: "",
    },
    vehicleFeedback: []
  });

  const [submittedData, setSubmittedData] = useState([]);
  const [errors, setErrors] = useState([]);
  const [editingId, setEditingId] = useState("");
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
    const form = document.querySelector("#form");

    if (formData.model.length > 0) {
      const updatedFormData = {
        ...formData,
        photos: [
          formData.photos[0],
          formData.photos[1],
          formData.photos[2],
        ],
        id: uuidv4(),
      };

      try {
        const response = await fetch("https://my-json-server-kcbo.onrender.com/vehicles", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedFormData),
        });

        const data = await response.json();
        let updatedCars=[data, ...cars];
        setCars(updatedCars);

      } catch (error) {
        console.log("Error submitting car:", error);
      }

      const dataArray = [...submittedData, updatedFormData];
      setSubmittedData(dataArray);
      setFormData({
        model: "",
        capacity: "",
        photos: ["", "", ""],
        dailyPrice: "",
        owner: {
          name: "",
          phone: "",
        },
      });
      setErrors([]);
      form.reset();
    } else {
      setErrors(["All inputs required!"]);
    }
  }


  const handleSave = async () => {
    try {
      await fetch(`https://my-json-server-kcbo.onrender.com/vehicles/${editingId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const updatedData = submittedData.map((data) => {
        if (data.id === editingId) {
          return formData;
        }
        return data;
      });

      setSubmittedData(updatedData);
      setFormData({
        model: "",
        capacity: "",
        photos: ["", "", ""],
        dailyPrice: "",
        owner: {
          name: "",
          phone: "",
        },
      });
      setEditingId("");
    } catch (error) {
      console.log("Error updating car:", error);
    }
  };

  const submittedRows = submittedData.map((data) => (
    <tr key={uuidv4()}>
      <td>{data.model}</td>
      <td>{data.capacity}</td>
      <td>{data.dailyPrice}</td>
      <td>{data.owner.name}</td>
      <td>{data.owner.phone}</td>
      <td>
        {editingId === data.id ? (
          <button onClick={handleSave}>Save</button>
        ) : (
          <>
            <button onClick={() => handleEdit(data.id)}>Edit</button>
            <button onClick={() => handleDelete(data.id)}>Delete</button>
          </>
        )}
      </td>
    </tr>
  ));


  function handlePhotoChange(e, index) {
    const { value } = e.target;
    setFormData((prevFormData) => {
      const updatedPhotos = [...prevFormData.photos];
      updatedPhotos[index] = value;
      return {
        ...prevFormData,
        photos: updatedPhotos,
      };
    });
  }

  const handleDelete = async (id) => {
    try {
      await fetch(`https://my-json-server-kcbo.onrender.com/vehicles/${id}`, {
        method: "DELETE",
      });

      const updatedData = submittedData.filter((data) => data.id !== id);
      setSubmittedData(updatedData);
    } catch (error) {
      console.log("Error deleting car:", error);
    }
  };

  const handleEdit = (id) => {
    const dataToEdit = submittedData.find((data) => data.id === id);
    setFormData(dataToEdit);
    setEditingId(id);
  };

  return (
    <div>
    <div id="addYourRide">
        <form onSubmit={handleSubmit} className="form" id="form">
          <div className="mb-3">
            <label htmlFor="model">Model:</label>
            <input
              required
              type="text"
              className="form-control"
              onChange={handleChange}
              value={formData.model}
              name="model"
              id="model"
              placeholder="Model"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="capacity">Capacity:</label>
            <input
              required
              type="number"
              className="form-control"
              onChange={handleChange}
              value={formData.capacity}
              name="capacity"
              id="capacity"
              placeholder="Capacity"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="photo1">Photo Link:</label>
            <input
              required
              type="text"
              className="form-control"
              onChange={(e) => handlePhotoChange(e, 0)}
              value={formData.photos[0]}
              id="photo1"
              placeholder="Photo Link:"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="photo2">Photo Link:</label>
            <input
              required
              type="text"
              className="form-control"
              onChange={(e) => handlePhotoChange(e, 1)}
              value={formData.photos[1]}
              id="photo2"
              placeholder="Photo Link:"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="photo3">Photo Link:</label>
            <input
              required
              type="text"
              className="form-control"
              onChange={(e) => handlePhotoChange(e, 2)}
              value={formData.photos[2]}
              id="photo3"
              placeholder="Photo Link:"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="dailyPrice">Daily Price:</label>
            <input
              required
              type="text"
              className="form-control"
              onChange={handleChange}
              value={formData.dailyPrice}
              name="dailyPrice"
              id="dailyPrice"
              placeholder="Daily Price"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="ownerName">Owner Name:</label>
            <input
              required
              type="text"
              className="form-control"
              onChange={handleChange}
              value={formData.owner.name}
              name="owner.name"
              id="ownerName"
              placeholder="Owner Name"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="ownerPhone">Owner Phone:</label>
            <input
              required
              type="text"
              className="form-control"
              onChange={handleChange}
              value={formData.owner.phone}
              name="owner.phone"
              id="ownerPhone"
              placeholder="Owner Phone"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            {editingId ? "Save" : "Submit"}
          </button>
        </form>
      {errors.length > 0 &&
        errors.map((error, index) => (
          <p key={index} style={{ color: "red" }}>
            {error}
          </p>
        ))}
      
    </div>
      <div id="submittedData">
        <h3>Your Submitted Data</h3>
          <table className="table table-dark table-sm">
            <thead>
              <tr>
                <th>Model</th>
                <th>Capacity</th>
                <th>Daily Price</th>
                <th>Owner Name</th>
                <th>Owner Phone</th>
              </tr>
            </thead>
          <tbody>{submittedRows}</tbody>
          </table>
    </div>
    </div>
  );
}

export default CarOwners;
