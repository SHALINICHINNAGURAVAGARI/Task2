import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function UploadImage() {
  const [rows, setRows] = useState([
    { category: '', gender: '', price: '', discount: '', image: null, imageUrl: '' }
  ]);
  const [error, setError] = useState('');

  const handleRowChange = (index, field, value) => {
    setRows(prev => prev.map((row, i) => i === index ? { ...row, [field]: value } : row));
    setError('');
  };

  const handleImageChange = (index, file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setRows(prev => prev.map((row, i) =>
        i === index ? { ...row, image: file, imageUrl: reader.result } : row
      ));
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleAddRow = () => {
    setRows(prev => [...prev, { category: '', gender: '', price: '', discount: '', image: null, imageUrl: '' }]);
    setError('');
  };

  const handleSubmit = () => {
    for (let i = 0; i < rows.length; i++) {
      const entry = rows[i];
      if (!entry.category || !entry.gender || !entry.price || !entry.discount || !entry.image) {
        setError('Please fill all fields and upload an image in every row before submitting!');
        return;
      }
      if (isNaN(parseFloat(entry.price)) || parseFloat(entry.price) <= 0) {
        setError('Please enter price > 0 in all rows!');
        return;
      }
      if (isNaN(parseFloat(entry.discount)) || parseFloat(entry.discount) <= 0 || parseFloat(entry.discount) > 100) {
        setError('Please enter discount > 0 and <= 100 in all rows!');
        return;
      }
    }
    setError('');
    alert('Submitted successfully!');
    setRows([{ category: '', gender: '', price: '', discount: '', image: null, imageUrl: '' }]);
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div></div>
        <h1 className="text-center">Upload Image Table</h1>
        <div style={{ width: '100px' }}>
          <button
            type="button"
            className="btn btn-primary btn-lg"
            onClick={handleAddRow}
          >Add</button>
        </div>
      </div>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <div className="mt-4">
        <div className="row mb-3">
          <div className="col-md-2">
            <h6 className="text-center font-weight-bold">Category</h6>
          </div>
          <div className="col-md-2">
            <h6 className="text-center font-weight-bold">Gender</h6>
          </div>
          <div className="col-md-2">
            <h6 className="text-center font-weight-bold">Price</h6>
          </div>
          <div className="col-md-2">
            <h6 className="text-center font-weight-bold">Discount(%)</h6>
          </div>
          <div className="col-md-4">
            <h6 className="text-center font-weight-bold">Upload Image</h6>
          </div>
        </div>
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="row mb-3 align-items-center">
            <div className="col-md-2">
              <select
                className="form-control"
                value={row.category}
                onChange={e => handleRowChange(rowIndex, 'category', e.target.value)}
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
            <div className="col-md-2">
              <input
                type="text"
                className="form-control"
                value={row.gender}
                onChange={e => handleRowChange(rowIndex, 'gender', e.target.value)}
                placeholder="male/female/other"
              />
            </div>
            <div className="col-md-2">
              <input
                type="number"
                className="form-control"
                value={row.price}
                onChange={e => handleRowChange(rowIndex, 'price', e.target.value)}
                placeholder="Enter price"
              />
            </div>
            <div className="col-md-2">
              <input
                type="number"
                className="form-control"
                value={row.discount}
                onChange={e => handleRowChange(rowIndex, 'discount', e.target.value)}
                placeholder="0-100"
              />
            </div>
            <div className="col-md-4">
              <input
                type="file"
                accept="image/*"
                className="form-control"
                onChange={e => handleImageChange(rowIndex, e.target.files[0])}
              />
              {row.imageUrl && (
                <img src={row.imageUrl} alt="Preview" style={{ maxWidth: 80, maxHeight: 80, marginTop: 5 }} />
              )}
            </div>
          </div>
        ))}
      </div>
      {rows.length > 0 && (
        <div className="text-center mt-3">
          <button
            type="button"
            className="btn btn-success me-2"
            onClick={handleSubmit}
          >Submit All</button>
        </div>
      )}
    </div>
  );
}

export default UploadImage; 