import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function Dashboard() {
  const [zones, setZones] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const map = L.map('mapid').setView([37.567, 14.285], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
    fetch('http://water4.altervista.org/backend/getZones.php')
      .then(response => response.json())
      .then(data => {
        setZones(data.zones);
        data.zones.forEach(zone => {
          L.marker([zone.longitude, zone.latitude]).addTo(map)
            .bindPopup(`<strong>${zone.zone_name}</strong><br>${zone.street}`);
        });
      })
      .catch(err => console.error("Errore nel recupero delle zone: ", err));
    return () => { map.remove(); };
  }, []);

  return (
    <div className="container-fluid p-0">
      <nav className="navbar">
        <div className="navbar-left">
          <button className="logout-btn" onClick={() => navigate("/")}>
            <span className="logout-icon">⎋</span>
          </button>
          <span className="navbar-brand">Dashboard</span>
        </div>
        <div className="navbar-right">
          <div className="menu-dots">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
          <div className="user-initials">AB</div>
        </div>
      </nav>
      <div className="container my-4 px-3">
        <h2 className="h5">Mappa zone rete idrica</h2>
        <div id="mapid" className="rounded"></div>
        <h2 className="h5 mt-4">Zone</h2>
        {zones.map(zone => (
          <div key={zone.id_zone} className="card mb-3 zone-card" style={{ backgroundColor: '#304D6D' }}>
            <div className="card-body d-flex align-items-center text-white">
              <div className="flex-grow-1">{zone.zone_name} - {zone.street}</div>
              <div className="status-wrapper">
                <div className={`status-indicator status-${zone.status.toLowerCase()}`}></div>
              </div>
              <div className="zone-action">
                <Link to={`/zona/${zone.id_zone}`} className="btn btn-light btn-sm" style={{ backgroundColor: '#C1EDCC' }}>
                  Vai
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;