const Creditos = () => {
    return (
        <>
            <div className="container d-flex flex-wrap align-items-center justify-content-center">
                <div className="row w-100">
                    <div className="col-md-1 col-12 d-flex justify-content-center mb-3">
                        <img
                            src="estudiante.png"
                            alt="inicio"
                            className="iCreditos img-fluid"
                            style={{ maxWidth: "200px" }}
                        />
                    </div>
                    <div className="col-md-11 col-12 text-center">
                        <h1>Créditos</h1>
                        <h5 className="mt-3">
                            Instituto Tecnológico Superior de Apatzingán
                        </h5>
                        <h6 className="mt-1 text-primary">Materia:</h6>
                        <h5>Programación en Ambiente Cliente - Servidor</h5>
                        <h6 className="mt-1 text-primary">Proyecto:</h6>
                        <h5>Cursos</h5>
                        <h6 className="mt-1 text-primary">Carrera:</h6>
                        <h5>Ingeniería Informática</h5>
                        <h6 className="mt-1 text-primary">Elaborado por:</h6>
                        <h5>Javier Alejandro Cruz Cardosa</h5>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Creditos;
