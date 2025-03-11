import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Importa i componenti
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Zona from "./components/Zona";
import Intervento from "./components/Intervento";
import DettagliComponente from "./components/DettagliComponente";
import Footer from "./components/Footer";

// Importa il tuo CSS globale
import "./styles.css";

function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/zona/:zonaId" element={<Zona />} />
          <Route path="/intervento/:deviceId" element={<Intervento />} />
          <Route path="/componente/:deviceId" element={<DettagliComponente />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
