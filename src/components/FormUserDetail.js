import React, { useContext } from 'react'
import FormContext from '../context/Form/FormContext';


const FormUserDetail = () => {

    const { dataForm, setForm, step, setStep } = useContext(FormContext);

    const handleChange = e => {
        // e.preventDefault()
        setForm({[e.target.name]: e.target.value})
    }

    return (
        <>
            <p><span className='page-selected-form'>1</span> Personal data</p>
            <form>
                {/* <label htmlFor='nombre'>Por favor, ingrese su nombre </label> */}
                <br/>
                <input type='text' name='nombre' id='nombre' defaultValue={dataForm ? dataForm.nombre : ''} onChange={handleChange} placeholder="Ingrese su nombre"/>
                <br />
                {/* <label htmlFor='apellido'>Por favor, ingrese su apellido </label> */}
                <br/>
                <input type='text' name='apellido' id='apellido' defaultValue={dataForm ? dataForm.apellido : ''} onChange={handleChange} placeholder="Ingrese su apellido" />
            </form>
            <br/>
            <button id='button-continue-form' onClick={() => setStep(step + 1)}>Continue</button>

        </>
    )
}

export default FormUserDetail