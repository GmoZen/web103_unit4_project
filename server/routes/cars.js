import express from 'express'
import CarsController from '../controllers/cars.js'

const router = express.Router()

router.get('/', CarsController.getCars)

router.get('/:carId', CarsController.getCarById)

router.post('/', CarsController.createCar)

router.delete('/:id', CarsController.deleteCar)

router.patch('/:id', CarsController.updateCar)



export default router