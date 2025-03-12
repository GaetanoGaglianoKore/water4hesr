// src/components/DettagliComponente.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";

function DettagliComponente() {
  const { deviceId } = useParams();
  const [device, setDevice] = useState(null);
  const [paramsData, setParamsData] = useState([]);
  const [paramsHistory, setParamsHistory] = useState([]);
  const [selectedHistory, setSelectedHistory] = useState(null);
  const [viewMode, setViewMode] = useState("current"); // "current" or "history"
  const [loading, setLoading] = useState(true);
  const [historyLoading, setHistoryLoading] = useState(false);

  useEffect(() => {
    const fetchDeviceDetails = async () => {
      try {
        const res = await fetch(`http://water4.altervista.org/backend/getComponentDetails.php?deviceId=${deviceId}`);
        const data = await res.json();
        if (data.device) {
          setDevice(data.device);
          setParamsData(data.params || []);
        } else {
          console.error("Errore:", data.error);
        }
      } catch (err) {
        console.error("Errore nel recupero dei dati del dispositivo:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDeviceDetails();
  }, [deviceId]);

  const loadHistory = async () => {
    setHistoryLoading(true);
    try {
      const res = await fetch(`http://water4.altervista.org/backend/getParamsHistory.php?deviceId=${deviceId}`);
      const data = await res.json();
      if (data.history) {
        setParamsHistory(data.history);
        if (data.history.length > 0) {
          setSelectedHistory(data.history[0]);
        }
      } else {
        console.error("Errore nel caricamento dello storico", data.error);
      }
    } catch (err) {
      console.error("Errore nel caricamento dello storico:", err);
    } finally {
      setHistoryLoading(false);
    }
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
    if (mode === "history") {
      loadHistory();
    }
  };

  if (loading) return <div className="container my-4">Caricamento...</div>;
  if (!device) return <div className="container my-4">Dispositivo non trovato.</div>;

  const latestRUL = paramsData.length > 0 ? paramsData[0].RUL : null;
  const formattedRUL = latestRUL !== null ? formatRULinDaysHours(latestRUL) : "N/A";

  // Stili dei pulsanti per coerenza con il verde usato nella webapp
  const activeButtonStyle = {
    backgroundColor: "#C1EDCC",
    color: "#000",
    border: "none"
  };
  const inactiveButtonStyle = {
    backgroundColor: "transparent",
    color: "#C1EDCC",
    border: "1px solid #C1EDCC"
  };

  return (
    <div className="container-fluid p-0">
      <Navbar
        title={`Device ${device.device_code}`}
        showBackButton={true}
        backLink={`/zona/${device.id_zone}`}
      />
      <div className="container my-4">
        {/* Card superiore divisa in 3 colonne */}
        <div className="card mb-4" style={{ backgroundColor: "#304D6D", color: "#fff" }}>
          <div className="card-body">
            <div className="row">
              {/* Colonna sinistra: foto placeholder */}
              <div className="col-md-3 d-flex justify-content-center align-items-center">
                <img src="https://via.placeholder.com/150" alt="Device" className="img-fluid" />
              </div>
              {/* Colonna centrale: informazioni sul dispositivo */}
              <div className="col-md-6">
                <h5 className="card-title">Dettagli Dispositivo</h5>
                <p className="card-text"><strong>Marca:</strong> {device.brand}</p>
                <p className="card-text"><strong>Modello:</strong> {device.model}</p>
                <p className="card-text"><strong>Tipo:</strong> {device.type}</p>
                <p className="card-text"><strong>Stato:</strong> {device.status}</p>
              </div>
              {/* Colonna destra: tempo rimanente */}
              <div className="col-md-3 d-flex flex-column justify-content-center align-items-center">
                {latestRUL !== null && (
                  <p className="card-text" style={{ fontSize: "1.2rem", fontWeight: "bold", textAlign: "center" }}>
                    Tempo rimanente<br />{formattedRUL}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* Sezione per i parametri registrati */}
        <div>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0">Parametri Registrati</h5>
            <div>
              <button
                className="btn btn-sm"
                style={viewMode === "current" ? activeButtonStyle : inactiveButtonStyle}
                onClick={() => handleViewModeChange("current")}
              >
                Parametri Attuali
              </button>
              <button
                className="btn btn-sm ms-2"
                style={viewMode === "history" ? activeButtonStyle : inactiveButtonStyle}
                onClick={() => handleViewModeChange("history")}
              >
                Storico Parametri
              </button>
            </div>
          </div>
          {viewMode === "current" ? (
            paramsData.length > 0 ? (
              paramsData.map((param) => (
                <div key={param.id_param} className="mb-4">
                  {param.params ? (
                    renderJson(param.params)
                  ) : (
                    <p>Nessun dato JSON disponibile.</p>
                  )}
                  <p style={{ fontSize: "0.85rem", marginTop: "0.5rem", color: "#555" }}>
                    <strong>Dati del:</strong> {param.timestamp} - <strong>id registrazione:</strong> {param.id_param}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-muted">Nessun parametro registrato per questo dispositivo.</p>
            )
          ) : (
            <div>
              {historyLoading ? (
                <p>Caricamento storico...</p>
              ) : paramsHistory.length > 0 ? (
                <div>
                  <div className="form-group">
                    <label htmlFor="historySelect">Seleziona record storico:</label>
                    <select
                      id="historySelect"
                      className="form-control"
                      value={selectedHistory ? selectedHistory.id_history : ""}
                      onChange={(e) => {
                        const selected = paramsHistory.find(
                          (item) => item.id_history === parseInt(e.target.value)
                        );
                        setSelectedHistory(selected);
                      }}
                    >
                      {paramsHistory.map((hist) => (
                        <option key={hist.id_history} value={hist.id_history}>
                          {hist.id_history} - {hist.old_timestamp}
                        </option>
                      ))}
                    </select>
                  </div>
                  {selectedHistory && (
                    <div className="mt-3">
                      {selectedHistory.old_params ? (
                        renderJson(selectedHistory.old_params)
                      ) : (
                        <p>Nessun dato JSON disponibile.</p>
                      )}
                      <p style={{ fontSize: "0.85rem", marginTop: "0.5rem", color: "#555" }}>
                        <strong>Dati del:</strong> {selectedHistory.old_timestamp} - <strong>id registrazione:</strong> {selectedHistory.id_history}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-muted">Nessun record storico disponibile per questo dispositivo.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function formatRULinDaysHours(rulMinutes) {
  const totalMin = parseInt(rulMinutes, 10) || 0;
  const days = Math.floor(totalMin / (60 * 24));
  const hours = Math.floor((totalMin % (60 * 24)) / 60);
  return `${days} giorni e ${hours} ore`;
}

function renderJson(jsonString) {
  try {
    const parsed = JSON.parse(jsonString);
    if (typeof parsed === "object" && parsed !== null) {
      return (
        <table className="table table-sm">
          <tbody>
            {Object.entries(parsed).map(([key, value]) => (
              <tr key={key}>
                <td><strong>{key}</strong></td>
                <td>{typeof value === "object" ? JSON.stringify(value) : value.toString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
    return jsonString;
  } catch (e) {
    return jsonString;
  }
}

export default DettagliComponente;
