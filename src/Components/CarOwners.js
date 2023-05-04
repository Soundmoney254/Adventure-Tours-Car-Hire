import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function CarOwners(props) {
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

  const submittedRows = submittedData.map((data) => (
    <tr key={data.id}>
      <td>{data.model}</td>
      <td>{data.capacity}</td>
      <td>{data.dailyPrice}</td>
      <td>{data.owner.name}</td>
      <td>{data.owner.phone}</td>
      <td>
        <button onClick={() => handleEdit(data.id)}>Edit</button>
        <button onClick={() => handleDelete(data.id)}>Delete</button>
      </td>
    </tr>
  ));

  function handlePhotoChange(e, index) {
    const { value } = e.target;
    setFormData((prevFormData) => {
      const updatedPhotos = [...prevFormData.photos];
      updatedPhotos[index] = value;
      console.log(updatedPhotos)
      return {
        ...prevFormData,
        photos: updatedPhotos,
      };
    });
  }

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:4200/vehicles/${id}`, {
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

  const handleSave = async () => {
    try {
      await fetch(`http://localhost:4200/vehicles/${formData.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const updatedData = submittedData.map((data) => {
        if (data.id === formData.id) {
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


  return (
    <div>
    <div id="addYourRide">
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
          <div className="mb-3">
            <input
              required
              type="text"
              className="form-control"
              onChange={(e) => handlePhotoChange(e, 0)}
              value={formData.photos[0]}
              placeholder="Photo 1"
            />
          </div>

          <div className="mb-3">
            <input
              required
              type="text"
              className="form-control"
              onChange={(e) => handlePhotoChange(e, 1)}
              value={formData.photos[1]}
              placeholder="Photo 2"
            />
          </div>

          <div className="mb-3">
            <input
              required
              type="text"
              className="form-control"
              onChange={(e) => handlePhotoChange(e, 2)}
              value={formData.photos[2]}
              placeholder="Photo 3"
            />
          </div>

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
