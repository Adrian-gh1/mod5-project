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
                    <div key={spot.id} className='tile' title={spot.name}>
                        <img src={spot.previewImage} alt={spot.name} />
                        {/* <h2>{spot.name}</h2> */}
                        <p>{spot.city}, {spot.state}</p>
                        {/* <p>${spot.price}/night</p> */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LandingPage;