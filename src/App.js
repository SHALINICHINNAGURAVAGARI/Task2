import React, { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import ProductEntryTable from './components/ProductEntryTable.jsx';
import ProductListPage from './components/ProductListPage.jsx';

function App() {
  const [entries, setEntries] = useState([]);
  const navigate = useNavigate();

  const handleAddEntry = (entry) => {
    const newEntry = {
      ...entry,
      id: Date.now() + Math.random() // Create unique ID
    };
    setEntries(prevEntries => [...prevEntries, newEntry]);
  };

  const handleUpdateEntry = (id, updatedData) => {
    setEntries(prevEntries =>
      prevEntries.map(entry =>
        entry.id === id ? { ...entry, ...updatedData } : entry
      )
    );
  };

  const handleDeleteEntry = (id) => {
    setEntries(prevEntries =>
      prevEntries.filter(entry => entry.id !== id)
    );
  };

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={<ProductEntryTable onAdd={handleAddEntry} navigate={navigate} />}
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
  );
}

export default App;
