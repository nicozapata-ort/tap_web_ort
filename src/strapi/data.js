import axios from 'axios'
import { getAuth, getApiURL, getPromotionId } from "./config.js";

async function getPromotion() {
    const { data, status } = await axios.get(`${getApiURL()}/promotions/${getPromotionId()}`, getAuth());
    if (status !== 200) {
        throw new Error(data.message)
    }
    return data
}

async function getAllParticipants({ promotionId, email }) {
    const { data, status } = await axios.get(`${getApiURL()}/ranking`, getAuth({ promotionId, email }));
    if (status !== 200) {
        throw new Error(data.message)
    }
    return data
}

async function getCoupon({referr, req}){
    const { data } = await axios.post(`${getApiURL()}/participants?referr=${referr}`, {...req, promotionId: getPromotionId()} , getAuth())
    if (data.status !== 201) {
        throw new Error(data.message)
    }
    return data
}

export { getPromotion, getAllParticipants, getCoupon }