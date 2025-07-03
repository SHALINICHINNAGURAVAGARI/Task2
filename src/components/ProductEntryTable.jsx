import React from 'react';
import DataGrid from './DataGrid.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

class ProductEntryTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      gridError: ''
    };
    this.handleAddRow = this.handleAddRow.bind(this);
    this.handleRowChange = this.handleRowChange.bind(this);
    this.handleSubmitAll = this.handleSubmitAll.bind(this);
  }

  isRowValid(row) {
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
  }

  isLastRowValid() {
    if (this.state.rows.length === 0) return true;
    return this.isRowValid(this.state.rows[this.state.rows.length - 1]);
  }

  handleAddRow() {
    this.setState(prevState => ({
      rows: [...prevState.rows, { category: '', gender: '', age: '', price: '', discount: '' }],
      gridError: ''
    }));
  }

  handleRowChange(index, field, value) {
    this.setState(prevState => {
      const newRows = prevState.rows.map((row, i) =>
        i === index ? { ...row, [field]: value } : row
      );
      return { rows: newRows, gridError: '' };
    });
  }

  handleSubmitAll() {
    const { rows } = this.state;
    for (let i = 0; i < rows.length; i++) {
      const entry = rows[i];
      if (!entry.category || !entry.gender || !entry.age || !entry.price || !entry.discount) {
        this.setState({ gridError: 'Please fill all fields in every row before submitting!' });
        return;
      } else if (isNaN(parseInt(entry.age)) || parseInt(entry.age) <= 0) {
        this.setState({ gridError: 'Please enter age > 0 in all rows!' });
        return;
      } else if (isNaN(parseFloat(entry.price)) || parseFloat(entry.price) <= 0) {
        this.setState({ gridError: 'Please enter price > 0 in all rows!' });
        return;
      } else if (isNaN(parseFloat(entry.discount)) || parseFloat(entry.discount) <= 0 || parseFloat(entry.discount) > 100) {
        this.setState({ gridError: 'Please enter discount > 0 and <= 100 in all rows!' });
        return;
      } else {
        const gender = entry.gender ? entry.gender.trim().toLowerCase() : '';
        const validGenders = ['male', 'female', 'other'];
        if (!validGenders.includes(gender)) {
          this.setState({ gridError: 'Please enter female, male or other for gender in all rows!' });
          return;
        }
      }
    }
    // Submit all rows
    rows.forEach(entry => this.props.onAdd(entry));
    this.setState({ rows: [], gridError: '' });
    this.props.navigate('/details');
  }

  render() {
    return (
      <div className="container mt-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div></div>
          <h1 className="text-center">Product Entry Table</h1>
          <div style={{ width: '100px' }}>
            <button
              type="button"
              className="btn btn-primary btn-lg"
              onClick={this.handleAddRow}
              disabled={!this.isLastRowValid()}>Add</button>
          </div>
        </div>
        {this.state.gridError && (
          <div className="alert alert-danger" role="alert">
            {this.state.gridError}
          </div>
        )}
        <DataGrid
          rows={this.state.rows}
          onRowChange={this.handleRowChange}
        />
        {this.state.rows.length > 0 && (
          <div className="text-center mt-3">
            <button
              type="button"
              className="btn btn-success me-2"
              onClick={this.handleSubmitAll}>Submit All</button>
          </div>
        )}
      </div>
    );
  }
}

export default ProductEntryTable; 
 