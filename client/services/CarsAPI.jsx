import { request } from '../utilities/api'

// const postsURL = '/api/cars'
const postsURL = 'http://localhost:3000/cars'

const getAllCars = () => request('GET', postsURL)
const getCarsById = (id) => request('GET', `${postsURL}/${id}`)

// new functions to create, update, and delete blog posts
const createCar = (car) => request('POST', postsURL, car)
const updateCar = (car) => request('PATCH', `${postsURL}/${car.id}`, car)
const deleteCar = (id) => request('DELETE', `${postsURL}/${id}`)

// API URL patterns
// /api/posts    GET
// /api/posts/34 GET
// /api/posts    POST
// /api/posts/55 PATCH
// /api/posts/88 DELETE

export default {
    getAllCars,
    getCarsById,
    createCar,
    updateCar,
    deleteCar
}