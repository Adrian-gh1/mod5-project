// frontend/src/components/ManageSpotsPage/ManageSpotsPage.jsx

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import { userSpots } from '../../store/spots';
// import './ManageSpotsPage.css';

const ManageSpotsPage = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user);
    const userSpotList = useSelector(state => state.spots.userSpots);

    useEffect(() => {
        if (currentUser) {
            dispatch(userSpots());
        }
    }, [dispatch, currentUser]);

    return (
        <div className='tile-container'>
            <h2>Manage Spots</h2>
            {userSpotList.length > 0 ? (
                    <div className='tile-list'>
                        {userSpotList.map(spot => (
                            <div key={spot.id}>
                                <div className='tile'>
                                    <NavLink to={`/spots/${spot.id}`} title={spot.name}>
                                        <img src={spot.previewImage} alt={spot.name} />
                                        <div className='tile-info'>
                                            <p>{spot.city}, {spot.state}</p>
                                            <p> <FaStar /> {spot.avgRating > 0 ? spot.avgRating.toFixed(2) : 'New'}</p>                                
                                        </div>
                                        <p>${spot.price}/night</p>
                                    </NavLink>
                                </div>
                                <div className='update-delete-buttons'>
                                    <button>Update</button>
                                    <button>Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
            ) : (
                <NavLink to="/spots/new" >
                    Create a New Spot
                </NavLink>
            )}        
        </div>
);
};

export default ManageSpotsPage;