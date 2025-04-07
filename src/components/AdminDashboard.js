// src/components/AdminDashboard.js
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import "./AdminCommon.css"; // File di stile comune per le pagine admin

function AdminDashboard() {
  return (
    <div className="container-fluid p-0">
      <Navbar title="Dashboard Admin" showLogout={true} />
      <div className="container admin-container">
        {/* Pulsante piccolo in alto a sinistra per tornare alla pagina utente */}
        <div className="user-page-btn">
          <Link to="/dashboard" className="btn btn-sm admin-user-btn">
            Vai alla homepage
          </Link>
        </div>
        <h2 className="admin-title">Area Amministrativa</h2>
        <div className="row admin-cards">
          {/* Scheda Allarmi */}
          <div className="col-md-4 mb-3">
            <div className="card admin-card">
              <div className="card-body">
                <h5 className="card-title">Statistiche Allarmi</h5>
                <p className="card-text">Totale Allarmi: 123</p>
                <p className="card-text">Allarmi Aperti: 45</p>
                <p className="card-text">Allarmi Chiusi: 78</p>
              </div>
              <div className="card-footer">
                <Link to="/allarmiadmin" className="btn admin-btn">
                  Vedi Allarmi
                </Link>
              </div>
            </div>
          </div>
          {/* Scheda Dispositivi */}
          <div className="col-md-4 mb-3">
            <div className="card admin-card">
              <div className="card-body">
                <h5 className="card-title">Statistiche Dispositivi</h5>
                <p className="card-text">Totale Dispositivi: 50</p>
                <p className="card-text">Dispositivi Critici: 5</p>
                <p className="card-text">Dispositivi Operativi: 45</p>
              </div>
              <div className="card-footer">
                <Link to="/adddevice" className="btn admin-btn">
                  Aggiungi Device
                </Link>
              </div>
            </div>
          </div>
          {/* Scheda Zone */}
          <div className="col-md-4 mb-3">
            <div className="card admin-card">
              <div className="card-body">
                <h5 className="card-title">Statistiche Zone</h5>
                <p className="card-text">Totale Zone: 12</p>
                <p className="card-text">Zone con Allarmi: 4</p>
              </div>
              <div className="card-footer">
                <Link to="/addzone" className="btn admin-btn">
                  Aggiungi Zona
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
