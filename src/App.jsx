import React, { useState } from 'react';
import RuralHealthConnect from './rural_health_connect';
import PHCHub from './phc_hub';
import DoctorPortal from './doctor_portal'; 
import './App.css';

function App() {
  const [currentApp, setCurrentApp] = useState('rural');

  const renderCurrentApp = () => {
    switch(currentApp) {
      case 'rural':
        return <RuralHealthConnect />;
      case 'phc':
        return <PHCHub />;
      case 'doctor':
        return <DoctorPortal />;
      default:
        return <RuralHealthConnect />;
    }
  };

  return (
    <div className="App">
      <div className="app-switcher">
        <button 
          onClick={() => setCurrentApp('rural')}
          className={`switcher-btn ${currentApp === 'rural' ? 'active-rural' : ''}`}
        >
          Rural Health
        </button>
        <button 
          onClick={() => setCurrentApp('phc')}
          className={`switcher-btn ${currentApp === 'phc' ? 'active-phc' : ''}`}
        >
          PHC Hub
        </button>
        <button 
          onClick={() => setCurrentApp('doctor')}
          className={`switcher-btn ${currentApp === 'doctor' ? 'active-doctor' : ''}`}
        >
          Doctor Portal
        </button>
      </div>
      
      {renderCurrentApp()}
    </div>
  );
}

export default App;