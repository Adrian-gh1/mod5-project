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
    const currentUser = useSelector(state => state.session.user);

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

    const ownerVerification = currentUser.id === spot.Owner.id;
    const reviewVerification = spotReviews.some(review => review.userId === currentUser?.id);

    return (
        <div className='spot-container'>
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
            <div className='spot-contents'>
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
                            {   spot.numReviews > 1 ? (
                                <div><FaStar /> {parseFloat(spot.avgStarRating).toFixed(2)} · {spot.numReviews}  Reviews</div>
                            ) : spot.numReviews === 1 ? (
                                <div><FaStar /> {parseFloat(spot.avgStarRating).toFixed(2)} · {spot.numReviews}  Review</div>
                            ) : (
                                <div><FaStar /> New</div>
                            )}                            
                        </div>
                    </div>
                    <button onClick={handleReserveButton}>Reserve</button>
                </div>
            </div>
            <div className='review-container'>
                <div className='review-header'>
                    {   spot.numReviews > 1 ? (
                        <div><FaStar /> {parseFloat(spot.avgStarRating).toFixed(2)} · {spot.numReviews} Reviews</div>
                    ) : spot.numReviews === 1 ? (
                        <div><FaStar /> {parseFloat(spot.avgStarRating).toFixed(2)} · {spot.numReviews} Review</div>
                    ) : (
                        <div><FaStar /> New</div>
                    )}
                </div>
                {currentUser && !reviewVerification && !ownerVerification && (
                    <button>Post Your Review</button>
                )}
                <div>
                    {spotReviews.length > 0 ? (
                        spotReviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map(({ User, createdAt, userId, review}) => {
                            const options = { year: 'numeric', month: 'long' };
                            
                            return (
                                <div className='review-list' key={userId}>
                                    <div>{User.firstName}</div>
                                    <div>{new Date(createdAt).toLocaleDateString(undefined, options)}</div>
                                    {review}
                                </div>
                            );
                        })
                    ) : currentUser && !ownerVerification && (
                        <div>Be the first to post a review!</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SpotDetailsPage;