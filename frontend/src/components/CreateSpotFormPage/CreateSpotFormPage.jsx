// frontend/src/components/CreateSpotFormPage/CreateSpotFormPage.jsx

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createSpot, addImage } from "../../store/spots";
import './CreateSpotFormPage.css';

const CreateSpotFormPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [country, setCountry] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [name, setName] = useState('');
    const [images, setImages] = useState(['']);

    const [errors, setErrors] = useState({});

    const validationErrors = () => {
        const errorList = {};
        if (country.length === 0) errorList.country = 'Country is required';
        if (address.length === 0) errorList.address = 'Address is required';
        if (city.length === 0) errorList.city = 'City is required';
        if (state.length === 0) errorList.state = 'State is required';
        if (description.length < 30) errorList.description = 'Description needs a minimum of 30 characters';
        if (name.length === 0) errorList.name = 'Name is required';
        if (price.length <= 0) errorList.price = 'Price per night is required';
        if (images.length === 0) errorList.images = 'Preview Image URL is required';
        return errorList;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        const errorForm = validationErrors();
        if (Object.keys(errorForm).length > 0) {
            setErrors(errorForm);
            return;
        }

        const newSpotData = {
            country,
            address,
            city,
            state,
            description,
            price,
            name,
            lat: 0, // NOTE: Set to any value, won't be used but needed due to backend
            lng: 0, // NOTE: Set to any value, won't be used but needed due to backend
            // images: [images]
        };

        const newSpot = await dispatch(createSpot(newSpotData));

        await dispatch(addImage(newSpot.id, { url: images, preview: true }));

        navigate(`/spots/${newSpot.id}`);
    };  

    return (
        <div className='new-spot-container'>

            <h1>Create a New Spot</h1>
            <h3>Where&apos;s your place located?</h3>
            <p>Guests will only get your exact address once they booked a reservation.</p>
            <form onSubmit={handleSubmit}>
                <div className="form-items">
                    <label>
                        Country {errors.country && <span className='error'>{errors.country}</span>}
                        <div>
                            <input
                                type="text"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                placeholder="Country"                        
                            />
                        </div>
                    </label>

                    <label>
                        Street Address {errors.address && <span className='error'>{errors.address}</span>}
                        <div>
                            <input
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder="Street Address"                        
                            />
                        </div>
                    </label>

                    <label>
                        City {errors.city && <span className='error'>{errors.city}</span>}
                        <div>
                            <input
                                type="text"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                placeholder="City"                        
                            />
                        </div>
                    </label>

                    <label>
                        State {errors.state && <span className='error'>{errors.state}</span>}
                        <div>
                            <input
                                type="text"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                                placeholder="State"                        
                            />
                        </div>
                    </label>
                </div>

                <div className="form-items">
                    <h3>Describe your place to guests</h3>
                    <p>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</p>
                    <div>
                        <label>                    
                            <input
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Please write at least 30 characters"                        
                            />
                        </label>
                        {errors.description && <div className='error'>{errors.description}</div>}
                    </div>
                </div>

                <div className="form-items">
                    <h3>Create a title for your spot</h3>
                    <p>Catch guests&apos; attention with a spot title that highlights what makes your place special.</p>
                    <label>                    
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Name of your spot"                        
                        />
                    </label>
                    {errors.name && <div className='error'>{errors.name}</div>}
                </div>

                <div className="form-items">
                    <h3>Set a base price for your spot</h3>
                    <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
                    <label>
                        $                  
                        <input
                            type="text"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="Price per night (USD)"                        
                        />
                    </label>
                    {errors.price && <div className='error'>{errors.price}</div>}
                </div>

                <div className="form-items">
                    <h3>Liven up your spot with photos</h3>
                    <p>Submit a link to at least one photo to publish your spot.</p>
                    <div>
                        <label>               
                            <input
                                type="text"
                                value={images}
                                onChange={(e) => setImages(e.target.value)}
                                placeholder="Preview Image URL"                        
                            />
                        </label>
                        {errors.images && <div className='error'>{errors.images}</div>}

                        <div>
                            <label>               
                                <input
                                    type="text"
                                    placeholder="Image URL"                        
                                />
                            </label>
                        </div>

                        <div>
                            <label>               
                                <input
                                    type="text"
                                    placeholder="Image URL"                        
                                />
                            </label>
                        </div>

                        <div>
                            <label>               
                                <input
                                    type="text"
                                    placeholder="Image URL"                        
                                />
                            </label>
                        </div>

                        <div>
                            <label>               
                                <input
                                    type="text"
                                    placeholder="Image URL"                        
                                />
                            </label>
                        </div>
                    </div>
                </div>

                <div>
                    <button type='submit'>Create Spot</button>
                </div>

            </form>
        </div>
    );
};

export default CreateSpotFormPage;