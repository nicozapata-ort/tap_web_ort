import { SET_FORM, SET_STEP } from "../types";

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
        default:
            return state;
    }
}




