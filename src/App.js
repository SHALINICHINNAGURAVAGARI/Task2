import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProductEntryTable from './components/ProductEntryTable.jsx';
import ProductListPage from './components/ProductListPage.jsx';

function App() {
  const [entries, setEntries] = useState([]);

  // Add a new entry and navigate to list page
  const handleAddEntry = (entry) => {
    setEntries(prev => [...prev, entry]);
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
            element={<ProductListPage entries={entries} />} 
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
