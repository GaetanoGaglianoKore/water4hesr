import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importa i componenti
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Zona from './components/Zona';
import Intervento from './components/Intervento';
import DettagliComponente from './components/DettagliComponente';

// Importa il tuo CSS globale
import './styles.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/zona/:zonaId" element={<Zona />} />
        <Route path="/intervento/:deviceName" element={<Intervento />} />
        <Route path="/componente/:deviceName" element={<DettagliComponente />} />
      </Routes>
    </Router>
  );
}

export default App;
