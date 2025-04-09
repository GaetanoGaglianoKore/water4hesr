// src/components/AssignIntervention.js
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function AssignIntervention() {
  const { alarmId } = useParams();
  const navigate = useNavigate();

  // Dati statici per l'allarme (puoi modificarli come preferisci)
  const staticAlarm = {
    id_alarm: alarmId,
    alarm_type: "Device Failure",
    alarm_level: "High",
    description: "Il dispositivo non risponde correttamente.",
    open_timestamp: "2025-03-10 14:00:00",
  };

  const [notes, setNotes] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const summary = `Assegni intervento per l'allarme ${staticAlarm.id_alarm} con queste note?\n\nNote: ${notes}`;
    if (window.confirm(summary)) {
      alert("Intervento assegnato con successo!");
      navigate("/admindashboard");
    }
  };

  return (
    <div className="container-fluid p-0">
      <Navbar title="Assegna Intervento" showBackButton={true} backLink="/allarmiadmin" />
      <div className="container my-4">
        <h3>Dettagli Allarme</h3>
        <p>
          <strong>ID Allarme:</strong> {staticAlarm.id_alarm}
        </p>
        <p>
          <strong>Tipo:</strong> {staticAlarm.alarm_type}
        </p>
        <p>
          <strong>Livello:</strong> {staticAlarm.alarm_level}
        </p>
        <p>
          <strong>Messaggio:</strong> {staticAlarm.description}
        </p>
        <p>
          <strong>Timestamp:</strong> {staticAlarm.open_timestamp}
        </p>
        <hr />
        <h4>Assegna Intervento</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Note Intervento</label>
            <textarea
              className="form-control"
              rows="3"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              required
            ></textarea>
          </div>
          <button type="submit" className="btn" style={{ backgroundColor: "#C1EDCC", color: "#000" }}>
            Assegna Intervento
          </button>
        </form>
      </div>
    </div>
  );
}

export default AssignIntervention;
