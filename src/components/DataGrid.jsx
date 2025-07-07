import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function DataGrid({ rows, onRowChange }) {
  const getConstraints = (colIndex) => {
    switch(colIndex) {
      case 0:
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
      case 1:
        return { type: 'text', placeholder: 'male/female/other' };
      case 2:
        return { type: 'number', placeholder: 'Enter age' };
      case 3:
        return { type: 'number', step: '0.01', placeholder: 'Enter price' };
      case 4:
        return { type: 'number', step: '0.01', placeholder: '0-100' };
      default:
        return { type: 'text' };
    }
  };

  const renderInputField = (rowIndex, colIndex, value) => {
    const constraints = getConstraints(colIndex);
    const fieldNames = ['category', 'gender', 'age', 'price', 'discount'];
    const field = fieldNames[colIndex];
    if (constraints.type === 'select') {
      return (
        <select
          className="form-control"
          value={value}
          onChange={e => onRowChange(rowIndex, field, e.target.value)}
        >
          {constraints.options.map((option, idx) => (
            <option key={idx} value={option.value}>{option.label}</option>
          ))}
        </select>
      );
    } else {
      return (
        <input
          type={constraints.type}
          className="form-control"
          value={value}
          onChange={e => onRowChange(rowIndex, field, e.target.value)}
          onKeyDown={e => {
            if (constraints.type === 'number' && (e.key === 'e' || e.key === 'E')) {
              e.preventDefault();
            }
          }}
          placeholder={constraints.placeholder}
          step={constraints.step}
        />
      );
    }
  };

  return (
    <div className="mt-4">
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
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="row mb-3">
          {Object.values(row).map((value, colIndex) => (
            <div key={colIndex} className="col-md-2">
              <div className="form-group">
                {renderInputField(rowIndex, colIndex, value)}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default DataGrid;
