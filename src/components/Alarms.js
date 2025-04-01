// src/components/Alarms.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";

function Alarms() {
  const { zonaId } = useParams();
  const [alarms, setAlarms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("current"); // "current" oppure "history"

  useEffect(() => {
    const fetchAlarms = async () => {
      setLoading(true);
      try {
        let url = "";
        if (viewMode === "current") {
          url = "http://water4.altervista.org/backend/getAlarms.php";
        } else {
          url = "http://water4.altervista.org/backend/getAlarmsHistory.php";
        }
        if (zonaId) {
          url += `?zoneId=${zonaId}`;
        }
        const response = await fetch(url);
        const data = await response.json();
        if (data.alarms) {
          setAlarms(data.alarms);
        } else {
          setAlarms([]);
        }
      } catch (error) {
        console.error("Errore nel recupero degli allarmi:", error);
        setAlarms([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAlarms();
  }, [zonaId, viewMode]);

  return (
    <div className="container-fluid p-0">
      <Navbar
        title={zonaId ? `Allarmi Zona ${zonaId}` : "Allarmi"}
        showBackButton={true}
        backLink={zonaId ? `/zona/${zonaId}` : "/dashboard"}
      />
      <div className="container my-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5>
            {zonaId ? "Allarmi per la Zona" : "Allarmi Generali"} -{" "}
            {viewMode === "current" ? "Attivi" : "Storico"}
          </h5>
          <div>
            <button
              className="btn btn-sm me-2"
              style={
                viewMode === "current"
                  ? {
                      backgroundColor: "#C1EDCC",
                      color: "#000",
                      fontWeight: "bold",
                    }
                  : { border: "1px solid #C1EDCC", color: "#C1EDCC" }
              }
              onClick={() => setViewMode("current")}
            >
              Attivi
            </button>
            <button
              className="btn btn-sm"
              style={
                viewMode === "history"
                  ? {
                      backgroundColor: "#C1EDCC",
                      color: "#000",
                      fontWeight: "bold",
                    }
                  : { border: "1px solid #C1EDCC", color: "#C1EDCC" }
              }
              onClick={() => setViewMode("history")}
            >
              Storico
            </button>
          </div>
        </div>
        {loading ? (
          <p>Caricamento...</p>
        ) : alarms.length > 0 ? (
          alarms.map((alarm) => (
            <div
              key={alarm.id_alarm || alarm.id}
              className="card mb-3"
              style={{ backgroundColor: "#304D6D", color: "#fff" }}
            >
              <div className="card-body d-flex align-items-center">
                {/* Icona a sinistra: se è presente id_device → device failure, altrimenti perdita */}
                <div className="me-3">
                  {alarm.id_device ? (
                    <img
                      src="/device_failure.png"
                      alt="Device Failure Icon"
                      style={{ width: "60px", height: "60px" }}
                    />
                  ) : (
                    <img
                      src="/water_leak.png"
                      alt="Leak Icon"
                      style={{ width: "60px", height: "60px" }}
                    />
                  )}
                </div>
                <div>
                  <h6 className="card-title">
                    Allarme {alarm.id_alarm || alarm.id}
                  </h6>
                  <p className="card-text">
                    <strong>Tipo:</strong> {alarm.alarm_type}
                  </p>
                  <p className="card-text">
                    <strong>Livello:</strong> {alarm.alarm_level}
                  </p>
                  <p className="card-text">
                    <strong>Messaggio:</strong> {alarm.description}
                  </p>
                  <p className="card-text">
                    <strong>Open Timestamp:</strong> {alarm.open_timestamp}
                  </p>
                  {viewMode === "history" && alarm.closing_timestamp && (
                    <p className="card-text">
                      <strong>Closing Timestamp:</strong>{" "}
                      {alarm.closing_timestamp}
                    </p>
                  )}
                  {!zonaId && (
                    <>
                      {alarm.id_zone && (
                        <p className="card-text">
                          <strong>Zona:</strong> {alarm.id_zone}
                        </p>
                      )}
                      {alarm.id_device && (
                        <p className="card-text">
                          <strong>Dispositivo:</strong> {alarm.id_device}
                        </p>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted">Nessun allarme da visualizzare.</p>
        )}
      </div>
    </div>
  );
}

export default Alarms;
