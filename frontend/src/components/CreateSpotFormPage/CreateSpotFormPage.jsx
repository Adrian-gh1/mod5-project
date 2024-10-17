// frontend/src/components/CreateSpotFormPage/CreateSpotFormPage.jsx

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './CreateSpotFormPage.css';

const CreateSpotFormPage = () => {
    const dispatch = useDispatch();
    const [country, setCountry] = useState('');


    return (
        <div className='container'>
            <h1>Create a New Spot</h1>
            <h2>Where's your place located?</h2>
            <p>Guests will only get your exact address once they booked a reservation.</p>
            <form className="form-items">
                <label>
                    Country
                    <input
                        type="text"
                        placeholder="Country"                        
                    />
                </label>

                <label>
                    Street Address
                    <input
                        type="text"
                        placeholder="Street Address"                        
                    />
                </label>

                <label>
                    City
                    <input
                        type="text"
                        placeholder="City"                        
                    />
                </label>

                <label>
                    State
                    <input
                        type="text"
                        placeholder="State"                        
                    />
                </label>
            </form>
        </div>
    );
};

export default CreateSpotFormPage;