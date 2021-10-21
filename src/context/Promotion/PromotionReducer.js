import { SET_PROMOTION } from "../types";

export default (state, action) => {
    const { payload, type } = action

    switch (type) {
        case SET_PROMOTION:
            return {
                promotion: payload
            }
    }
}