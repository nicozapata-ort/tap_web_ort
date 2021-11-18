import React, {useReducer} from 'react'
import FormContext from './FormContext';
import FormReducer from './FormReducer'

const FormState = (props) => {

    const initialState = {
        dataForm: {
            name:'',
            lastName:'',
            email:'',
            phone: '',
            dni: '',
            acceptTerms: false,
        },
        step: 0,
        registeredUser: false, 
        formCompleted: false,
        openCouponModal: false,
        openTermsModal: false,
        coupon: null
    }
    //registeredUser - Para cuando al momento de registrarse, sin tener que hacer F5 pueda verme en el ranking

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

    const setRegisteredUser = (data) => {
        dispatch({
            type: 'SET_REGISTERED_USER',
            payload: data
        })
    }

    const setFormCompleted = (data) => {
        dispatch({
            type: 'SET_FORM_COMPLETED',
            payload: data
        })
    }

    const setOpenCouponModal = (data) => {
        dispatch({
            type: 'SET_OPEN_COUPON_MODAL',
            payload: data
        })
    }
    
    const setOpenTermsModal = (data) => {
        dispatch({
            type: 'SET_OPEN_TERMS_MODAL',
            payload: data
        })
    }

    const setCoupon = (data) => {
        dispatch({
            type: 'SET_COUPON',
            payload: data
        })
    }

    return (
        <FormContext.Provider value={{
            dataForm: state.dataForm,
            step: state.step,
            registeredUser: state.registeredUser,
            formCompleted: state.formCompleted,
            openCouponModal: state.openCouponModal,
            openTermsModal: state.openTermsModal,
            coupon: state.coupon,
            setCoupon,
            setOpenCouponModal,
            setOpenTermsModal,
            setForm,
            setStep,
            setRegisteredUser,
            setFormCompleted
        }}>
            {props.children}
        </FormContext.Provider>
    )
}

export default FormState