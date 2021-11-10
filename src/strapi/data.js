import axios from 'axios'
import { getAuth, getApiURL, getPromotionId } from "./config.js";

async function getPromotion() {
    try {

        const { data } = await axios.get(`${getApiURL()}/promotions/${getPromotionId()}`, getAuth());
        return data
    } catch (error) {
        console.log(error)
    }

}

async function getAllParticipants({ email, promotionId }) {

    const { data } = await axios.get(`${getApiURL()}/ranking`, getAuth({ email, promotionId }));

    if (data.status !== 200) {
        throw new Error(data.message)
    }
    return data


}

export { getPromotion, getAllParticipants }