import React, { useContext } from 'react'
import FormContext from '../context/Form/FormContext';
import FormUserDetail from './FormUserDetail.js';
import FormPersonalDetails from './FormPersonalDetails.js';



const UserForm = () => {

    const { dataForm, step } = useContext(FormContext);

    switch (step) {
        case 1:
            return (
                <>
                    <FormUserDetail />
                </>
            )
        case 2:
            return (
                <>
                    <FormPersonalDetails />
                </>
            )
        default:
            return (<h1>Se esta renderizando otra vez cada vez que escribo en el input y eso está mal</h1>)    
    }
}

export default UserForm