// src/components/Dashboard.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import Navbar from "./Navbar";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function Dashboard() {
  const [zones, setZones] = useState([]);

  useEffect(() => {
    const map = L.map("mapid").setView([37.567, 14.285], 13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);
    fetch("http://water4.altervista.org/backend/getZones.php")
      .then((response) => response.json())
      .then((data) => {
        setZones(data.zones);
        data.zones.forEach((zone) => {
          L.marker([zone.latitude, zone.longitude])
            .addTo(map)
            .bindPopup(`<strong>${zone.zone_name}</strong><br>${zone.street}`);
        });
      })
      .catch((err) => console.error("Errore nel recupero delle zone: ", err));
    return () => {
      map.remove();
    };
  }, []);

  return (
    <div className="container-fluid p-0">
      <Navbar title="Dashboard" showLogout={true} />
      <div className="container my-4 px-3">
        <h2 className="h5">Mappa zone rete idrica</h2>
        <div id="mapid" className="rounded"></div>
        <h2 className="h5 mt-4">Zone</h2>
        {zones.map((zone) => (
          <div
            key={zone.id_zone}
            className="card mb-3 zone-card"
            style={{
              backgroundColor: "#304D6D",
              width: "100%",
              maxWidth: "100%",
            }}
          >
            <div className="card-body d-flex align-items-center text-white">
              <div className="status-wrapper me-3">
                <div
                  className={`status-indicator status-${zone.status.toLowerCase()}`}
                ></div>
              </div>
              <div className="flex-grow-1">
                {zone.zone_name} - {zone.street}
              </div>
              <Link
                to={`/zona/${zone.id_zone}`}
                className="btn btn-light btn-sm"
                style={{ backgroundColor: "#C1EDCC" }}
              >
                <img
                  src="/forward.png"
                  alt="Forward"
                  style={{ width: "24px", height: "24px" }}
                />
              </Link>
            </div>
          </div>
        ))}
        <div className="d-flex justify-content-center mt-4">
          <Link to="/alarms" className="btn btn-lg btn-alarm">
            ALLARMI
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
