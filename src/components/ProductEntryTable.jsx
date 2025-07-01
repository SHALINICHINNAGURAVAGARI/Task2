import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DataGrid from './DataGrid.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

function ProductEntryTable({ onAdd }) {
  const navigate = useNavigate();

  // State to hold all product rows
  const [rows, setRows] = useState([]);
  // State for error message
  const [gridError, setGridError] = useState('');

  // Check if a row is completely filled and valid
  const isRowValid = (row) => {
    if (!row.category || !row.gender || !row.age || !row.price || !row.discount) {
      return false;
    }
    const gender = row.gender.trim().toLowerCase();
    const validGenders = ['male', 'female', 'other'];
    if (!validGenders.includes(gender)) {
      return false;
    }
    const age = parseInt(row.age);
    if (isNaN(age) || age <= 0) {
      return false;
    }
    const price = parseFloat(row.price);
    if (isNaN(price) || price <= 0) {
      return false;
    }
    const discount = parseFloat(row.discount);
    if (isNaN(discount) || discount <= 0 || discount > 100) {
      return false;
    }
    return true;
  };

  // Check if the last row is valid (to enable/disable Add button)
  const isLastRowValid = () => {
    if (rows.length === 0) return true; // Allow first row to be added
    return isRowValid(rows[rows.length - 1]);
  };

  // Add a new empty row
  const handleAddRow = () => {
    setRows(prev => [...prev, { category: '', gender: '', age: '', price: '', discount: '' }]);
    setGridError('');
  };

  // Handle input change for a specific row
  const handleRowChange = (index, field, value) => {
    setRows(prev => prev.map((row, i) => i === index ? { ...row, [field]: value } : row));
    setGridError('');
  };

  // Handle submit all
  const handleSubmitAll = () => {
    // Validation
    for (let i = 0; i < rows.length; i++) {
      const entry = rows[i];
      if (!entry.category || !entry.gender || !entry.age || !entry.price || !entry.discount) {
        setGridError('Please fill all fields in every row before submitting!');
        return;
      }
      const gender = entry.gender.trim().toLowerCase();
      const validGenders = ['male', 'female', 'other'];
      if (!validGenders.includes(gender)) {
        setGridError('Please enter female, male or other for gender in all rows!');
        return;
      }
      const age = parseInt(entry.age);
      if (isNaN(age) || age <= 0) {
        setGridError('Please enter age > 0 in all rows!');
        return;
      }
      const price = parseFloat(entry.price);
      if (isNaN(price) || price <= 0) {
        setGridError('Please enter price > 0 in all rows!');
        return;
      }
      const discount = parseFloat(entry.discount);
      if (isNaN(discount) || discount <= 0 || discount > 100) {
        setGridError('Please enter discount > 0 and <= 100 in all rows!');
        return;
      }
    }
    // Submit all rows
    rows.forEach(entry => onAdd(entry));
    setRows([]); // Clear rows after submit
    setGridError('');
    navigate('/details');
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div></div>
        <h1 className="text-center">Product Entry Table</h1>
        <div style={{ width: '100px' }}>
          <button 
            type="button" 
            className="btn btn-primary btn-lg"
            onClick={handleAddRow}
            disabled={!isLastRowValid()}>Add</button>
        </div>
      </div>
      {gridError && (
        <div className="alert alert-danger" role="alert">
          {gridError}
        </div>
      )}
      <DataGrid 
        rows={rows}
        onRowChange={handleRowChange}
      />
      {rows.length > 0 && (
        <div className="text-center mt-3">
          <button 
            type="button" 
            className="btn btn-success me-2"
            onClick={handleSubmitAll}>Submit All</button>
        </div>
      )}
    </div>
  );
}

export default ProductEntryTable; 
 