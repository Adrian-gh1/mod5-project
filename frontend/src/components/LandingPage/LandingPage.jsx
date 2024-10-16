// frontend/src/components/LandingPage/LandingPage.jsx

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';
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
                    <NavLink to={`/spots/${spot.id}`} key={spot.id} className='tile' title={spot.name}>
                        <img src={spot.previewImage} alt={spot.name} />
                        <div className='tile-info'>
                            <p>{spot.city}, {spot.state}</p>
                            <p>{spot.aveReviews > 0 ? spot.aveRating.toFixed(2) : 'New'}</p>                                
                        </div>
                        <p>${spot.price}/night</p>
                    </NavLink>
                ))}
            </div>
        </div>
    );
};

export default LandingPage;