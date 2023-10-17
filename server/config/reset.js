import { pool } from './database.js'
import './dotenv.js'
// import giftData from '../data/gifts.js'


const createCarsTable = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS cars;

        CREATE TABLE IF NOT EXISTS cars (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            totalPrice VARCHAR(255) NOT NULL,
            wheels VARCHAR(255) NOT NULL,
            wheelsImage VARCHAR(255) NOT NULL,
            tires VARCHAR(255) NOT NULL,
            tiresImage VARCHAR(255) NOT NULL
        )
    `

    try {
        const res = await pool.query(createTableQuery)
        console.log('🎉 cars table created successfully')
    } catch (err) {
        console.error('⚠️ error creating cars table', err)
    }
}



const seedCarsTable = async () => {
    await createCarsTable()

    const insertQuery = {
        text: 'INSERT INTO cars (name, totalPrice, wheels, wheelsImage, tires, tiresImage) VALUES ($1, $2, $3, $4, $5, $6)'
    }

    const values = [
        "Car 1",
        "0",
        "Enkei",
        "https://enkei.com/wp-content/uploads/2021/03/Tuning-Categories-2021.jpg",
        "Bridgestone",
        "https://i5.walmartimages.com/seo/Bridgestone-Turanza-QuietTrack-225-65-17-102-H-Tire_507c3aa5-e41b-41b0-91de-45113b997024.a0fde5acadf8b88dbb191dbbefdc6085.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF"
    ]

    pool.query(insertQuery, values, (err, res) => {
        if (err) {
            console.log('⚠️ error inserting car', err)
            return
        }

        console.log(`✅ Car 1 added successfully`)
    })

   
}

seedCarsTable()



