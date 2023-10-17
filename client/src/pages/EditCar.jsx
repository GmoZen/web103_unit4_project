import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import '../App.css'
import './EditCar.css'
import CarsAPI from '../../services/CarsAPI'
import wheelOptions from '../../utilities/wheelOptions'
import tireOptions from '../../utilities/tireOptions'
import Car from '../components/Car'

const EditCar = () => {

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


    const handleChange = (event) => {
        const { name, value } = event.target

        setCar((prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }


    const handleOptionsChange = (event) => {
        const { name, value } = event.target

        setCar((prev) => {
            let currImage

            if (name === "wheels") {
                currImage = wheelOptions[value].url
            } else if (name == "tires") {
                currImage = tireOptions[value].url
            }

            const newPrice = (tireOptions[car.tires].price + wheelOptions[car.wheels].price)
          

            return {
                ...prev,
                [name]:value,
                [name + "Image"]: currImage,
                totalPrice: newPrice.toString()

            }
        })
    }
    
    const updateCar = (event) => {
        event.preventDefault()

        const selectedTire = car.tires;
        const selectedWheel = car.wheels;

        // Check if both tire and wheel options are selected
        if (
            (selectedTire == "Coker" && selectedWheel != "OG Wires") ||
            (selectedWheel == "OG Wires" && selectedTire != "Coker")
        ) {
            // alert('Coker tires and OG Wires wheels are only compatible with each other. Please select another combination.');
            showToast()
            return; // Prevent further processing
        }

        CarsAPI.updateCar(car)
        window.location = '/'
    }

    // Function to show the toast message
    function showToast() {
        const toast = document.getElementById('customToast');
        toast.style.display = 'block';
    
        setTimeout(() => {
         toast.style.display = 'none';
        }, 3000); // Hide the toast after 3 seconds (adjust the time as needed)
    }


    const deleteCar = (event) => {
        event.preventDefault()

        CarsAPI.deleteCar(car.id)
        window.location = '/'
    }

    
    return (
        <div className='EditGift'>
            <p>Total Package Cost: {car.totalPrice}</p>
            <br />
            <form>
                <label>Name</label> <br />
                <input type='text' id='name' name='name' value={car.name} onChange={handleChange} /><br />
                <br/>

                <label>Tires Brand</label><br />
                <select id="tires" name="tires" value={car.tires} onChange={handleOptionsChange}>
                    {Object.keys(tireOptions).map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
                <br />
                <br />
                <label>Tires Photo</label><br />
                <img className="tireImage" src={car.tiresImage}/><br />
                <br/>
                <br/>
                <label>Wheels Brand</label><br />
                <select id="wheels" name="wheels" value={car.wheels} onChange={handleOptionsChange}>
                    {Object.keys(wheelOptions).map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
                <br />
                <br />
                <label>Wheels Photo</label><br />
                <img className="wheelImage" src={car.wheelsImage}/><br />
                <br />
                <br/>

                <div id="customToast" className="toast">
                    Coker tires and OG Wires wheels are only compatible with each other. Please select another combination.
                </div>

                <input className='submitButton' type='submit' value='Submit' onClick={updateCar} />
                <button className='deleteButton' onClick={deleteCar}>Delete</button>
            </form>
        </div>
    )
}

export default EditCar