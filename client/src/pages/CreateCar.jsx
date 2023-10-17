import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import '../App.css'
import './EditCar.css'
import CarsAPI from '../../services/CarsAPI'
import wheelOptions from '../../utilities/wheelOptions'
import tireOptions from '../../utilities/tireOptions'
import Car from '../components/Car'

const CreateCar = () => {

    const { id } = useParams()
    const [car, setCar] = useState({
        id: id, 
        name: "", 
        totalPrice: "420", 
        wheels: "Enkei", 
        wheelsImage: "https://enkei.com/wp-content/uploads/2021/03/Tuning-Categories-2021.jpg", 
        tires: "Bridgestone", 
        tiresImage: "https://i5.walmartimages.com/seo/Bridgestone-Turanza-QuietTrack-225-65-17-102-H-Tire_507c3aa5-e41b-41b0-91de-45113b997024.a0fde5acadf8b88dbb191dbbefdc6085.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF"
    })


    useEffect(() => {
        (async () => {
            try {
                // const data = await CarsAPI.getCarsById(id)


                // setCar({
                //     id: id, 
                //     name: data.name, 
                //     totalPrice: data.totalprice, 
                //     wheels: data.wheels, 
                //     wheelsImage: data.wheelsimage, 
                //     tires: data.tires, 
                //     tiresImage: data.tiresimage
                // });
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
    
    const createCar = (event) => {
        event.preventDefault()

        const selectedTire = car.tires;
        const selectedWheel = car.wheels;

       
        if (
            (selectedTire == "Coker" && selectedWheel != "OG Wires") ||
            (selectedWheel == "OG Wires" && selectedTire != "Coker")
        ) {
            // alert('Coker tires and OG Wires wheels are only compatible with each other. Please select another combination.');
            showToast()
            return; // Prevent further processing
        }

        CarsAPI.createCar(car)
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
    

    // const deleteGift = (event) => {
    //     event.preventDefault()

    //     const options = {
    //         method: 'DELETE'
    //     }

    //     fetch(`http://localhost:3001/gifts/${id}`, options)
    //     window.location = '/'
    // }

    // const initialTireImg = car.tires && tireOptions[car.tires] ? tireOptions[car.tires].price : 0;
    // const initialWheelImg = car.wheels && wheelOptions[car.wheels] ? wheelOptions[car.wheels].price : 0;

    
    return (
        <div className='EditGift'>
            <p>Total Package Cost$: {car.totalPrice}</p>
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

                        (option === "Bridgestone") ?
                        (<option key={option} value={option} selected >
                            {option}
                            </option>) :

                        (<option key={option} value={option} >
                            {option}
                            </option>)
                        
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

                <input className='submitButton' type='submit' value='Submit' onClick={createCar} />
                {/* <button className='deleteButton' onClick={deleteGift}>Delete</button> */}
            </form>
        </div>
    )
}

export default CreateCar