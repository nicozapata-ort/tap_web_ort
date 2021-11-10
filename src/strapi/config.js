import { config } from "dotenv";

config()

function getAuth(params) {
    if (params) {
        return {
            headers: {
                Authorization: process.env.REACT_APP_AUTHORIZATION_STRAPI
            },
            params: params
        }
    } else {
        return {
            headers: {
                Authorization: process.env.REACT_APP_AUTHORIZATION_STRAPI
            }
        }
    }
}

function getApiURL() {
    return process.env.REACT_APP_URL_STRAPI
}

function getPromotionId() {
    return process.env.REACT_APP_PROMOTION_ID
}

export { getAuth, getApiURL, getPromotionId }