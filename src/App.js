import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import ProductEntryTable from './components/ProductEntryTable.jsx';
import ProductListPage from './components/ProductListPage.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entries: []
    };
    this.handleAddEntry = this.handleAddEntry.bind(this);
    this.handleUpdateEntry = this.handleUpdateEntry.bind(this);
    this.handleDeleteEntry = this.handleDeleteEntry.bind(this);
  }

  handleAddEntry(entry) {
    const newEntry = {
      ...entry,
      id: Date.now() + Math.random() // Create unique ID
    };
    this.setState(prevState => ({
      entries: [...prevState.entries, newEntry]
    }));
  }

  handleUpdateEntry(id, updatedData) {
    this.setState(prevState => ({
      entries: prevState.entries.map(entry =>
        entry.id === id ? { ...entry, ...updatedData } : entry
      )
    }));
  }

  handleDeleteEntry(id) {
    this.setState(prevState => ({
      entries: prevState.entries.filter(entry => entry.id !== id)
    }));
  }

  render() {
    return (
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={<ProductEntryTable onAdd={this.handleAddEntry} navigate={this.props.navigate} />}
          />
          <Route
            path="/details"
            element={
              <ProductListPage
                entries={this.state.entries}
                onUpdateEntry={this.handleUpdateEntry}
                onDeleteEntry={this.handleDeleteEntry}
              />
            }
          />
          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />
        </Routes>
      </div>
    );
  }
}

function AppWrapper() {
  const navigate = useNavigate();
  return <App navigate={navigate} />;
}

export default AppWrapper;
