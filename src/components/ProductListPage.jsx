import React from 'react';
import {useNavigate} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function ProductListPage({ entries }) {
  const navigate = useNavigate();
  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Submitted Products</h2>
        <button 
          className="btn btn-outline-primary"
          onClick={() => navigate('/')}>Add New Product</button>
      </div>
      {entries.length === 0 ? (
        <div className="alert alert-info">No products submitted yet.</div>
      ) : (
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Category</th>
              <th>Gender</th>
              <th>Age</th>
              <th>Price</th>
              <th>Discount (%)</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry, idx) => (
              <tr key={entry.id || idx}>
                <td>{entry.category}</td>
                <td>{entry.gender}</td>
                <td>{entry.age}</td>
                <td>{entry.price}</td>
                <td>{entry.discount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
export default ProductListPage; 