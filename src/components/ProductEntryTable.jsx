import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function ProductEntryTable({ onAdd }) {
  const navigate = useNavigate();
  
  // State to store the current input values
  const [form, setForm] = useState({
    category: '',
    gender: '',
    age: '',
    price: '',
    discount: ''
  });

  // State for error message
  const [error, setError] = useState('');

  // Handle input changes for the form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  // Handle form submission when ever user clicks Add button
  const handleAdd = (e) => {
    e.preventDefault();
    
    // Validation: Check if all fields are filled
    if (form.category.trim() === '') {
      setError('Please select a category!');
      return;
    }

    if (form.gender.trim() === '') {
      setError('Please enter gender (male/female/other)!');
      return;
    }

    if (form.age.trim() === '') {
      setError('Please enter age!');
      return;
    }

    if (form.price.trim() === '') {
      setError('Please enter price!');
      return;
    }

    if (form.discount.trim() === '') {
      setError('Please enter discount percentage!');
      return;
    }

    // Validation: Check gender constraints (only male, female, other allowed)
    const validGenders = ['male', 'female', 'other'];
    if (!validGenders.includes(form.gender.trim().toLowerCase())) {
      setError('Gender must be male, female, or other!');
      return;
    }

    // Validation: Check age constraints
    const age = parseInt(form.age);
    if (isNaN(age) || age <= 0) {
      setError('Age must be a positive number greater than 0!');
      return;
    }

    // Validation: Check price constraints
    const price = parseFloat(form.price);
    if (isNaN(price) || price <= 0) {
      setError('Price must be a number greater than 0!');
      return;
    }

    // Validation: Check discount constraints
    const discount = parseFloat(form.discount);
    if (isNaN(discount) || discount < 0 || discount > 100) {
      setError('Discount must be a number between 0 and 100!');
      return;
    }

    // All validations passed, add the entry
    onAdd({ ...form, id: Date.now() });
    
    // Clear the form
    setForm({ category: '', gender: '', age: '', price: '', discount: '' });

    // Navigate to details page after successful addition
    navigate('/details');
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Product Entry Table</h1>
      
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <form onSubmit={handleAdd}>
        <div className="row">
          <div className="col-md-2">
            <div className="form-group">
              <label htmlFor="category">Category:</label>
              <select
                className="form-control"
                id="category"
                name="category"
                value={form.category}
                onChange={handleChange}
              >
                <option value="">--Select Category--</option>
                <option value="Electronics">Electronics</option>
                <option value="Clothing">Clothing</option>
                <option value="Books">Books</option>
                <option value="Home & Garden">Home & Garden</option>
                <option value="Sports">Sports</option>
                <option value="Toys">Toys</option>
                <option value="Automotive">Automotive</option>
                <option value="Health & Beauty">Health & Beauty</option>
                <option value="Food & Beverages">Food & Beverages</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          
          <div className="col-md-2">
            <div className="form-group">
              <label htmlFor="gender">Gender:</label>
              <input
                type="text"
                className="form-control"
                id="gender"
                name="gender"
                value={form.gender}
                onChange={handleChange}
                placeholder="male/female/other"
              />
            </div>
          </div>
          
          <div className="col-md-2">
            <div className="form-group">
              <label htmlFor="age">Age:</label>
              <input
                type="number"
                className="form-control"
                id="age"
                name="age"
                value={form.age}
                onChange={handleChange}
                placeholder="Enter age"
              />
            </div>
          </div>
          
          <div className="col-md-2">
            <div className="form-group">
              <label htmlFor="price">Price:</label>
              <input
                type="number"
                step="0.01"
                className="form-control"
                id="price"
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="Enter price"
              />
            </div>
          </div>
          
          <div className="col-md-2">
            <div className="form-group">
              <label htmlFor="discount">Discount (%):</label>
              <input
                type="number"
                step="0.01"
                className="form-control"
                id="discount"
                name="discount"
                value={form.discount}
                onChange={handleChange}
                placeholder="0-100"
              />
            </div>
          </div>
          
          <div className="col-md-2">
            <div className="form-group">
              <label>&nbsp;</label>
              <button type="submit" className="btn btn-primary form-control">
                Add
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ProductEntryTable; 
 