import React, { Fragment , useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';


const Formulario = ({crearCita}) => {

    //Crear state de citas

    const [cita, actualizarCita] = useState({
            mascota: '',
            propietario: '',
            fecha: '',
            hora: '',
            sintomas: ''
    });

    const [error, actualizarError] = useState(false)

    //Crear funcion de prueba

    const actualizarState = e => {
        actualizarCita({
            ...cita,
            [e.target.name]: e.target.value
        })
    }

    //Extraer los valores

    const { mascota, propietario, fecha, hora, sintomas} = cita;

    //Cuando el propietario aprieta el boton de "Agregar cita"

    const submitCita = e => {
        e.preventDefault();

        //validar
        if(mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || 
           hora.trim() === '' || sintomas.trim() === ''){
            actualizarError(true);
            return;
        }
        //Eliminar el mensaje previo
        actualizarError(false);

        //asignar un id
        cita.id = uuidv4();
        console.log(cita);

        //crear una cita
        crearCita(cita);

        //reiniciar el form
        actualizarCita({
            mascota: '',
            propietario: '',
            fecha: '',
            hora: '',
            sintomas: ''
        })
    }


    return ( 
        <Fragment>
            <h2>Crear Cita</h2>

            { error ? <p className = 'alerta-error'>Todos los campos son obligatorios</p> 
            : null}

            <form
                onSubmit= {submitCita}
            >
                
                <label>Nombre Mascota</label>
                <input
                    type="text"
                    name="mascota"
                    className="u-full-width"
                    placeholder="Nombre de la mascota"
                    onChange={actualizarState}
                    value={mascota}
                />
                <label>Nombre Propietario</label>
                <input
                    type="text"
                    name="propietario"
                    className="u-full-width"
                    placeholder="Nombre del dueño"
                    onChange={actualizarState}
                    value={propietario}
                />

                <label>Fecha</label>
                <input
                    type="date"
                    name="fecha"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={fecha}
                />

                <label>Horario</label>
                <input
                    type="time"
                    name="hora"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={hora}
                />

                <label>Síntomas</label>
                <textarea
                    className="u-full-width"
                    name="sintomas"
                    onChange={actualizarState}
                    value={sintomas}
                ></textarea>

                <button
                    type="submit"
                    className="u-full-width button-primary"
                
                >Agregar cita</button>
            </form>

        </Fragment>
     );
}

Formulario.porpTypes = {
    crearCita: PropTypes.func.isRequired
}
 
export default Formulario;