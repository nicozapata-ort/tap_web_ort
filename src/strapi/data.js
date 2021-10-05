import axios from 'axios'

async function getAllDescription() {
    try {
        const { data } = await axios.get('http://localhost:1337/promotions')

        return data
    } catch (error) {
        console.log(error)
    }

}

export { getAllDescription }