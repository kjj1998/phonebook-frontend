import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => {
        return response.data
    })
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => {
        return response.data
    })
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => {
        console.log(response.data)
        return response.data
    })
}

const remove = (objectToBeDeleted) => {
    if (window.confirm(`Delete ${objectToBeDeleted.name} ?`) === true) {
        const request = axios.delete(`${baseUrl}/${objectToBeDeleted.id}`)
        return request.then(response => {
            return response.data
        })
    }
}

const phoneService = { getAll, create, update, remove }
export default phoneService
