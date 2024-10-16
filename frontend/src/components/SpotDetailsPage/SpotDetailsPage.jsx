// frontend/src/components/SpotDetailsPage/SpotDetailsPage.jsx

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import { spotDetails } from '../../store/spots';
import './SpotDetailsPage.css';

const SpotDetailsPage = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const spot = useSelector(state => state.spots.selectedSpot);

    useEffect(() => {
        dispatch(spotDetails(id))
    }, [dispatch, id]);

    if (!spot) {
        return (
            <div>
                Loading...
            </div>
        );
    }

    const handleReserveButton = () => {
        alert('Feature coming soon');
    };

    return (
        <div className='container'>
            <h1>{spot.name}</h1>
            <div>
                {spot.city}, {spot.state}, {spot.country}
            </div>
            <div className='image-container'>
                <img src={spot.previewImage} alt={spot.name} className='large-image'/>
                <div className='small-image-container'>
                    {spot.SpotImages.map((image, index) => (
                        <img src={image.url} alt={`Image ${index + 1}`} key={index} className='small-images'/>
                    ))}
                </div>
            </div>
            <div className='contents'>
                <div>
                    <div>
                        Hosted by: {spot.Owner.firstName} {spot.Owner.lastName}
                    </div>
                    <div>{spot.description}</div>
                </div>
                <div className='callout-container'>
                    <div className='callout-header'>
                        <div>${spot.price}/night</div>
                        <div>
                            <FaStar /> {spot.aveReviews > 0 ? spot.aveRating.toFixed(2) : 'New'} · {spot.numReviews} reviews
                        </div>
                    </div>
                    <button onClick={handleReserveButton}>Reserve</button>
                </div>
            </div>
        </div>
    );
};

export default SpotDetailsPage;