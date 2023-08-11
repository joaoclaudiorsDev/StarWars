import React from 'react';
import './App.css';
import PlanetsApi from './components/PlanetsApi';
import PlanetsApiWithProvider from './components/PlanetsApiWithProvider';
import Table from './components/Table';

function App() {
  return (
    <div>
      <PlanetsApiWithProvider />
    </div>
  );
}

export default App;
