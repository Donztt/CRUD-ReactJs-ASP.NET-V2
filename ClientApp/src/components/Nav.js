import React from "react";
import { Link } from 'react-router-dom'
import Fade from 'react-reveal/Fade';
import '../CSS/Nav.css';

function Nav() {
    return (
        <div>
            <Fade top>
                <nav className="navbar navbar-expand-lg">
                    <div className="container-fluid">
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="nav mx-auto">
                                <Link to="/Login"><li className="nav-item">Login</li></Link>
                                <Link to="/"><li className="nav-item">Listagem de Usuários</li></Link>
                                <Link to="/Cadastro"><li className="nav-item">Cadastre-se</li></Link>
                            </ul>
                        </div>
                    </div>
                </nav>
            </Fade>
        </div>
    )
}

export default Nav;