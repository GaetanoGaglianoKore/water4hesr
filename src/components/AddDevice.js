// src/components/AddDevice.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function AddDevice() {
  const [deviceCode, setDeviceCode] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [type, setType] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [zoneId, setZoneId] = useState("");
  const [zones, setZones] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Recupera le zone disponibili per il menu a tendina
  useEffect(() => {
    fetch("http://water4.altervista.org/backend/getZones.php")
      .then((response) => response.json())
      .then((data) => {
        if (data.zones) {
          setZones(data.zones);
          if (data.zones.length > 0) {
            setZoneId(data.zones[0].id_zone);
          }
        }
      })
      .catch((err) => {
        console.error("Errore nel recupero delle zone:", err);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Crea un riepilogo dei dati inseriti
    const summary = `Confermi di voler aggiungere il seguente device?\n\nCodice: ${deviceCode}\nMarca: ${brand}\nModello: ${model}\nTipo: ${type}\nLatitudine: ${latitude}\nLongitudine: ${longitude}\nZona: ${zoneId}`;
    if (!window.confirm(summary)) {
      return;
    }

    try {
      const response = await fetch(
        "http://water4.altervista.org/backend/insertDevice.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            device_code: deviceCode,
            brand: brand,
            model: model,
            type: type,
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
            id_zone: parseInt(zoneId, 10),
          }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        navigate("/admindashboard");
      } else {
        setError(data.error || "Errore nell'inserimento del dispositivo");
      }
    } catch (err) {
      setError("Errore di rete: " + err.message);
    }
  };

  return (
    <div className="container-fluid p-0">
      <Navbar
        title="Aggiungi Device"
        showBackButton={true}
        backLink="/admindashboard"
      />
      <div className="container my-4">
        <h2>Aggiungi Device</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Codice Dispositivo</label>
            <input
              type="text"
              className="form-control"
              value={deviceCode}
              onChange={(e) => setDeviceCode(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Marca</label>
            <input
              type="text"
              className="form-control"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Modello</label>
            <input
              type="text"
              className="form-control"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Tipo</label>
            <input
              type="text"
              className="form-control"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Latitudine</label>
            <input
              type="number"
              step="any"
              className="form-control"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Longitudine</label>
            <input
              type="number"
              step="any"
              className="form-control"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Zona</label>
            <select
              className="form-select"
              value={zoneId}
              onChange={(e) => setZoneId(e.target.value)}
              required
            >
              {zones.map((zone) => (
                <option key={zone.id_zone} value={zone.id_zone}>
                  {zone.zone_name} - {zone.street}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="btn"
            style={{ backgroundColor: "#C1EDCC", color: "#000" }}
          >
            Aggiungi Device
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddDevice;
