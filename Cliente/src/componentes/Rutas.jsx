import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Nav from './Nav';
import RegistrarCursos from './RegistrarCursos';
import CursosRegistrados from './CursosRegistrados';
import Creditos from './Creditos';
import Footer from './Footer';

const Rutas = () => {
    return (
        <>
            <Router>
                <Nav />
                <Routes>
                    <Route path="/" element={<RegistrarCursos />} />
                    <Route path='/registrar-curso' element={<RegistrarCursos />} />
                    <Route path='/cursos-registrados' element={<CursosRegistrados />} />
                    <Route path='/creditos' element={<Creditos />} />
                    <Route path='/*' element={<Navigate to='/' />}></Route>
                </Routes>
                <Footer />
            </Router>
        </>
    )
}

export default Rutas
