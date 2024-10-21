// frontend/src/components/UpdateSpotFormPage/UpdateSpotFormPage.jsx

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { spotDetails, updateSpot } from "../../store/spots";

const UpdateSpotFormPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const selectedSpot = useSelector(state => state.spots.selectedSpot);
    
    const { id } = useParams();
    const [country, setCountry] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [name, setName] = useState('');
    const [images, setImages] = useState([]);

    const [errors, setErrors] = useState({});

    useEffect(() => {
        const loadSpot = async () => {
            await dispatch(spotDetails(id));
        };
        loadSpot();
    }, [dispatch, id]);

    useEffect(() => {
        if (selectedSpot) {
            setCountry(selectedSpot.country);
            setAddress(selectedSpot.address);
            setCity(selectedSpot.city);
            setState(selectedSpot.state);
            setDescription(selectedSpot.description);
            setPrice(selectedSpot.price);
            setName(selectedSpot.name);
            // setImages(selectedSpot.images || []);
            const spotImages = selectedSpot.SpotImages.map(img => img.url);
            setImages([...spotImages]);
        }
    }, [selectedSpot]);

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

        const updatedSpotData = {
            country,
            address,
            city,
            state,
            description,
            price,
            name,
            lat: 0, // NOTE: Set to any value, won't be used but needed due to backend
            lng: 0, // NOTE: Set to any value, won't be used but needed due to backend
            images: images.filter(img => img.trim() !== '')
        };

        await dispatch(updateSpot(id, updatedSpotData));

        navigate(`/spots/${id}`);
    };  

    return (
        <div className='new-spot-container'>

            <h1>Update your Spot</h1>
            <h3>Where&apos;s your place located?</h3>
            <p>Guests will only get your exact address once they booked a reservation.</p>
            <form onSubmit={handleSubmit}>
                <div className="form-items">
                    <div className="form-item1">
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
                    <div className="form-item5">
                        <label>               
                            <input
                                type="text"
                                value={images[0]}
                                onChange={(e) => {
                                    const newImages = [...images];
                                    newImages[0] = e.target.value;
                                    setImages(newImages);
                                }}
                                placeholder="Preview Image URL"                        
                            />
                        </label>
                        {errors.images && <div className='error'>{errors.images}</div>}

                        <div>
                            <label>               
                                <input
                                    type="text"
                                    value={images[1]}
                                    onChange={(e) => {
                                        const newImages = [...images];
                                        newImages[1] = e.target.value;
                                        setImages(newImages);
                                    }}
                                    placeholder="Image URL"                        
                                />
                            </label>
                        </div>

                        <div>
                            <label>               
                                <input
                                    type="text"
                                    value={images[2]}
                                    onChange={(e) => {
                                        const newImages = [...images];
                                        newImages[2] = e.target.value;
                                        setImages(newImages);
                                    }}
                                    placeholder="Image URL"                        
                                />
                            </label>
                        </div>

                        <div>
                            <label>               
                                <input
                                    type="text"
                                    value={images[3]}
                                    onChange={(e) => {
                                        const newImages = [...images];
                                        newImages[3] = e.target.value;
                                        setImages(newImages);
                                    }}
                                    placeholder="Image URL"                        
                                />
                            </label>
                        </div>

                        <div>
                            <label>               
                                <input
                                    type="text"
                                    value={images[4]}
                                    onChange={(e) => {
                                        const newImages = [...images];
                                        newImages[4] = e.target.value;
                                        setImages(newImages);
                                    }}
                                    placeholder="Image URL"                        
                                />
                            </label>
                        </div>
                    </div>
                </div>

                <div className="create-spot-button">
                    <button type='submit'>Update Spot</button>
                </div>

            </form>
        </div>
    );
};

export default UpdateSpotFormPage;