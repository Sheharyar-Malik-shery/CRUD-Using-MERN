import React, { useEffect, useState } from "react";
import axios from "axios";
import Form from "./Components/Form";
import DisplayData from "./Components/DisplayData";
import "./App.css";
function App() {
  const [data, setData] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/user");
        setData(response.data.UserData);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (index) => {
    const userId = data[index]._id;
    try {
      await axios.delete(`http://localhost:8080/user/deleteUser/${userId}`);
      setData((prevData) => prevData.filter((_, i) => i !== index));
    } catch (error) {
      console.error("Error deleting user", error);
    }
  };

  const handleUpdate = (index, user) => {
    setCurrentUser(user);
  };

  const handleFormSubmit = async (formData) => {
    if (currentUser) {
      // Update user
      try {
        const response = await axios.patch(
          `http://localhost:8080/user/userUpdate/${currentUser._id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setData((prevData) =>
          prevData.map((item) =>
            item._id === currentUser._id ? response.data.user : item
          )
        );
        setCurrentUser(null);
      } catch (error) {
        console.error("Error updating user", error);
      }
    } else {
      // Create new user
      try {
        const response = await axios.post(
          "http://localhost:8080/user/newuser",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setData((prevData) => [...prevData, response.data.data]);
      } catch (error) {
        console.error("Error creating user", error);
      }
    }
  };

  return (
    <div>
      <h1>User Form</h1>
      <Form initialData={currentUser} handleSubmit={handleFormSubmit} />
      <h1>User Data</h1>
      <DisplayData
        data={data}
        handleDelete={handleDelete}
        handleUpdate={handleUpdate}
      />
    </div>
  );
}

export default App;
