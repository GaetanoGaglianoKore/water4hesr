// src/components/DettagliComponente.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";

function DettagliComponente() {
  const { deviceId } = useParams();
  const [device, setDevice] = useState(null);
  const [paramsData, setParamsData] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <div className="container my-4">Caricamento...</div>;
  if (!device) return <div className="container my-4">Dispositivo non trovato.</div>;

  const latestRUL = paramsData.length > 0 ? paramsData[0].RUL : null;
  const formattedRUL = latestRUL !== null ? formatRULinDaysHours(latestRUL) : "N/A";

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
        {/* Sezione per la tabella dei parametri, standard Bootstrap */}
        <div>
          <h5>Parametri Registrati</h5>
          {paramsData.length > 0 ? (
            <table className="table">
              <thead>
                <tr>
                  <th>ID Param</th>
                  <th>Timestamp</th>
                  <th>RUL (min)</th>
                  <th>Params (JSON)</th>
                </tr>
              </thead>
              <tbody>
                {paramsData.map((param) => (
                  <tr key={param.id_param}>
                    <td>{param.id_param}</td>
                    <td>{param.timestamp}</td>
                    <td>{param.RUL !== null ? param.RUL : "-"}</td>
                    <td>{param.params ? renderJson(param.params) : "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-muted">Nessun parametro registrato per questo dispositivo.</p>
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
