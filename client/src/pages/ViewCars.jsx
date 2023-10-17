import React from 'react'
import { useState, useEffect } from 'react'
import '../App.css'
import './ViewCars.css'
import CarsAPI from '../../services/CarsAPI'
import Car from '../components/Car'

const ViewCars = () => {

    const [cars, setCars] = useState([])

    useEffect(() => {
        (async () => {
            try {
                const data = await CarsAPI.getAllCars()
                setCars(data)

                
                
            } catch (error) {
                throw error
            }
        }) ()
    }, [])

    
    return (
        <div className="main">
            {
                cars && cars.length > 0 ? cars.map((car) => 
                    <Car key={car.id} car={car} />
                ) : <h3>{'No cars were found 😔'}</h3>
            } 
        </div>
    )
}



export default ViewCars