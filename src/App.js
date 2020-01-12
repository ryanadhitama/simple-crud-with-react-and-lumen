import React from 'react';
import './App.css';
import List from './component/List';

function App() {
  return (
    <div className="container">
      <br />
      <div className="row">
        <div className="col-md-6 mx-auto">
          <h1 className="text-center">Catatanmu</h1>
          <List />
        </div>
      </div>
    </div>
  );
}

export default App;
