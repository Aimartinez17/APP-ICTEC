import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../css/MenuPage.css'; 
import Cookies from 'js-cookie';
import { useEffect } from 'react';

const MenuPage = () => {
  const navigate = useNavigate();
  const [tokenRemoved, setTokenRemoved]= useState(false)

  const cerrarsesion = () => {
    Cookies.remove('token');
    setTokenRemoved(true);
  };

  useEffect(() => {
    // Redirigir a la página de inicio después de eliminar el token
    if (tokenRemoved) {
      navigate('/');
    }
  }, [tokenRemoved]);
  return (
    <div className="menu-container">
      <h2 className="menu-title">Menú</h2>
      <nav className="menu-nav">
        <ul className="menu-list">
          <li className="menu-item">
            <Link to="/formulario_1" className="menu-link">
              Formulario 1
            </Link>
          </li>
          <li className="menu-item">
            <Link to="/formulario_2" className="menu-link">
              Formulario 2
            </Link>
          </li>
          <li className="menu-item">
            <Link to="/formulario_3" className="menu-link">
              Formulario 3
            </Link>
          </li>
          <li className="menu-item">
            <Link to="/formulario_4" className="menu-link">
              Formulario 4
            </Link>
          </li>
          <li className="menu-item">
            <Link to="/formulario_5" className="menu-link">
              Formulario 5
            </Link>
          </li>
        </ul>
      </nav>
      <button className="close-button" onClick={cerrarsesion}>
              Cerrar Sesion</button>
    </div>
  );
};

export default MenuPage;
