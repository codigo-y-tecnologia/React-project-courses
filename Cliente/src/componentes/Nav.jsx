import React from 'react'
import '../estilos/styles.css'
import { Link, NavLink } from 'react-router-dom'

const Nav = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-info">
                <div className="container-fluid">
                    <Link className="navbar-brand">ITSA</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <NavLink className="nav-link active" to="/registrar-curso">Registrar curso</NavLink>
                            <NavLink className="nav-link active" to="/cursos-registrados">Cursos registrados</NavLink>
                            <NavLink className="nav-link active" to="/creditos">Créditos</NavLink>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Nav
