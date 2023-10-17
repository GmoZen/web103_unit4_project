import { pool } from '../config/database.js'

const getCars = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM cars ORDER BY id ASC')
        res.status(200).json(results.rows)
    } catch (error) {
        res.status(409).json( { error: error.message } )
    }
}

const getCarById = async (req, res) => {
    try {
        const carId = req.params.carId
        const selectQuery = `SELECT name, totalPrice, wheels, wheelsImage, tires, tiresImage FROM cars WHERE id = $1`
        const results = await pool.query(selectQuery, [carId])

        res.status(200).json(results.rows[0])
    } catch (error) {
        res.status(409).json( { error: error.message })
    }
}


const createCar = async (req, res) => {
    try {
        const { name, totalPrice, wheels, wheelsImage, tires, tiresImage } = req.body
        const results = await pool.query(`
            INSERT INTO cars (name, totalPrice, wheels, wheelsImage, tires, tiresImage)
            VALUES($1, $2, $3, $4, $5, $6)
            RETURNING *`,
            [name, totalPrice, wheels, wheelsImage, tires, tiresImage]
        )
        res.status(201).json(results[0])

    } catch (error) {
        res.status(409).json( { error: error.message } )
    }
}


const updateCar = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const { name, totalPrice, wheels, wheelsImage, tires, tiresImage } = req.body
        const results = await pool.query(`
            UPDATE cars SET name = $1, totalPrice = $2, wheels = $3, wheelsImage = $4, tires = $5, tiresImage = $6 WHERE id = $7`,
            [name, totalPrice, wheels, wheelsImage, tires, tiresImage, id]
        )
        res.status(200).json(results.rows[0])
    } catch(error) {
        res.status(409).json({ error: error.message})
    }
}


const deleteCar = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const results = await pool.query(`DELETE FROM cars WHERE id = $1`, [id])
        res.status(200).json(results.rows[0])
    } catch(error) {
        res.status(409).json( { error: error.message })
    }
}

export default { 
    getCars,
    getCarById,
    createCar,
    updateCar,
    deleteCar
}