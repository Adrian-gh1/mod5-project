// frontend/src/components/ReviewFormModal/ReviewFormModal.jsx

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { FaRegStar, FaStar } from 'react-icons/fa';
import { addReview } from '../../store/spots';
import './ReviewFormModal.css'

const ReviewFormModal = ({ spotId, currentUser, reviewSubmitted }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [review, setReview] = useState('');
    const [stars, setStars] = useState(0);
    const [hover, setHover] = useState(0);
    const [errors, setErrors] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors('');

        console.log('Data 1', stars, typeof stars);

        const reviewData = {
            review,
            stars,
            ReviewImages: [],
            User: {
                id: currentUser.id,
                firstName: currentUser.firstName,
                lastName: currentUser.lastName
            }
        };

        return dispatch(addReview(spotId, reviewData))
            .then(() => {
                reviewSubmitted();
                closeModal();
            })
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.message) {
                    setErrors(data.message);
                    // setErrors('Server Error');
                }
            });
    };

    const submitButtonDisabled = review.length < 10 || stars === 0;
    
    return (
        <div className='review-form-container'>
            <h3>How was your stay?</h3>
            {errors && <div className='error-message'>{errors}</div>}
            <form onSubmit={handleSubmit}>
                <div >
                    <input
                        type="text"
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        // rows="5"
                        // style={{ width: '100%', padding: '10px' }}
                        placeholder="Leave your review here..."                        
                    />
                </div>
                <div className='star-rating'>
                    {/* <FaRegStar/> <FaRegStar/> <FaRegStar/> <FaRegStar/> <FaRegStar/> Stars */}
                    {[...Array(5)].map((_, index) => (
                        <span
                                key={index}
                                onMouseEnter={() => setHover(index + 1)}
                                onMouseLeave={() => setHover(0)}
                                onClick={() => setStars(index + 1)}
                            >
                                {index < (hover || stars) ? (
                                    <FaStar color='black' />
                                ) : (
                                    <FaRegStar />
                                )}
                        </span>
                    ))}
                    <span> Stars</span>
                </div>
                <div className='submit-review-button'>
                    <button type='submit' disabled={submitButtonDisabled}>Submit Your Review</button>
                </div>
            </form>
        </div>
    );
};

export default ReviewFormModal;