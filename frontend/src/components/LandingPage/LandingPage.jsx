// frontend/src/components/LandingPage/LandingPage.jsx

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import { allSpots } from "../../store/spots";
import './LandingPage.css';

const LandingPage = () => {
    const dispatch = useDispatch();
    const spots = useSelector(state => state.spots.spots);

    useEffect(() => {
        dispatch(allSpots());
    }, [dispatch]);

    return (
        <div className='tile-container'>
            {spots.map(spot => (
                <NavLink to={`/spots/${spot.id}`} key={spot.id} className='tile' title={spot.name}>
                    <img src={spot.previewImage} alt={spot.name} />
                    <div className='tile-info'>
                        <p>{spot.city}, {spot.state}</p>
                        <p> <FaStar /> {typeof spot.avgRating === 'number' && spot.avgRating > 0 ? spot.avgRating.toFixed(2) : 'New'}</p>                                
                    </div>
                    <p>${spot.price}/night</p>
                </NavLink>
            ))}
        </div>
    );
};

export default LandingPage;