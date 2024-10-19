// frontend/src/components/ReviewFormModal/ReviewFormModal.jsx

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { FaRegStar, FaStar } from 'react-icons/fa';
import './ReviewFormModal.css'

const ReviewFormModal = () => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [errors, setErrors] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // closeModal();

        return dispatch(_______({ review, rating }))
            .then(closeModal)
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.message) {
                setErrors('Server Error');
                }
            });
    };

    const submitButtonDisabled = review.length < 10 || rating === 0;
    
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
                                onClick={() => setRating(index + 1)}
                            >
                                {index < (hover || rating) ? (
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