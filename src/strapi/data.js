import axios from 'axios'

async function getPromotion() {
    try {
        const { data } = await axios.get('http://localhost:1337/promotions', {
            headers: {
                Authorization: process.env.REACT_APP_AUTHORIZATION_STRAPI
            },
        });
        if (data.length > 0) {
            return data[data.length - 1]
        }
        return data
    } catch (error) {
        console.log(error)
    }

}

async function getAllParticipants() {
    try {
        let { data } = await axios.get('http://localhost:1337/ranking', {
            headers: {
                Authorization: process.env.REACT_APP_AUTHORIZATION_STRAPI
            },
            params: { email: "nicolashzap@gmail.com" }
        });

        const promotion = await getPromotion()
        console.log('Estoy en DATA, para ver promotion', promotion)

        if (data.data.length >= promotion.maxParticipants) {
            data = data.data.splice(0, promotion.maxParticipants)
            return data
        }

        return data.data
    } catch (error) {
        console.log(error)
    }
    // try {
    //     const { data } = await axios.get('http://localhost:1337/usuarios')
    //     data.sort((a, b) => b.Referidos - a.Referidos)
    //     return data
    // } catch (error) {
    //     console.log(error)
    // }
}

export { getPromotion, getAllParticipants }