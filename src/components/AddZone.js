// src/components/AddZone.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function AddZone() {
  const [zoneName, setZoneName] = useState("");
  const [street, setStreet] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Crea il riepilogo dei dati inseriti
    const summary = `Confermi di voler aggiungere la seguente zona?\n\nNome Zona: ${zoneName}\nVia/Strada: ${street}\nLatitudine: ${latitude}\nLongitudine: ${longitude}`;
    if (!window.confirm(summary)) {
      return; // annulla il submit se l'utente non conferma
    }

    try {
      const response = await fetch(
        "https://water4.altervista.org/backend/insertZone.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            zone_name: zoneName,
            street: street,
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
          }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        navigate("/admindashboard");
      } else {
        setError(data.error || "Errore nell'inserimento della zona");
      }
    } catch (err) {
      setError("Errore di rete: " + err.message);
    }
  };

  return (
    <div className="container-fluid p-0">
      <Navbar
        title="Aggiungi Zona"
        showBackButton={true}
        backLink="/admindashboard"
      />
      <div className="container my-4">
        <h2>Aggiungi Zona</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nome Zona</label>
            <input
              type="text"
              className="form-control"
              value={zoneName}
              onChange={(e) => setZoneName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Via/Strada</label>
            <input
              type="text"
              className="form-control"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
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
          <button
            type="submit"
            className="btn"
            style={{ backgroundColor: "#C1EDCC", color: "#000" }}
          >
            Aggiungi Zona
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddZone;
