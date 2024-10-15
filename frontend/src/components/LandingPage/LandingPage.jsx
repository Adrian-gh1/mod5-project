// frontend/src/components/LandingPage/LandingPage.jsx

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allspots } from "../../store/spots";
import './LandingPage.css';

const LandingPage = () => {
    const dispatch = useDispatch();
    const spots = useSelector(state => state.spots);

    useEffect(() => {
        dispatch(allspots());
    }, [dispatch]);

    return (
        <div className='tile-container'>
            <div className='tile-list'>
                {spots.map(spot => (
                    <div key={spot.id} className='tile'>
                        <img src={spot.previewImage} alt={`Spot ${spot.name}`} />
                        {/* <h2>Name: {spot.name}</h2>
                        <p>City: {spot.city}, {spot.state}</p>
                        <p>Price: ${spot.price}</p> */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LandingPage;