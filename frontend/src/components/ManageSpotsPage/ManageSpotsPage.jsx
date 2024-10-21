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
        <div>
            <h2>Manage Spots</h2>
            <div className='tile-container'>
                {userSpotList.length > 0 ? (
                    userSpotList.map(spot => (
                        <NavLink to={`/spots/${spot.id}`} key={spot.id} className='tile' title={spot.name}>
                            <img src={spot.previewImage} alt={spot.name} />
                            <div className='tile-info'>
                                <p>{spot.city}, {spot.state}</p>
                                <p><FaStar /> {typeof spot.avgRating === 'number' && spot.avgRating > 0 ? spot.avgRating.toFixed(2) : 'New'}</p>                            
                            </div>
                            <p>${spot.price}/night</p>
                            <div className='update-delete-buttons'>
                                <button onClick={(e) => {
                                    e.preventDefault(); 
                                    handleUpdateButton(spot.id)
                                }} >Update</button>

                                <button onClick={(e) => {
                                    e.preventDefault(); 
                                    handleDeleteButton(spot.id)
                                }}>Delete</button>
                            </div>
                        </NavLink>
                    ))

                ) : (
                    <NavLink to="/spots/new" >
                        Create a New Spot
                    </NavLink>
                )}        
            </div>
        </div>
    );
};

export default ManageSpotsPage;