import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function ProductListPage({ entries, onUpdateEntry, onDeleteEntry }) {
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showImageDeleteModal, setShowImageDeleteModal] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [editError, setEditError] = useState('');

  // For image deletion
  const [imageDeleted, setImageDeleted] = useState(false);

  const handleView = (entry) => {
    setSelectedEntry(entry);
    setShowViewModal(true);
  };

  const handleImageView = (entry) => {
    setSelectedEntry(entry);
    setShowImageModal(true);
    setImageDeleted(false);
  };

  const handleEdit = (entry) => {
    setSelectedEntry(entry);
    setEditForm({
      category: entry.category || "",
      gender: entry.gender || "",
      price: entry.price !== undefined && entry.price !== null ? String(entry.price) : "",
      discount: entry.discount !== undefined && entry.discount !== null ? String(entry.discount) : ""
    });
    setShowEditModal(true);
  };

  const handleDelete = (entry) => {
    setSelectedEntry(entry);
    setShowDeleteModal(true);
  };

  const handleEditSubmit = () => {
    if (!editForm.price || isNaN(Number(editForm.price)) || Number(editForm.price) <= 0) {
      setEditError("Price must be greater than 0.");
      return;
    }
    if (!editForm.discount || isNaN(Number(editForm.discount)) || Number(editForm.discount) <= 0 || Number(editForm.discount) >= 100) {
      setEditError("Discount must be above 0 and below 100.");
      return;
    }
    setEditError("");
    if (onUpdateEntry && selectedEntry && selectedEntry.id) {
      onUpdateEntry(selectedEntry.id, editForm);
    }
    setShowEditModal(false);
    setSelectedEntry(null);
    setEditForm({});
  };

  const handleDeleteConfirm = () => {
    if (onDeleteEntry && selectedEntry && selectedEntry.id) {
      onDeleteEntry(selectedEntry.id);
    }
    setShowDeleteModal(false);
    setSelectedEntry(null);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  // Image delete modal logic
  const handleImageDelete = () => {
    if (selectedEntry) {
      selectedEntry.image = null;
      setImageDeleted(true);
    }
    setShowImageDeleteModal(false);
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Submitted Products List</h2>
      </div>
      {(!entries || entries.length === 0) ? (
        <div className="alert alert-info">No products submitted yet.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Category</th>
                <th>Gender</th>
                <th>Price</th>
                <th>Discount (%)</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, idx) => (
                <tr key={entry.id}>
                  <td>{idx + 1}</td>
                  <td>{entry.category || 'N/A'}</td>
                  <td>{entry.gender || 'N/A'}</td>
                  <td>{entry.price || 'N/A'}</td>
                  <td>{entry.discount || 'N/A'}</td>
                  <td>
                    {entry.image ? (
                      <>
                        <button className="btn btn-sm btn-outline-info me-1" onClick={() => handleImageView(entry)}>View</button>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => { setSelectedEntry(entry); setShowImageDeleteModal(true); }}>Delete</button>
                      </>
                    ) : 'No Image'}
                  </td>
                  <td>
                    <div className="btn-group" role="group">
                      <button className="btn btn-sm btn-outline-info me-1" onClick={() => handleView(entry)}>View</button>
                      <button className="btn btn-sm btn-outline-warning me-1" onClick={() => handleEdit(entry)}>Edit</button>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(entry)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Image View Modal */}
      {showImageModal && selectedEntry && (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">View Image</h5>
                <button type="button" className="btn-close" onClick={() => setShowImageModal(false)}></button>
              </div>
              <div className="modal-body text-center">
                {selectedEntry.image && !imageDeleted ? (
                  <img src={URL.createObjectURL(selectedEntry.image)} alt="Product" style={{ maxWidth: '100%' }} />
                ) : (
                  <div>No image Found!</div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Image Delete Modal */}
      {showImageDeleteModal && selectedEntry && (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Delete Image</h5>
                <button type="button" className="btn-close" onClick={() => setShowImageDeleteModal(false)}></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete the image?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowImageDeleteModal(false)}>Cancel</button>
                <button type="button" className="btn btn-danger" onClick={handleImageDelete}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {showViewModal && selectedEntry && (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">View Product Details</h5>
                <button type="button" className="btn-close" onClick={() => setShowViewModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6">
                    <p><strong>Category:</strong> {selectedEntry.category}</p>
                    <p><strong>Gender:</strong> {selectedEntry.gender}</p>
                  </div>
                  <div className="col-md-6">
                    <p><strong>Price:</strong> ${selectedEntry.price}</p>
                    <p><strong>Discount:</strong> {selectedEntry.discount}%</p>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowViewModal(false)}>Close</button>
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
              </div>
              {editError && (
                <div className="alert alert-danger" role="alert">
                  {editError}
                </div>
              )}
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
                    <label className="form-label">Price:</label>
                    <input
                      type="number"
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
                <button type="button" className="btn btn-secondary" onClick={() => setShowEditModal(false)}>Cancel</button>
                <button type="button" className="btn btn-primary" onClick={handleEditSubmit}>Save Changes</button>
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
                <button type="button" className="btn-close" onClick={() => setShowDeleteModal(false)}></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this product?</p>
                <p><strong>Category:</strong> {selectedEntry.category}</p>
                <p><strong>Gender:</strong> {selectedEntry.gender}</p>
                <p><strong>Price:</strong> ${selectedEntry.price}</p>
                <p><strong>Discount:</strong> {selectedEntry.discount}%</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>Cancel</button>
                <button type="button" className="btn btn-danger" onClick={handleDeleteConfirm}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductListPage;