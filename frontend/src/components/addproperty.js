import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddProperty() {
  const [formData, setFormData] = useState({ title: '', description: '', location: '', price: '', imageUrl: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/properties', formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      navigate('/');
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="title" onChange={handleChange} placeholder="Title" required />
      <input type="text" name="description" onChange={handleChange} placeholder="Description" required />
      <input type="text" name="location" onChange={handleChange} placeholder="Location" required />
      <input type="number" name="price" onChange={handleChange} placeholder="Price" required />
      <input type="text" name="imageUrl" onChange={handleChange} placeholder="Image URL" required />
      <button type="submit">Add Property</button>
    </form>
  );
}
export default AddProperty;