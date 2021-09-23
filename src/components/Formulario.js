import React, {useState} from 'react'


const Formulario = () => {
    const [form, setForm] = useState({});

    const handleChange = e => {
        setForm({...form, [e.target.name]: e.target.value})
    }


    return (
        <>
            <h2>Hola soy un Formulario</h2>
            <form onSubmit={handleChange}>
                <label htmlFor='nombre'>Nombre: </label>
                <input type='text' name='nombre' id='nombre' value={form.nombre} onChange={handleChange}/>
            </form>
        </>
    )
}

export default Formulario