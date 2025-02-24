// src/components/Zona.js
import React, { useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

function Zona() {
  const { zonaId } = useParams();
  const mapRef = useRef(null); // Conserva l'istanza della mappa

  useEffect(() => {
    // Inizializza la mappa solo se non è già stata creata
    if (!mapRef.current) {
      mapRef.current = L.map('mapidZona').setView([37.567, 14.285], 14);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(mapRef.current);
      L.marker([37.567, 14.285]).addTo(mapRef.current)
        .bindPopup(`Zona ${zonaId}`)
        .openPopup();
    }
    // Se vuoi aggiornare la popup in base al zonaId, potresti farlo qui.
  }, [zonaId]);

  // Lista statica dei device
  const devices = [
    { id: 'PUMP1', timestamp: '12:34:36', rul: 'RUL' },
    { id: 'VALVE1', timestamp: '14:00:12', rul: 'RUL' }
  ];

  return (
    <div className="container-fluid p-0">
      {/* Navbar */}
      <nav className="navbar px-3">
        <Link to="/dashboard" className="btn back-btn me-2" style={{ backgroundColor: '#C1EDCC', color: '#000' }}>
          &#8592;
        </Link>
        <span className="navbar-brand">Zona {zonaId}</span>
        <div className="d-flex align-items-center ms-auto">
          <div className="user-avatar"></div>
          <div className="menu-dots ms-2">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        </div>
      </nav>

      {/* Contenuto */}
      <div className="container my-4 px-3">
        <h2 className="h6 mb-2">Mappa zona</h2>
        <div id="mapidZona" className="rounded"></div>

        <h2 className="h6 mt-4 mb-2">Lista device in zona</h2>
        {devices.map((device, index) => (
          <div key={index} className="card mb-3" style={{ backgroundColor: '#304D6D' }}>
            <div className="card-body d-flex align-items-center text-white">
              <div className="flex-grow-1">
                {device.timestamp} - {device.id}
              </div>
              <span className="badge bg-danger me-2">{device.rul}</span>
              <Link to={`/componente/${device.id}`} className="btn btn-outline-light btn-sm me-2">
                i
              </Link>
              <Link to={`/intervento/${device.id}`} className="btn btn-outline-light btn-sm">
                ⚙
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Zona;
