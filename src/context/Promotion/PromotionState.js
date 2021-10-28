import React, {useReducer} from 'react'
import PromotionContext from './PromotionContext.js';
import PromotionReducer from './PromotionReducer.js'

const PromotionState = (props) => {

    const initialState = {
        promotion: null
    }

    const [state, dispatch] = useReducer(PromotionReducer, initialState);

    const setPromotion = (data) => {
        dispatch({
            type: 'SET_PROMOTION',
            payload:data
        })
    }

    return (
        <PromotionContext.Provider value={{
            promotion: state.promotion,
            setPromotion
        }}>
            {props.children}
        </PromotionContext.Provider>
    )
}

export default PromotionState