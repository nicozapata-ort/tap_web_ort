import React, { useContext } from 'react'
import FormContext from '../context/Form/FormContext';


const FormPersonalDetails = () => {

    const { dataForm, setForm, step, setStep } = useContext(FormContext);

    const handleChange = e => {
        setForm({[e.target.name]: e.target.value})
    }

    return (
        <>
            <h1>Segunda página del Formulario</h1>
            <form>
                <label htmlFor='nombre'>Nombre: </label>
                <input type='text' name='nombre' id='nombre' defaultValue={dataForm ? dataForm.nombre : ''} onChange={handleChange} />
            </form>
            <button onClick={() => setStep(step + 1)}>Continue</button>
            <button onClick={() => setStep(step - 1)}>Previous</button>
        </>
    )
}

export default FormPersonalDetails