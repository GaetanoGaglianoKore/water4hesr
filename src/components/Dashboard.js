// src/components/Dashboard.js
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

function Dashboard() {
  useEffect(() => {
    // Inizializza la mappa nel div con id "mapid"
    const map = L.map('mapid').setView([37.567, 14.285], 13);

    // Aggiungi il layer OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Aggiungi un marker al centro della mappa con popup
    L.marker([37.567, 14.285]).addTo(map)
      .bindPopup("Mappa zone rete idrica")
      .openPopup();

    // Pulizia: rimuovi la mappa quando il componente viene smontato
    return () => {
      map.remove();
    };
  }, []);

  return (
    <div className="container-fluid p-0">
      <nav className="navbar">
        <span className="navbar-brand mb-0 h1">Dashboard</span>
        <div className="d-flex align-items-center">
          <div className="user-avatar"></div>
          <div className="menu-dots ms-2">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        </div>
      </nav>

      <div className="container my-4 px-3">
        <h2 className="h5">Mappa zone rete idrica</h2>
        <div id="mapid" className="rounded"></div>

        <h2 className="h5 mt-4">Zone</h2>
        <div className="card mb-3" style={{ backgroundColor: '#304D6D' }}>
          <div className="card-body d-flex align-items-center text-white">
            <div className="status-indicator red me-3"></div>
            <div className="flex-grow-1">Zona 1 - 12:34:36 - PUMP1</div>
            <Link to="/zona/1" className="btn btn-light btn-sm" style={{ backgroundColor: '#C1EDCC' }}>
              Vai
            </Link>
          </div>
        </div>
        <div className="card mb-3" style={{ backgroundColor: '#304D6D' }}>
          <div className="card-body d-flex align-items-center text-white">
            <div className="status-indicator yellow me-3"></div>
            <div className="flex-grow-1">Zona 2 - 14:00:12 - VALVE1</div>
            <Link to="/zona/2" className="btn btn-light btn-sm" style={{ backgroundColor: '#C1EDCC' }}>
              Vai
            </Link>
          </div>
        </div>

        <Link to="/" className="btn btn-outline-secondary">Logout</Link>
      </div>
    </div>
  );
}

export default Dashboard;