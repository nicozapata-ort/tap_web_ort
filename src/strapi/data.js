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
    const participantes = [{id: 1, nombre: 'Francisco Maximiliano', apellido: 'Gonzalez', referidos: 150}, {id: 2, nombre: 'Roberto Elizabeth Ester', apellido: 'Meza', referidos: 1390}, {id: 3, nombre: 'Javier', apellido: 'Lopez', referidos: 1020}, {id: 4, nombre: 'Harry', apellido: 'Potter', referidos: 120}, {id: 5, nombre: 'Lionel', apellido: 'Messi', referidos: 1120}, {id: 6, nombre: 'Peter', apellido: 'Parker', referidos: 130}]


    return participantes
}

async function getAllParticipants2(){
    try {
        const { data } = await axios.get('http://localhost:1337/usuarios')
        data.sort((a,b) => b.Referidos - a.Referidos)
        return data
    } catch (error) {
        console.log(error)
    }
}

export { getAllDescription, getAllParticipants, getAllParticipants2 }