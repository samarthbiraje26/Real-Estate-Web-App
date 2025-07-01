import { useState, useEffect } from 'react';
import axios from 'axios';

function PropertyList() {
  const [properties, setProperties] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/properties?search=${search}&page=${page}&limit=10`
        );
        setProperties(res.data.properties);
        setTotalPages(res.data.pages);
      } catch (error) {
        console.error(error.response.data);
      }
    };
    fetchProperties();
  }, [search, page]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/properties/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setProperties(properties.filter((property) => property._id !== id));
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search by title or location"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div>
        {properties.map((property) => (
          <div key={property._id}>
            <h3>{property.title}</h3>
            <p>{property.description}</p>
            <p>{property.location}</p>
            <p>${property.price}</p>
            <img src={property.imageUrl} alt={property.title} width="100" />
            <button onClick={() => handleDelete(property._id)}>Delete</button>
          </div>
        ))}
      </div>
      <div>
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Previous
        </button>
        <span>{page} of {totalPages}</span>
        <button onClick={() => setPage(page + 1)} disabled={page === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}
export default PropertyList;