// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Importa i componenti
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Zona from "./components/Zona";
import Intervento from "./components/Intervento";
import DettagliComponente from "./components/DettagliComponente";
import AdminDashboard from "./components/AdminDashboard";
import Alarms from "./components/Alarms";
import AllarmiAdmin from "./components/AllarmiAdmin";
import AddZone from "./components/AddZone";
import AddDevice from "./components/AddDevice";
import AssignIntervention from "./components/AssignIntervention";

import "./styles.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/zona/:zonaId" element={<Zona />} />
        <Route path="/intervento/:deviceName" element={<Intervento />} />
        <Route path="/componente/:deviceId" element={<DettagliComponente />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/allarmiadmin" element={<AllarmiAdmin />} />
        <Route path="/alarms" element={<Alarms />} />
        <Route path="/zona/:zonaId/alarms" element={<Alarms />} />
        <Route path="/addzone" element={<AddZone />} />
        <Route path="/adddevice" element={<AddDevice />} />
        <Route path="/assignment" element={<AssignIntervention/>} />

      </Routes>
    </Router>
  );
}

export default App;
