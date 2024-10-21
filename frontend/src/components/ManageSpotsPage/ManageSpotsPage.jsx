// frontend/src/components/ManageSpotsPage/ManageSpotsPage.jsx

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import { userSpots } from '../../store/spots';
import { useModal } from '../../context/Modal';
import DeleteSpotModal from '../DeleteSpotModal/DeleteSpotModal';
// import './ManageSpotsPage.css';
import './ManageSpotsPage.css';

const ManageSpotsPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentUser = useSelector(state => state.session.user);
    const userSpotList = useSelector(state => state.spots.userSpots);
    const { setModalContent } = useModal();

    useEffect(() => {
        if (currentUser) {
            dispatch(userSpots());
        }
    }, [dispatch, currentUser]);

    const handleUpdateButton = (spotId) => {
        navigate(`/spots/${spotId}/edit`);
    };

    const handleDeleteButton = (spotId) => {
        setModalContent(<DeleteSpotModal spotId={spotId}/>);
    };

    return (
        <div className='tile-container'>
            <h2>Manage Spots</h2>
            {userSpotList.length > 0 ? (
                    <div>
                        {userSpotList.map(spot => (
                            <div key={spot.id}>
                                <div className='tile'>
                                    <NavLink to={`/spots/${spot.id}`} title={spot.name}>
                                        <img src={spot.previewImage} alt={spot.name} />
                                        <div className='tile-info'>
                                            <p>{spot.city}, {spot.state}</p>
                                            <p> <FaStar /> {typeof spot.avgRating === 'number' && spot.avgRating > 0 ? spot.avgRating.toFixed(2) : 'New'}</p>                            
                                        </div>
                                        <p>${spot.price}/night</p>
                                    </NavLink>
                                </div>
                                <div className='update-delete-buttons'>
                                    <button onClick={() => handleUpdateButton(spot.id)}>Update</button>
                                    <button onClick={() => handleDeleteButton(spot.id)}>Delete</button>
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