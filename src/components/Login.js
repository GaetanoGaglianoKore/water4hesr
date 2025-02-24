// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState(''); // utilizziamo email invece di username
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Resetta eventuali errori precedenti

    try {
      const response = await fetch('http://water4.altervista.org/backend/verifyUser.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        // Se il login ha successo, naviga alla dashboard
        navigate('/dashboard');
      } else {
        // Se c'è un errore, visualizzalo
        setError(data.error || 'Errore durante il login');
      }
    } catch (err) {
      setError('Errore di rete: ' + err.message);
    }
  };

  return (
    <div className="bg-light d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: '100%', maxWidth: '400px', borderRadius: '12px' }}>
        <div className="text-center mb-4 mt-3">
          <img src="/placeholder-logo.png" alt="Logo" className="img-fluid" style={{ maxWidth: '150px' }} />
        </div>
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="px-3 pb-3">
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn w-100" style={{ backgroundColor: '#C1EDCC', color: '#000' }}>
            Accedi
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
