import React, { useEffect, useState } from "react";
import "./App.css";
import logo from "./sriaara-logo.jpg";
import { FaInstagram } from "react-icons/fa";

function App() {
  const [sarees, setSarees] = useState([]);

  useEffect(() => {
    const API_BASE = process.env.REACT_APP_API || "http://localhost:8000/sarees";
    fetch(`${API_BASE}/sarees`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched sarees:", data);  // ADD THIS
        setSarees(data);
      })
      .catch((err) => console.error("Error fetching sarees:", err));
  }, []);
 
  return (
    <div className="App">
      <nav className="navbar">
        <div className="nav-left">
          <img src={logo} alt="Sriaara Logo" className="logo" />
          <span className="brand-name">Sriaara</span>
        </div>
        <a
          href="https://www.instagram.com/your_instagram_username"
          target="_blank"
          rel="noopener noreferrer"
          className="insta-link"
        >
          <FaInstagram />
          Follow Us
        </a>
      </nav>

      <div className="gallery">
        {sarees.length > 0 ? (
          sarees.map((saree, idx) => (
            <div key={idx} className="card">
              <img
                src={`http://127.0.0.1:8000${saree.image}`}
                alt={saree.name}
                className="saree-image"
              />
              <p className="saree-name">{saree.name}</p>
              {saree.available ? (
                <a
                  href={`https://wa.me/919999999999?text=I%20am%20interested%20in%20the%20${encodeURIComponent(saree.name)}%20saree`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="whatsapp-button"
                >
                  Buy on WhatsApp
                </a>
              ) : (
                <p className="sold-out">Sold Out</p>
              )}
            </div>
          ))
        ) : (
          <p>Loading sarees...</p>
        )}
      </div>
    </div>
  );
}

export default App;