import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

class ProductListPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showViewModal: false,
      showEditModal: false,
      showDeleteModal: false,
      selectedEntry: null,
      editForm: {},
      editError: ''
    };
    this.handleView = this.handleView.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEditSubmit = this.handleEditSubmit.bind(this);
    this.handleDeleteConfirm = this.handleDeleteConfirm.bind(this);
    this.handleEditChange = this.handleEditChange.bind(this);
  }

  handleView(entry) {
    this.setState({ selectedEntry: entry, showViewModal: true });
  }

  handleEdit(entry) {
    this.setState({
      selectedEntry: entry,
      editForm: {
        category: entry.category || "",
        gender: entry.gender || "",
        age: entry.age !== undefined && entry.age !== null ? String(entry.age) : "",
        price: entry.price !== undefined && entry.price !== null ? String(entry.price) : "",
        discount: entry.discount !== undefined && entry.discount !== null ? String(entry.discount) : ""
      },
      showEditModal: true
    });
  }

  handleDelete(entry) {
    this.setState({ selectedEntry: entry, showDeleteModal: true });
  }

  handleEditSubmit() {
    const { editForm, selectedEntry } = this.state;
    // Validation
    if (!editForm.age || isNaN(Number(editForm.age)) || Number(editForm.age) <= 0) {
      this.setState({ editError: "Age must be greater than 0." });
      return;
    }
    if (!editForm.price || isNaN(Number(editForm.price)) || Number(editForm.price) <= 0) {
      this.setState({ editError: "Price must be greater than 0." });
      return;
    }
    if (!editForm.discount || isNaN(Number(editForm.discount)) || Number(editForm.discount) <= 0 || Number(editForm.discount) >= 100) {
      this.setState({ editError: "Discount must be above 0 and below 100." });
      return;
    }
    this.setState({ editError: "" });
    if (this.props.onUpdateEntry && selectedEntry && selectedEntry.id) {
      this.props.onUpdateEntry(selectedEntry.id, editForm);
    }
    this.setState({ showEditModal: false, selectedEntry: null, editForm: {} });
  }

  handleDeleteConfirm() {
    const { selectedEntry } = this.state;
    if (this.props.onDeleteEntry && selectedEntry && selectedEntry.id) {
      this.props.onDeleteEntry(selectedEntry.id);
    }
    this.setState({ showDeleteModal: false, selectedEntry: null });
  }

  handleEditChange(e) {
    const { name, value } = e.target;
    this.setState(prevState => ({
      editForm: { ...prevState.editForm, [name]: value }
    }));
  }

  render() {
    const safeEntries = Array.isArray(this.props.entries) ? this.props.entries : [];
    const { showViewModal, showEditModal, showDeleteModal, selectedEntry, editForm, editError } = this.state;
    return (
      <div className="container mt-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Submitted Products List</h2>
          <button
            className="btn btn-outline-primary"
            onClick={() => { window.location.href = '/'; }}>
            Add New Product
          </button>
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
                  <tr key={entry.id}>
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
                          onClick={() => this.handleView(entry)}>View</button>
                        <button
                          className="btn btn-sm btn-outline-warning me-1"
                          onClick={() => this.handleEdit(entry)}>Edit</button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => this.handleDelete(entry)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
                    onClick={() => this.setState({ showViewModal: false })}></button>
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
                    onClick={() => this.setState({ showViewModal: false })}>Close</button>
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
                {/* Alert below heading */}
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
                        onChange={this.handleEditChange}
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
                        onChange={this.handleEditChange}
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
                        onChange={e => {
                          const filtered = e.target.value.replace(/[eE]/g, '');
                          this.setState(prevState => ({
                            editForm: { ...prevState.editForm, [e.target.name]: filtered }
                          }));
                        }}
                        onKeyDown={e => {
                          if (e.key === 'e' || e.key === 'E') {
                            e.preventDefault();
                          }
                        }}
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
                        onChange={e => {
                          const filtered = e.target.value.replace(/[eE]/g, '');
                          this.setState(prevState => ({
                            editForm: { ...prevState.editForm, [e.target.name]: filtered }
                          }));
                        }}
                        onKeyDown={e => {
                          if (e.key === 'e' || e.key === 'E') {
                            e.preventDefault();
                          }
                        }}
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
                        onChange={e => {
                          const filtered = e.target.value.replace(/[eE]/g, '');
                          this.setState(prevState => ({
                            editForm: { ...prevState.editForm, [e.target.name]: filtered }
                          }));
                        }}
                        onKeyDown={e => {
                          if (e.key === 'e' || e.key === 'E') {
                            e.preventDefault();
                          }
                        }}
                        placeholder="0-100"
                      />
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => this.setState({ showEditModal: false })}>Cancel</button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={this.handleEditSubmit}>Save Changes</button>
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
                    onClick={() => this.setState({ showDeleteModal: false })}></button>
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
                    onClick={() => this.setState({ showDeleteModal: false })}>Cancel</button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={this.handleDeleteConfirm}>Delete</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default ProductListPage;