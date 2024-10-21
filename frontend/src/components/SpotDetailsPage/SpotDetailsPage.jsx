// frontend/src/components/SpotDetailsPage/SpotDetailsPage.jsx

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import { spotDetails } from '../../store/spots';
import { useModal } from '../../context/Modal';
import ReviewFormModal from "../ReviewFormModal/ReviewFormModal";
import DeleteReviewModal from '../DeleteReviewModal';
import './SpotDetailsPage.css';

const SpotDetailsPage = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const spot = useSelector(state => state.spots.selectedSpot);
    const spotReviews = useSelector(state => state.spots.spotReviews);
    const currentUser = useSelector(state => state.session.user);

    const { setModalContent } = useModal();

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

    const reviewSubmitted = () => {
        dispatch(spotDetails(id));
    };

    const handleReviewButton = () => {
        setModalContent(<ReviewFormModal spotId={id} currentUser={currentUser} reviewSubmitted={reviewSubmitted}/>);
    };

    const handleDeleteReviewButton = (reviewId) => {
        console.log('Data 1:', reviewId);
        
        setModalContent(<DeleteReviewModal spotId={id} reviewId={reviewId} currentUser={currentUser}/>);
    };

    const ownerVerification = currentUser && currentUser.id === spot.Owner.id;
    const reviewVerification = currentUser && spotReviews.some(review => review.userId === currentUser?.id);

    return (
        <div className='spot-container'>
            <div className='spot-title'>
                <h1>{spot.name}</h1>
                <div>
                    {spot.city}, {spot.state}, {spot.country}
                </div>
            </div>
            <div className='image-container'>
                <img src={spot.SpotImages[0]?.url} className='large-image'/>
                <div className='small-image-container'>
                    {spot.SpotImages.slice(1).map((image, index) => (
                        <img src={image.url} alt={`Image ${index + 1}`} key={index} className='small-images'/>
                    ))}
                </div>
            </div>
            <div className='spot-contents'>
                <div>
                    <h3>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h3>
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
                <div className='review-button'>
                    {currentUser && !reviewVerification && !ownerVerification && (
                        <button onClick={handleReviewButton}>Post Your Review</button>
                    )}
                </div>
                <div>
                    {spotReviews.length > 0 ? (
                        spotReviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map(({ User, createdAt, userId, review, id}) => {                      
                            const options = { year: 'numeric', month: 'long' };
                            
                            return (
                                <div className='review-list' key={userId}>
                                    <div>{User.firstName}</div>
                                    <div>{new Date(createdAt).toLocaleDateString(undefined, options)}</div>
                                    {review}
                                    <div>
                                        {currentUser && userId === currentUser.id && (
                                            <div className='delete-review-button'>
                                                <button onClick={() => handleDeleteReviewButton(id)}>Delete</button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })
                    ) : !ownerVerification && (
                        <div>Be the first to post a review!</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SpotDetailsPage;