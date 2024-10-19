// frontend/src/components/ReviewFormModal/ReviewFormModal.jsx

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { FaRegStar } from 'react-icons/fa';
import './ReviewFormModal.css'

const ReviewFormModal = () => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(1);

    const handleSubmit = (e) => {
        e.preventDefault();
        closeModal();
    };
    
    return (
        <div className='review-form-container'>
            <h3>How was your stay?</h3>
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
                    <FaRegStar/> <FaRegStar/> <FaRegStar/> <FaRegStar/> <FaRegStar/> Stars
                </div>
            </form>
        </div>
    );
};

export default ReviewFormModal;