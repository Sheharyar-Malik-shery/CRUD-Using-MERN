import React, { useEffect, useState } from "react";
import axios from "axios";

function Form({ initialData, handleSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    profile: null,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        email: initialData.email,
        profile: null, // We don't reset the profile image
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      profile: e.target.files[0],
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    if (formData.profile) {
      data.append("profile", formData.profile);
    }
    handleSubmit(data);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input
        type="text"
        placeholder="Enter your Name"
        value={formData.name}
        name="name"
        onChange={handleChange}
        required
      />
      <input
        type="email"
        placeholder="Enter your Email"
        value={formData.email}
        name="email"
        onChange={handleChange}
        required
      />
      <input type="file" name="profile" onChange={handleFileChange} />
      <button type="submit">{initialData ? "Update" : "Submit"}</button>
    </form>
  );
}

export default Form;
