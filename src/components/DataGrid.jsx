import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function DataGrid({ onGridSubmit, onCancel, onGridError, formData }) {
  // State to store 5 rows of 5 text field values each
  const [textFields, setTextFields] = useState(
    Array(5).fill().map(() => Array(5).fill(''))
  );
  
  // State for error message (only for field filling validation)
  const [error, setError] = useState('');

  // Reset textFields when component mounts (new key)
  useEffect(() => {
    setTextFields(Array(5).fill().map(() => Array(5).fill('')));
    setError('');
  }, []);

  // Handle text field changes
  const handleTextFieldChange = (rowIndex, colIndex, value) => {
    const newTextFields = [...textFields];
    newTextFields[rowIndex][colIndex] = value;
    setTextFields(newTextFields);
    setError(''); // Clear error when user starts typing
  };

  // Get input type and constraints for all rows based on form data
  const getConstraints = (colIndex) => {
    switch(colIndex) {
      case 0: // Category - dropdown
        return {
          type: 'select',
          options: [
            { value: '', label: '--Select Category--' },
            { value: 'Electronics', label: 'Electronics' },
            { value: 'Clothing', label: 'Clothing' },
            { value: 'Books', label: 'Books' },
            { value: 'Home & Garden', label: 'Home & Garden' },
            { value: 'Sports', label: 'Sports' },
            { value: 'Toys', label: 'Toys' },
            { value: 'Automotive', label: 'Automotive' },
            { value: 'Health & Beauty', label: 'Health & Beauty' },
            { value: 'Food & Beverages', label: 'Food & Beverages' },
            { value: 'Other', label: 'Other' }
          ]
        };
      case 1: // Gender - text with validation
        return { type: 'text', placeholder: 'male/female/other' };
      case 2: // Age - number
        return { type: 'number', placeholder: 'Enter age' };
      case 3: // Price - number with decimals
        return { type: 'number', step: '0.01', placeholder: 'Enter price' };
      case 4: // Discount - number with decimals
        return { type: 'number', step: '0.01', placeholder: '0-100' };
      default:
        return { type: 'text' };
    }
  };

  // Rendering of the input fields based on constraints
  const renderInputField = (rowIndex, colIndex, value) => {
    const constraints = getConstraints(colIndex);
    
    // Render either a dropdown or input field based on the field type
    if (constraints.type === 'select') {
      // Rendering the dropdown for category selection
      return (
        <select
          className="form-control"
          value={value}
          onChange={(e) => handleTextFieldChange(rowIndex, colIndex, e.target.value)}
        >
          {constraints.options.map((option, idx) => (
            <option key={idx} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
    } else {
      // Rendering the regular input field for other data types
      return (
        <input
          type={constraints.type}
          className="form-control"
          value={value}
          onChange={(e) => handleTextFieldChange(rowIndex, colIndex, e.target.value)}
          placeholder={constraints.placeholder}
          step={constraints.step}
        />
      );
    }
  };

  // Handle submitting the text fields
  const handleSubmit = () => {
    // Check if all fields are filled
    const allFilled = textFields.every(row => 
      row.every(field => field.trim() !== '')
    );
    
    if (!allFilled) {
      setError('Please fill all text fields before submitting!');
      return;
    }

    // Convert the 5x5 grid data into 5 separate entries
    const entries = textFields.map((row, index) => ({
      id: Date.now() + index,
      category: row[0],
      gender: row[1],
      age: row[2],
      price: row[3],
      discount: row[4]
    }));

    onGridSubmit(entries);
  };

  return (
    <div className="mt-4">
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {/* Column Headers */}
      <div className="row mb-3">
        <div className="col-md-2">
          <h6 className="text-center font-weight-bold">Category</h6>
        </div>
        <div className="col-md-2">
          <h6 className="text-center font-weight-bold">Gender</h6>
        </div>
        <div className="col-md-2">
          <h6 className="text-center font-weight-bold">Age</h6>
        </div>
        <div className="col-md-2">
          <h6 className="text-center font-weight-bold">Price</h6>
        </div>
        <div className="col-md-2">
          <h6 className="text-center font-weight-bold">Discount(%)</h6>
        </div>
      </div>

      {textFields.map((row, rowIndex) => (
        <div key={rowIndex} className="row mb-3">
          {row.map((value, colIndex) => (
            <div key={colIndex} className="col-md-2">
              <div className="form-group">
                {renderInputField(rowIndex, colIndex, value)}
              </div>
            </div>
          ))}
        </div>
      ))}
      
      <div className="text-center mt-3">
        <button 
          type="button" 
          className="btn btn-success me-2"
          onClick={handleSubmit}>Submit All Data</button>
        <button 
          type="button" 
          className="btn btn-secondary"
          onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}

export default DataGrid; 