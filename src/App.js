import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProductEntryTable from './components/ProductEntryTable.jsx';
import ProductListPage from './components/ProductListPage.jsx';

function App() {
  const [entries, setEntries] = useState([]);

  // Add a new entry and navigate to list page
  const handleAddEntry = (entry) => {
    setEntries(prevEntries => [...prevEntries, entry]);
  };

  // Update an existing entry
  const handleUpdateEntry = (id, updatedData) => {
    setEntries(prevEntries => 
      prevEntries.map(entry => 
        entry.id === id ? { ...entry, ...updatedData } : entry
      )
    );
  };

  // Delete an entry
  const handleDeleteEntry = (id) => {
    setEntries(prevEntries => 
      prevEntries.filter(entry => entry.id !== id)
    );
  };

  return (
    <Router>
    <div className="App">
        <Routes>
          <Route 
            path="/" 
            element={<ProductEntryTable onAdd={handleAddEntry} />} 
          />
          <Route 
            path="/details" 
            element={
              <ProductListPage 
                entries={entries} 
                onUpdateEntry={handleUpdateEntry}
                onDeleteEntry={handleDeleteEntry}
              />
            } 
          />
          <Route 
            path="*" 
            element={<Navigate to="/" replace />} 
          />
        </Routes>
    </div>
    </Router>
  );
}

export default App;
