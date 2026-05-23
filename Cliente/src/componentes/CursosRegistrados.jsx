import React, { useEffect, useState } from 'react'
import ModalModificar from './ModalModificar'
import Swal from 'sweetalert2'

const CursosRegistrados = () => {

    const [cursos, setCursos] = useState([])
    const [cursoSeleccionado, setCursoSeleccionado] = useState(null)
    const [modalVisible, setModalVisible] = useState(false)
    const [cursoEditado, setCursoEditado] = useState({})
    const [errores, setErrores] = useState({})

    // Obtener datos de los cursos desde el backend
    useEffect(() => {
        const obtenerCursos = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/cursos')
                const data = await response.json()
                setCursos(data)
            } catch (error) {
                console.error('Error al obtener los cursos:', error)
            }
        };

        obtenerCursos()
    }, [])

    // Manejar la selección de un curso
    const handleSelectChange = (e) => {
        const cursoId = parseInt(e.target.value, 10)
        const curso = cursos.find((c) => c.id === cursoId)
        setCursoSeleccionado(curso)
    }

    const abrirModal = () => {
        if (cursoSeleccionado) {
            setCursoEditado({ ...cursoSeleccionado })
            setModalVisible(true)
        }
    }

    const cerrarModal = () => {
        setModalVisible(false)
        setErrores({})
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setCursoEditado((prev) => ({
            ...prev,
            [name]: value,
        }))
    }


    const handleImagenChange = (e) => {
        const file = e.target.files[0];
        setCursoEditado((prev) => ({
            ...prev,
            nuevaImagen: file,
        }));
    };

    const modificarCurso = async () => {

        if (!validarCampos()) {
            return;
        }

        const formData = new FormData();
        formData.append('nombreCurso', cursoEditado.vNombre);
        formData.append('descripcionCurso', cursoEditado.tDescripcion);
        if (cursoEditado.nuevaImagen) {
            formData.append('imagen', cursoEditado.nuevaImagen);
        }

        try {
            const response = await fetch(`http://localhost:3000/api/cursos/${cursoEditado.id}`, {
                method: 'PUT',
                body: formData,
            });

            if (response.ok) {
                const updatedCurso = { ...cursoEditado };
                if (cursoEditado.nuevaImagen) {
                    // Obtener la nueva URL en base64 para la imagen
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        updatedCurso.bImagen = reader.result;
                        actualizarEstado(updatedCurso);
                    };
                    reader.readAsDataURL(cursoEditado.nuevaImagen);
                } else {
                    actualizarEstado(updatedCurso);
                }
            } else {
                console.error('Error al modificar el curso');
            }
        } catch (error) {
            console.error('Error al conectarse al servidor:', error);
        }
    };

    const eliminarCurso = (curso) => {
        Swal.fire({
            title: `¿Estás seguro que quieres eliminar el curso: ${curso.vNombre}?`,
            text: 'Este proceso no se puede revertir',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar!',
            cancelButtonText: 'No, cancelar',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await fetch(`http://localhost:3000/api/cursos/${curso.id}`, {
                        method: 'DELETE',
                    })

                    if (response.ok) {
                        // Eliminar el curso del estado
                        setCursos((prevCursos) =>
                            prevCursos.filter((c) => c.id !== curso.id)
                        )

                        // Restablecer el curso seleccionado y cerrar el modal
                        setCursoSeleccionado(null)
                        cerrarModal()

                        // Mostrar mensaje de éxito
                        Swal.fire('¡Eliminado!', 'El curso ha sido eliminado exitosamente.', 'success')
                    } else {
                        Swal.fire('¡Error!', 'Error al eliminar el curso')
                        console.error('Error al eliminar el curso')
                    }
                } catch (error) {
                    Swal.fire('¡Error!', 'Error al conectar al servidor', error)
                    console.error('Error al conectarse al servidor:', error)
                }
            }
        })
    }

    const validarCampos = () => {
        const nuevosErrores = {};
        if (!cursoEditado.vNombre.trim()) {
            nuevosErrores.nombre = 'El nombre del curso es obligatorio.';
        }
        if (!cursoEditado.tDescripcion.trim()) {
            nuevosErrores.descripcion = 'La descripción del curso es obligatoria.';
        }
        setErrores(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0;
    };

    const actualizarEstado = (updatedCurso) => {
        // Actualizar la lista de cursos
        setCursos((prev) =>
            prev.map((curso) => (curso.id === updatedCurso.id ? updatedCurso : curso))
        );

        // Actualizar el curso seleccionado
        setCursoSeleccionado(updatedCurso);

        cerrarModal();
    };

    return (
        <>
            <div className="card">
                <div className="card-header text-center">
                    <h1>CURSOS REGISTRADOS</h1>
                </div>
                <div className="card-body">
                    <div className="mb-3">
                        <label htmlFor='Cursos' className='form-control text-primary' >Curso</label>
                        <select className='form-control' name="sCurso" id="iCurso" onChange={handleSelectChange}>
                            <option value="">Seleccione un curso</option>
                            {cursos.map((curso) => (
                                <option key={curso.id} value={curso.id}>
                                    {curso.vNombre}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor='descripcionCurso' className='form-control text-primary' >Descripción del curso</label>
                        <textarea className='form-control' name="tDescripcionCurso" id="iDescripcionCurso" value={cursoSeleccionado?.tDescripcion || ''} rows="4" disabled></textarea>
                    </div>
                    <div className="image mb-3">
                        <label htmlFor='imagenCurso' className='form-control text-primary' >Imágen del curso</label>
                        {cursoSeleccionado?.bImagen && (
                            <div className='container'>
                                <img
                                    src={cursoSeleccionado.bImagen}
                                    alt={cursoSeleccionado.vNombre}
                                    className="img-fluid mt-2"
                                    style={{ maxHeight: '200px' }}
                                />
                                <button className="btn btn-warning ms-5" onClick={abrirModal}>Modificar curso</button>
                                <button className="btn btn-danger ms-2" onClick={() => eliminarCurso(cursoSeleccionado)}>Eliminar curso</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <ModalModificar
                visible={modalVisible}
                cursoEditado={cursoEditado}
                onClose={cerrarModal}
                onChange={handleInputChange}
                onImageChange={handleImagenChange}
                onSubmit={modificarCurso}
                errores={errores}
            />
        </>
    )
}

export default CursosRegistrados
