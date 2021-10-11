import axios from 'axios'

async function getAllDescription() {
    try {
        const { data } = await axios.get('http://localhost:1337/promotions')

        return data
    } catch (error) {
        console.log(error)
    }

}

function getAllParticipants() {
    const participantes = [{nombre: 'Francisco', apellido: 'Gonzalez', referidos: 150}, {nombre: 'Roberto', apellido: 'Meza', referidos: 1390}, {nombre: 'Javier', apellido: 'Lopez', referidos: 1020}, {nombre: 'Harry', apellido: 'Potter', referidos: 120}, {nombre: 'Lionel', apellido: 'Messi', referidos: 1120}, {nombre: 'Peter', apellido: 'Parker', referidos: 130}]


    return participantes
}

export { getAllDescription, getAllParticipants }