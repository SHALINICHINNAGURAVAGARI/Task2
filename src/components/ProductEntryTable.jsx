import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DataGrid from './DataGrid.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

function ProductEntryTable({ onAdd }) {
  const navigate = useNavigate();

  // State to control showing the 5x5 grid
  const [showGrid, setShowGrid] = useState(false);
  
  // State to force DataGrid re-render
  const [gridKey, setGridKey] = useState(0);

  // State for grid error message
  const [gridError, setGridError] = useState('');

  // Handle Add button click - directly show the grid
  const handleAdd = () => {
    setGridKey(prev => prev + 1);
    setShowGrid(true);
  };

  // Handle grid submission from DataGrid component
  const handleGridSubmit = (entries) => {
    // Clear any grid errors messages
    setGridError('');
    
    // Stores all the grid entries in a variable
    const allEntries = entries;
    
    // Check for gender errors in all 5 rows
    const hasGenderError = allEntries.some(entry => {
      const gender = entry.gender.trim().toLowerCase();
      const validGenders = ['male', 'female', 'other'];
      return !validGenders.includes(gender);
    });
    
    if (hasGenderError) {
      setGridError('Please enter female, male or other for gender in all rows!');
      return;
    }
    
    // Check for age errors in all 5 rows
    const hasAgeError = allEntries.some(entry => {
      const age = parseInt(entry.age);
      return isNaN(age) || age <= 0;
    });
    
    if (hasAgeError) {
      setGridError('Please enter age > 0 in all rows!');
      return;
    }
    
    // Check for price errors in all 5 rows
    const hasPriceError = allEntries.some(entry => {
      const price = parseFloat(entry.price);
      return isNaN(price) || price <= 0;
    });
    
    if (hasPriceError) {
      setGridError('Please enter price > 0 in all rows!');
      return;
    }
    
    // Check for discount errors in all 5 rows
    const hasDiscountError = allEntries.some(entry => {
      const discount = parseFloat(entry.discount);
      return isNaN(discount) || discount <= 0 || discount > 100;
    });
    
    if (hasDiscountError) {
      setGridError('Please enter discount > 0 and <= 100 in all rows!');
      return;
    }
    
    // Adds up all grid entries to the main data list
    entries.forEach(entry => {
      onAdd(entry);
    });
    
    setShowGrid(false);

    // Navigate to details page after successful addition
    navigate('/details');
  };

  // Handle grid cancellation
  const handleGridCancel = () => {
    setShowGrid(false);
  };

  // Handle grid error
  const handleGridError = (errorMessage) => {
    setGridError(errorMessage);
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div></div>
        <h1 className="text-center">Product Entry Table</h1>
        <div style={{ width: '100px' }}>
          {!showGrid && (
            <button 
              type="button" 
              className="btn btn-primary btn-lg"
              onClick={handleAdd}>Add</button>
          )}
        </div>
      </div>
      
      {gridError && (
        <div className="alert alert-danger" role="alert">
          {gridError}
        </div>
      )}

      {/* Render DataGrid component when showGrid is true */}
      {showGrid && (
        <DataGrid 
          key={gridKey}
          onGridSubmit={handleGridSubmit}
          onCancel={handleGridCancel}
          onGridError={handleGridError}
        />
      )}
    </div>
  );
}

export default ProductEntryTable; 
 