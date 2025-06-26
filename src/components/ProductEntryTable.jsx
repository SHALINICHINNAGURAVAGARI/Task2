import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function ProductEntryTable() {
  // State to store the current input values
  const [form, setForm] = useState({
    category: '',
    gender: '',
    age: '',
    price: '',
    discount: ''
  });

  // State to store all submitted entries
  const [entries, setEntries] = useState([]);

  // State for error message
  const [error, setError] = useState('');

  // State to control visibility of the entries table
  const [showTable, setShowTable] = useState(true);

  // Handle input changes for the form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setError(''); // Clear error when user types
  };

  // Handle form submission
  const handleAdd = (e) => {
    e.preventDefault();
    // Simple validation: all fields must be filled
    if (Object.values(form).some(val => val.trim() === '')) {
      setError('Please fill all fields before adding!');
      return;
    }
    // Add the entry to the list
    setEntries(prev => [...prev, { ...form, id: Date.now() }]);
    // Clear the form
    setForm({ category: '', gender: '', age: '', price: '', discount: '' });
    // Hide the table after adding
    
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <h2 className="mb-4">Product Entry Table</h2>
          {/* Error message */}
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          {/* Product Entry Form */}
          <form onSubmit={handleAdd} className="mb-4">
            <div className="row g-3 align-items-end">
              <div className="col-md-2">
                <label className="form-label">Category</label>
                <select
                  name="category"
                  className="form-select"
                  value={form.category}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="electronics">Electronics</option>
                  <option value="clothing">Clothing</option>
                  <option value="books">Books</option>
                  <option value="home">Home & Garden</option>
                  <option value="sports">Sports</option>
                </select>
              </div>
              <div className="col-md-2">
                <label className="form-label">Gender</label>
                <input
                  name="gender"
                  className="form-control"
                  value={form.gender}
                  onChange={handleChange}
                  placeholder="male/female/other"
                />
              </div>
              <div className="col-md-2">
                <label className="form-label">Age</label>
                <input
                  name="age"
                  className="form-control"
                  value={form.age}
                  onChange={handleChange}
                  placeholder="Age"
                />
              </div>
              <div className="col-md-2">
                <label className="form-label">Price</label>
                <input
                  name="price"
                  className="form-control"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="Price"
                />
              </div>
              <div className="col-md-2">
                <label className="form-label">Discount</label>
                <div className="input-group">
                  <input
                    name="discount"
                    className="form-control"
                    value={form.discount}
                    onChange={handleChange}
                    placeholder="Discount"
                  />
                  <span className="input-group-text">%</span>
                </div>
              </div>
              <div className="col-md-2 d-flex align-items-end">
                <button type="submit" className="btn btn-outline-primary w-100">Add</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProductEntryTable; 