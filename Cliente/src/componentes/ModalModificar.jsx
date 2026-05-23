import React from 'react'

const ModalModificar = ({
    visible,
    cursoEditado,
    onClose,
    onChange,
    onImageChange,
    onSubmit,
    errores,

}) => {

    if (!visible) return null

    return (
        <>
            <div className="modal show d-block" tabindex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Modificar curso</h5>
                            <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="nombreCurso" className="form-label">
                                    Nombre del curso
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="nombreCurso"
                                    name="vNombre"
                                    value={cursoEditado.vNombre}
                                    onChange={onChange} />
                                {errores.nombre && <div className="text-danger">{errores.nombre}</div>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="descripcionCurso" className="form-label">
                                    Descripción del curso
                                </label>
                                <textarea
                                    className="form-control"
                                    id="descripcionCurso"
                                    name="tDescripcion"
                                    value={cursoEditado.tDescripcion}
                                    onChange={onChange}
                                    rows="4"
                                ></textarea>
                                {errores.descripcion && <div className="text-danger">{errores.descripcion}</div>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="imagenCurso" className="form-label">
                                    Imagen del curso
                                </label>
                                <input
                                    type="file"
                                    className="form-control"
                                    id="imagenCurso"
                                    onChange={onImageChange}
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={onClose}>Cerrar</button>
                            <button type="button" className="btn btn-primary" onClick={onSubmit}>Modificar</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModalModificar
