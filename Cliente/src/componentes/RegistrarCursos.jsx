import React, { useState, useRef } from 'react'
import Swal from 'sweetalert2'

const RegistrarCursos = () => {

    const [nombreCurso, setNombreCurso] = useState('')
    const [descripcionCurso, setDescripcionCurso] = useState('')
    const [imagen, setImagen] = useState(null)
    const inputImagen = useRef(null)

    const subirImagen = (e) => {
        setImagen(e.target.files[0])
    }

    const registrarCurso = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('nombreCurso', nombreCurso)
        formData.append('descripcionCurso', descripcionCurso)
        formData.append('image', imagen)

        try {
            const response = await fetch('http://localhost:3000/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Curso registrado",
                    html: "El curso <b>" + nombreCurso + "</b> ha sido registrado",
                    showConfirmButton: false,
                    timer: 1500
                });
                limpiar()
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error al registrar el curso",
                    text: "Ocurrió un error al registrar el curso"
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error de conexión",
                text: "No se pudo conectar al servidor",
                timer: 2000
            });
        }
    }

    const limpiar = () => {

        setNombreCurso('')
        setDescripcionCurso('')
        setImagen(null)
        if (inputImagen.current) {
            inputImagen.current.value = ''
        }

    }

    return (
        <>
            <div className="card">
                <div className="card-header">
                    <h1 className='text-center'>REGISTRO DE CURSOS</h1>
                </div>
                <div className="card-body">
                    <form onSubmit={registrarCurso}>
                        <div className="mb-3">
                            <label htmlFor="NombreCurso" className="form-label text-primary">Nombre del curso</label>
                            <input type="text" className="form-control" id="iNombreCurso" name='nombreCurso' value={nombreCurso} onChange={(e) => setNombreCurso(e.target.value)} placeholder='Ingresa el nombre del curso' autoComplete='off' required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="DescripcionCurso" className="form-label text-primary">Descripción del curso</label>
                            <textarea className="form-control" name='descripcionCurso' id="iDescripcioncurso" rows="4" value={descripcionCurso} onChange={(e) => setDescripcionCurso(e.target.value)} autoComplete='off' placeholder='Escriba la descripción del curso aquí...' required></textarea>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="ImagenCurso" className="form-label text-primary">Imágen del curso</label>
                            <input type="file" className="form-control" name='image' id="iImagenCurso" ref={inputImagen} onChange={subirImagen} required />
                        </div>
                        <button className='btn btn-primary mt-2' type='submit'>Registrar curso</button>
                    </form>
                </div>
            </div>

        </>
    )
}

export default RegistrarCursos
