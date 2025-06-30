import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function ProductListPage({ entries, onUpdateEntry, onDeleteEntry }) {
  const navigate = useNavigate();
  
  // Ensure entries is always an array
  const safeEntries = Array.isArray(entries) ? entries : [];
  
  // State for modals
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [gridError, setGridError] = useState('');

  // Handle view button click
  const handleView = (entry) => {
    setSelectedEntry(entry);
    setShowViewModal(true);
  };

  // Handle edit button click
  const handleEdit = (entry) => {
    setSelectedEntry(entry);
    setEditForm({
      category: entry.category,
      gender: entry.gender,
      age: entry.age,
      price: entry.price,
      discount: entry.discount
    });
    setShowEditModal(true);
  };

  // Handle delete button click
  const handleDelete = (entry) => {
    setSelectedEntry(entry);
    setShowDeleteModal(true);
  };

  // Handle edit form submission
  const handleEditSubmit = () => {
    if (onUpdateEntry && selectedEntry) {
      onUpdateEntry(selectedEntry.id, editForm);
    }
    setShowEditModal(false);
    setSelectedEntry(null);
    setEditForm({});
  };

  // Handle delete confirmation
  const handleDeleteConfirm = () => {
    if (onDeleteEntry && selectedEntry) {
      onDeleteEntry(selectedEntry.id);
    }
    setShowDeleteModal(false);
    setSelectedEntry(null);
  };

  // Handle input changes for edit form
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Submitted Products List</h2>
        <button 
          className="btn btn-outline-primary"
          onClick={() => navigate('/')}>Add New Product</button>
      </div>
      
      {safeEntries.length === 0 ? (
        <div className="alert alert-info">No products submitted yet.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Category</th>
                <th>Gender</th>
                <th>Age</th>
                <th>Price</th>
                <th>Discount (%)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {safeEntries.map((entry, idx) => (
                <tr key={entry.id || idx}>
                  <td>{idx + 1}</td>
                  <td>{entry.category || 'N/A'}</td>
                  <td>{entry.gender || 'N/A'}</td>
                  <td>{entry.age || 'N/A'}</td>
                  <td>{entry.price || 'N/A'}</td>
                  <td>{entry.discount || 'N/A'}</td>
                  <td>
                    <div className="btn-group" role="group">
                      <button 
                        className="btn btn-sm btn-outline-info me-1"
                        onClick={() => handleView(entry)}>View</button>
                      <button 
                        className="btn btn-sm btn-outline-warning me-1"
                        onClick={() => handleEdit(entry)}>Edit</button>
                      <button 
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(entry)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {gridError && (
        <div className="alert alert-danger" role="alert">
          {gridError}
        </div>
      )}

      {/* View Modal */}
      {showViewModal && selectedEntry && (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">View Product Details</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowViewModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6">
                    <p><strong>Category:</strong> {selectedEntry.category}</p>
                    <p><strong>Gender:</strong> {selectedEntry.gender}</p>
                    <p><strong>Age:</strong> {selectedEntry.age}</p>
                  </div>
                  <div className="col-md-6">
                    <p><strong>Price:</strong> ${selectedEntry.price}</p>
                    <p><strong>Discount:</strong> {selectedEntry.discount}%</p>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setShowViewModal(false)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && selectedEntry && (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Product</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowEditModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Category:</label>
                    <select
                      className="form-control"
                      name="category"
                      value={editForm.category}
                      onChange={handleEditChange}
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
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Gender:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="gender"
                      value={editForm.gender}
                      onChange={handleEditChange}
                      placeholder="male/female/other"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Age:</label>
                    <input
                      type="number"
                      className="form-control"
                      name="age"
                      value={editForm.age}
                      onChange={handleEditChange}
                      placeholder="Enter age"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Price:</label>
                    <input
                      type="number"
                      step="1"
                      className="form-control"
                      name="price"
                      value={editForm.price}
                      onChange={handleEditChange}
                      placeholder="Enter price"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Discount (%):</label>
                    <input
                      type="number"
                      step="0.01"
                      className="form-control"
                      name="discount"
                      value={editForm.discount}
                      onChange={handleEditChange}
                      placeholder="0-100"
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setShowEditModal(false)}>Cancel</button>
                <button 
                  type="button" 
                  className="btn btn-primary" 
                  onClick={handleEditSubmit}>Save Changes</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && selectedEntry && (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowDeleteModal(false)}></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this product?</p>
                <p><strong>Category:</strong> {selectedEntry.category}</p>
                <p><strong>Gender:</strong> {selectedEntry.gender}</p>
                <p><strong>Age:</strong> {selectedEntry.age}</p>
                <p><strong>Price:</strong> ${selectedEntry.price}</p>
                <p><strong>Discount:</strong> {selectedEntry.discount}%</p>
              
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setShowDeleteModal(false)}>Cancel</button>
                <button 
                  type="button" 
                  className="btn btn-danger" 
                  onClick={handleDeleteConfirm}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default ProductListPage; 