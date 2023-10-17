import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import '../App.css'
import './CarDetails.css'
import CarsAPI from '../../services/CarsAPI'
import wheelOptions from '../../utilities/wheelOptions'
import tireOptions from '../../utilities/tireOptions'
import Car from '../components/Car'

const CarDetails = () => {

    const { id } = useParams()
    const [car, setCar] = useState({
        id: id, 
        name: "", 
        totalPrice: "", 
        wheels: "", 
        wheelsImage: "", 
        tires: "", 
        tiresImage: ""
    })


    useEffect(() => {
        (async () => {
            try {
                const data = await CarsAPI.getCarsById(id)


                setCar({
                    id: id, 
                    name: data.name, 
                    totalPrice: data.totalprice, 
                    wheels: data.wheels, 
                    wheelsImage: data.wheelsimage, 
                    tires: data.tires, 
                    tiresImage: data.tiresimage
                });
            } catch (error) {
                throw error
            }
        }) ()
    }, [id])


    // const handleChange = (event) => {
    //     const { name, value } = event.target

    //     setCar((prev) => {
    //         return {
    //             ...prev,
    //             [name]:value,
    //         }
    //     })
    // }


    // const handleOptionsChange = (event) => {
    //     const { name, value } = event.target

    //     setCar((prev) => {
    //         let currImage

    //         if (name === "wheels") {
    //             currImage = wheelOptions[value].url
    //         } else if (name == "tires") {
    //             currImage = tireOptions[value].url
    //         }

    //         const newPrice = (tireOptions[car.tires].price + wheelOptions[car.wheels].price)
          

    //         return {
    //             ...prev,
    //             [name]:value,
    //             [name + "Image"]: currImage,
    //             totalPrice: newPrice.toString()

    //         }
    //     })
    // }
    
    // const updateCar = (event) => {
    //     event.preventDefault()

    //     CarsAPI.updateCar(car)
    //     window.location = '/'
    // }







    const deleteCar = (event) => {
        event.preventDefault()

        CarsAPI.deleteCar(car.id)
        window.location = '/'
    }

    

    const tirePrice = car.tires && tireOptions[car.tires] ? tireOptions[car.tires].price : 0;
    const wheelPrice = car.wheels && wheelOptions[car.wheels] ? wheelOptions[car.wheels].price : 0;


  
    
    return (
        <div className='CarDetails'>
            
            <br />

            <h2 className='carName'>{car.name}</h2>
            <p className="totalCost">Total Package Cost: {car.totalPrice}</p>

            <section>
                <p className='sectionTitle'>Tire Brand</p>
                <p>{car.tires}</p>
                <img className='tireImage' src={car.tiresImage}/>
                <p className='cost'>Tire Cost: ${tirePrice}</p>
            </section>

            <section>
                <p className='sectionTitle'>Wheel Brand</p>
                <p>{car.wheels}</p>
                <img className='wheelImage' src={car.wheelsImage}/>
                <p className='cost'>Wheel Cost: ${ wheelPrice }</p>
            </section>

            

            <a href={'/edit/' + car.id}><button className='editButton'>Edit</button> </a>
            <button className='deleteButton' onClick={deleteCar}>Delete</button>
          

          
        </div>
    )
}

export default CarDetails