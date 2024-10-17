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
    const spotReviews = useSelector(state => state.spots.spotReviews);

    useEffect(() => {
        dispatch(spotDetails(id))
    }, [dispatch, id]);

    if (!spot) {
        return <div>Loading...</div>
    }

    if (!spotReviews) {
        return <div>Loading...</div>
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
                            <FaStar /> {parseFloat(spot.avgStarRating) > 0 ? parseFloat(spot.avgStarRating).toFixed(2) : 'New'} · {spot.numReviews} reviews
                        </div>
                    </div>
                    <button onClick={handleReserveButton}>Reserve</button>
                </div>
            </div>
            <div className='review-container'>
                <div className='review-header'>
                    <FaStar /> {parseFloat(spot.avgStarRating) > 0 ? parseFloat(spot.avgStarRating).toFixed(2) : 'New'} · {spot.numReviews} reviews
                </div>
                {/* <div>
                    {spotReviews.length > 0 ? (
                        spotReviews.map(({ User, createdAt, userId, review}) => (
                            <div className='review-list' key={userId}>
                                <div>{User.firstName}</div>
                                <div>{createdAt}</div>
                                {review}
                            </div>
                        ))
                    ) : (
                        <div>New</div>
                    )}
                </div> */}
            </div>
        </div>
    );
};

export default SpotDetailsPage;