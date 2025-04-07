// src/components/AllarmiAdmin.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";

function AllarmiAdmin() {
  const { zonaId } = useParams();
  const [alarms, setAlarms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlarms = async () => {
      try {
        let url = "http://water4.altervista.org/backend/getAlarms.php";
        if (zonaId) {
          url += `?zoneId=${zonaId}`;
        }
        const response = await fetch(url);
        const data = await response.json();
        setAlarms(data.alarms || []);
      } catch (error) {
        console.error("Errore nel recupero degli allarmi:", error);
        setAlarms([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAlarms();
  }, [zonaId]);

  return (
    <div className="container-fluid p-0">
      <Navbar
        title={zonaId ? `Allarmi Admin Zona ${zonaId}` : "Allarmi Admin"}
        showBackButton={true}
        backLink={zonaId ? `/zona/${zonaId}` : "/admindashboard"}
      />
      <div className="container my-4">
        <h5>{zonaId ? "Allarmi per la Zona" : "Allarmi Generali"} - Admin</h5>
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
                {/* Icona a sinistra: se c'è id_device è device failure, altrimenti è una perdita */}
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
                      alt="Water Leak Icon"
                      style={{ width: "60px", height: "60px" }}
                    />
                  )}
                </div>
                <div className="flex-grow-1">
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
                    <strong>Timestamp:</strong> {alarm.open_timestamp}
                  </p>
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
                {/* Pulsante Assegna Intervento */}
                <div>
                  <button
                    className="btn btn-sm"
                    style={{
                      backgroundColor: "#A5DFC2",
                      color: "#000",
                      fontWeight: "bold",
                      padding: "8px 12px",
                    }}
                    onClick={() => {
                      // Aggiungi qui la logica per assegnare l'intervento
                      console.log(
                        "Assegna intervento per allarme",
                        alarm.id_alarm || alarm.id
                      );
                    }}
                  >
                    Assegna Intervento
                  </button>
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

export default AllarmiAdmin;
