import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Car.css'
// import more from './more.png'

const Car = ( props ) => { 
    
    const [car, setCar] = useState({
        id: 0, 
        name: "", 
        totalPrice: "", 
        wheels: "", 
        wheelsImage: "", 
        tires: "", 
        tiresImage: ""
    })


    useEffect(  () => {
        setCar({
            id: props.car.id, 
            name: props.car.name, 
            totalprice: props.car.totalprice, 
            wheels: props.car.wheels, 
            wheelsimage: props.car.wheelsimage, 
            tires: props.car.tires, 
            tiresimage: props.car.tiresimage
        });
    }, [props.car]);


    const deleteCar = (event) => {
        event.preventDefault()

        // const options = {
        //     method: 'DELETE'
        // }

        // fetch(`http://localhost:3001/gifts/${id}`, options)

        CarsAPI.deleteCar(car.id)
        window.location = '/'
    }


    return (
        <div className="card" >
            <div className='top-container'>
                {/* <Link to={'/edit/' + gift.id}><img src={more} /></Link> */}
            </div>
            <div className='bottom-container'>
                <h3 className='carName'>{car.name}</h3>
                <p>{'Cost of Current Package: $' + car.totalprice}</p>
                <p>{'Wheels: ' + car.wheels}</p>
                <p>{'Tires: ' + car.tires}</p>

                <a href={'/details/' + car.id}>
                    <button className="detailsButton">Details</button>
                </a>

                <a href={'/edit/' + car.id}>
                    <button className="editButton">Edit</button>
                </a>

                <button className='deleteButton' onClick={deleteCar}>Delete</button>
                
            </div>
        </div>
    )
}

export default Car