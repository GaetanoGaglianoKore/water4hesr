// src/components/DettagliComponente.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';

function DettagliComponente() {
  const { deviceId } = useParams();
  const [device, setDevice] = useState(null);
  const [paramsData, setParamsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://water4.altervista.org/backend/getComponentDetails.php?deviceId=${deviceId}`)
      .then(res => res.json())
      .then(data => {
        if (data.device) {
          setDevice(data.device);
          setParamsData(data.params || []);
        } else {
          console.error("Errore:", data.error);
        }
      })
      .catch(err => console.error("Errore nel recupero dei dati del dispositivo:", err))
      .finally(() => setLoading(false));
  }, [deviceId]);

  if (loading) {
    return <div className="container my-4">Caricamento...</div>;
  }

  if (!device) {
    return <div className="container my-4">Dispositivo non trovato.</div>;
  }

  // Recupera la RUL più recente (prendendo il primo record, poiché l'array è ordinato DESC per timestamp)
  const latestRUL = paramsData.length > 0 ? paramsData[0].RUL : null;
  const formattedRUL = latestRUL !== null ? formatRULinDaysHours(latestRUL) : 'N/A';

  return (
    <div className="container-fluid p-0">
      <Navbar 
        title={`Device ${device.device_code}`} 
        showBackButton={true} 
        backLink={`/zona/${device.id_zone}`} 
      />
      <div className="container my-4">
        <div className="row">
          <div className="col-12 col-md-8">
            <h5>Marca: {device.brand}</h5>
            <p>Modello: {device.model}</p>
            <p>Tipo: {device.type}</p>
            <p>Stato: {device.status}</p>
          </div>
          <div className="col-12 col-md-4 d-flex align-items-center justify-content-end">
            {latestRUL !== null && (
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#333' }}>
                Tempo rimanente stimato: {formattedRUL}
              </div>
            )}
          </div>
        </div>
        <div className="mt-4">
          <h5>Parametri registrati</h5>
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
                {paramsData.map(param => (
                  <tr key={param.id_param}>
                    <td>{param.id_param}</td>
                    <td>{param.timestamp}</td>
                    <td>{param.RUL !== null ? param.RUL : '-'}</td>
                    <td>{param.params ? renderJson(param.params) : '-'}</td>
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
  if (!jsonString) return '-';
  let parsed;
  try {
    parsed = JSON.parse(jsonString);
  } catch (e) {
    return jsonString;
  }
  if (typeof parsed === 'object' && parsed !== null) {
    return (
      <table className="table table-sm" style={{ backgroundColor: '#fff' }}>
        <tbody>
          {Object.entries(parsed).map(([key, value]) => (
            <tr key={key}>
              <td><strong>{key}</strong></td>
              <td>{typeof value === 'object' ? JSON.stringify(value) : value.toString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  return jsonString;
}

export default DettagliComponente;