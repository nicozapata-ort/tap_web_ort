import axios from 'axios'

async function getPromotion() {
    try {
        const { data } = await axios.get('http://localhost:1337/promotions', {
            headers: {
                Authorization:
                    `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNzQ0ZDA5MzExNDhkMGY0Y2VlYTNlMyIsImlhdCI6MTYzNTAyMTQ5NiwiZXhwIjoxNjM3NjEzNDk2fQ.4ACqISC0LpFUhQNMSDWKx54A0l34AWkLkSCvF_eDYWk`
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

function getAllParticipants() {
    const participantes = [{ id: 1, nombre: 'Francisco Maximiliano', apellido: 'Gonzalez', referidos: 150 }, { id: 2, nombre: 'Roberto Elizabeth Ester', apellido: 'Meza', referidos: 1390 }, { id: 3, nombre: 'Javier', apellido: 'Lopez', referidos: 1020 }, { id: 4, nombre: 'Harry', apellido: 'Potter', referidos: 120 }, { id: 5, nombre: 'Lionel', apellido: 'Messi', referidos: 1120 }, { id: 6, nombre: 'Peter', apellido: 'Parker', referidos: 130 }]


    return participantes
}

async function getAllParticipants2() {
    try {
        let { data } = await axios.get('http://localhost:1337/ranking', {
            headers: {
                Authorization:
                    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNzQ0ZDA5MzExNDhkMGY0Y2VlYTNlMyIsImlhdCI6MTYzNTAyMTQ5NiwiZXhwIjoxNjM3NjEzNDk2fQ.4ACqISC0LpFUhQNMSDWKx54A0l34AWkLkSCvF_eDYWk'
            },
            params: { email: "nicolashzap@gmail.com" }
        });

        const promotion = await getPromotion()
        console.log('Estoy en DATA', promotion)
        console.log('Estoy en DATA', data)


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

export { getPromotion, getAllParticipants, getAllParticipants2 }