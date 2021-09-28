import React, {useReducer} from 'react'
import FormContext from './FormContext';
import FormReducer from './FormReducer'

const FormState = (props) => {

    const initialState = {
        dataForm: {
            nombre:'',
            apellido:'',
            mail:'',
            telefono:'',
            dni:0
        },
        step: 0
    }

    const [state, dispatch] = useReducer(FormReducer, initialState);

    const setForm = (data) => {
        dispatch({
            type: 'SET_FORM',
            payload: data
        })
    }

    const setStep = (data) => {
        dispatch({
            type: 'SET_STEP',
            payload: data
        })
    }

    return (
        <FormContext.Provider value={{
            dataForm: state.dataForm,
            step: state.step,
            setForm,
            setStep
        }}>
            {props.children}
        </FormContext.Provider>
    )
}

export default FormState