// src/components/Intervento.js
import React from 'react';
import { useParams, Link } from 'react-router-dom';

function Intervento() {
  const { deviceName } = useParams();

  return (
    <div>
      <nav className="navbar navbar-light bg-white shadow-sm px-3">
        <Link to="/dashboard" className="btn back-btn me-3">
          &larr;
        </Link>
        <span className="navbar-brand mb-0">Intervento su {deviceName}</span>
      </nav>
      <div className="container my-4">
        <h5>Strumenti necessari</h5>
        <textarea className="form-control mb-3" rows="3" readOnly>
- Chiave inglese
- Trapano
        </textarea>
        <h5>Checklist intervento</h5>
        <ul className="list-group">
          <li className="list-group-item d-flex justify-content-between align-items-center">
            <span>Stacca la corrente elettrica</span>
            <div>
              <button className="btn btn-checked btn-sm rounded-circle shadow-sm" aria-label="Segnala completato">
                ✓
              </button>
            </div>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            <span>Smonta bulloni saracinesca</span>
            <div>
              <button className="btn btn-ar btn-sm rounded-circle shadow-sm" aria-label="Visualizza AR">
                AR
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Intervento;
