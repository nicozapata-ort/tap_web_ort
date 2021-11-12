import { SET_FORM, SET_STEP, SET_REGISTERED_USER, SET_FORM_COMPLETED, SET_OPEN_MODAL, SET_COUPON } from "../types";

export default (state, action) => {
    const { payload, type } = action

    switch (type) {
        case SET_FORM:
            return {
                ...state,
                dataForm: { ...state.dataForm, ...payload }
            }
        case SET_STEP:
            return {
                ...state,
                step: payload
            }
        case SET_REGISTERED_USER:
            return {
                ...state,
                registeredUser: payload
            }
        case SET_FORM_COMPLETED:
            return {
                ...state,
                formCompleted: payload
            }
        case SET_OPEN_MODAL:
            return {
                ...state,
                openModal: payload
            }
        case SET_COUPON:
            return {
                ...state,
                coupon: payload
            }
        default:
            return state;
    }
}