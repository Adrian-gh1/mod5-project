// frontend/src/components/CreateSpotFormPage/CreateSpotFormPage.jsx

// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import './CreateSpotFormPage.css';

const CreateSpotFormPage = () => {
    // const dispatch = useDispatch();
    // const [country, setCountry] = useState('');


    return (
        <div className='container'>

            <h1>Create a New Spot</h1>
            <h3>Where&aposs your place located?</h3>
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

            <h3>Describe your place to guests</h3>
            <p>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</p>
            <form className="form-items">
                <label>                    
                    <input
                        type="text"
                        placeholder="Please write at least 30 characters"                        
                    />
                </label>
            </form>

            
        </div>
    );
};

export default CreateSpotFormPage;