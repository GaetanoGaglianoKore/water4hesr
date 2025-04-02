// src/components/Zona.js
import React, { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Navbar from "./Navbar";

function Zona() {
  const { zonaId } = useParams();
  const [devices, setDevices] = useState([]);
  const mapRef = useRef(null);

  useEffect(() => {
    fetch(
      `http://water4.altervista.org/backend/getZonesDev.php?zoneId=${zonaId}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.zone) {
          if (!mapRef.current) {
            mapRef.current = L.map("mapidZona").setView(
              [data.zone.latitude, data.zone.longitude],
              14
            );
            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
              attribution: "&copy; OpenStreetMap contributors",
            }).addTo(mapRef.current);
          }
          if (data.devices && Array.isArray(data.devices)) {
            data.devices.forEach((device) => {
              // Assicurati di passare prima latitude poi longitude
              if (device.latitude && device.longitude) {
                L.marker([device.latitude, device.longitude])
                  .addTo(mapRef.current)
                  .bindPopup(
                    `<strong>${device.device_code}</strong><br>${device.brand} - ${device.model}`
                  );
              }
            });
          }
          setDevices(data.devices || []);
        } else {
          console.error("Zona non trovata per l'ID fornito.");
        }
      })
      .catch((err) =>
        console.error("Errore nel recupero dei dati della zona: ", err)
      );
  }, [zonaId]);

  return (
    <div className="container-fluid p-0">
      <Navbar
        title={`Zona ${zonaId}`}
        showBackButton={true}
        backLink="/dashboard"
      />
      <div className="container my-4 px-3">
        <h2 className="h6 mb-2">Mappa zona</h2>
        <div id="mapidZona" className="rounded"></div>
        {/* Pulsante Allarmi Zona */}
        <div className="d-flex justify-content-center mt-3 mb-3">
          <Link
            to={`/zona/${zonaId}/alarms`}
            className="btn btn-lg"
            style={{
              backgroundColor: "#C1EDCC",
              color: "#000",
              fontWeight: "bold",
              padding: "12px 30px",
              fontSize: "1.1rem",
            }}
          >
            Allarmi zona
          </Link>
        </div>
        <h2 className="h6 mt-4 mb-2">Lista device in zona</h2>
        {devices && devices.length > 0 ? (
          devices.map((device) => (
            <div
              key={device.id_device}
              className="card mb-3"
              style={{ backgroundColor: "#304D6D" }}
            >
              <div className="card-body d-flex align-items-center text-white">
                <div className="status-wrapper me-3">
                  <div
                    className={`status-indicator status-${device.status.toLowerCase()}`}
                  ></div>
                </div>
                <div className="flex-grow-1">
                  {device.device_code} - {device.brand} - {device.model} (
                  {device.type})
                </div>
                <Link
                  to={`/componente/${device.id_device}`}
                  className="btn btn-sm me-2"
                  style={{ backgroundColor: "#A5DFC2", color: "#000" }}
                >
                  <img
                    src="/info.png"
                    alt="Info"
                    style={{ width: "40px", height: "40px" }}
                  />
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted">
            Nessun dispositivo presente in questa zona.
          </p>
        )}
      </div>
    </div>
  );
}

export default Zona;
