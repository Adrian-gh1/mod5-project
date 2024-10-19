// frontend/src/components/ReviewFormModal/ReviewFormModal.jsx

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';

const ReviewFormModal = () => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    
    return (
        <div>
            Review Modal
            <form>

            </form>
        </div>
    );
};

export default ReviewFormModal;