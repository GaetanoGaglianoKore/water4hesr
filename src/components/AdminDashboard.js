// src/components/AdminDashboard.js
import React from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

function AdminDashboard() {
  return (
    <div className="container-fluid p-0">
      <Navbar title="Dashboard Admin" showLogout={true} />
      <div className="container my-4">
        <h2>Dashboard Admin</h2>
        <p>Benvenuto nell'area amministrativa. Questa è una dashboard statica per il prototipo.</p>
        <div className="mt-4">
          <Link to="/dashboard" className="btn" style={{ backgroundColor: "#C1EDCC", color: "#000" }}>
            Torna alla Dashboard Utente
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
