﻿import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Fade from "react-reveal/Fade";
import "../CSS/Nav.css";
import axiosAuth from "../tools/axiosAuth";

const Nav = () => {
  const [authId, setAuthId] = useState(null);

  useEffect(() => {
    validaToken();
  }, []);

  const validaToken = async () => {
    if(!localStorage.getItem('token')) return;
    
    await axiosAuth
      .get("/Token")
      .then((token) => setAuthId(token.data))
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <Fade top>
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid">
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="nav mx-auto">
                {authId? 
                   <Link to={"/dadosUsuario/" + authId} >
                   <li className="nav-item">Meus dados</li>
                 </Link>
                :
                <Link to="/Login">
                  <li className="nav-item">Login</li>
                </Link>
                }
                <Link to="/">
                  <li className="nav-item">Listagem de Usuários</li>
                </Link>
                <Link to="/Cadastro">
                  <li className="nav-item">Cadastre-se</li>
                </Link>
              </ul>
            </div>
          </div>
        </nav>
      </Fade>
    </div>
  );
};

export default Nav;
