// src/components/DettagliComponente.js
import React from 'react';
import { useParams, Link } from 'react-router-dom';

function DettagliComponente() {
  // Ottieni il nome del device dalla rotta (parametro :deviceName)
  const { deviceName } = useParams();

  // Dati di esempio (in futuro potresti recuperarli da un backend)
  const brand = '[...]';
  const position = 'Via S. Leone';
  const rul = '[...]';

  // Tabella di esempio con parametri, valori, timestamp e valore ottimale
  const tableData = [
    { parametro: 'Temperatura', valore: '50°C', timestamp: '2023-10-04 12:00:00', valoreOttimale: '45-55°C' },
    { parametro: 'Pressione', valore: '3 bar', timestamp: '2023-10-04 12:00:00', valoreOttimale: '2-4 bar' },
  ];

  return (
    <div className="container-fluid p-0">
      {/* Navbar */}
      <nav className="navbar px-3" style={{ backgroundColor: '#FFFFFF' }}>
        {/* Puoi reindirizzare al path corretto per tornare alla zona */}
        <Link to="/zona/1" className="btn back-btn me-2" style={{ backgroundColor: '#C1EDCC', color: '#000' }}>
          &#8592;
        </Link>
        <span className="navbar-brand">{deviceName}</span>
      </nav>

      <div className="container my-4">
        {/* Sezione immagine e info base */}
        <div className="row">
          <div className="col-12 col-md-4">
            <img
              src="/pump.jpg"  // Immagine di esempio, metti qui la tua immagine
              alt="device"
              className="img-fluid rounded mb-3"
            />
          </div>
          <div className="col-12 col-md-8">
            <h5>Marca: {brand}</h5>
            <p>Posizione: {position}</p>
            <p>RUL: {rul}</p>
          </div>
        </div>

        {/* Tabella parametri */}
        <div className="mt-4">
          <table className="table">
            <thead>
              <tr>
                <th>Parametro</th>
                <th>Valore</th>
                <th>Timestamp</th>
                <th>Valore Ottimale</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, i) => (
                <tr key={i}>
                  <td>{row.parametro}</td>
                  <td>{row.valore}</td>
                  <td>{row.timestamp}</td>
                  <td>{row.valoreOttimale}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DettagliComponente;
