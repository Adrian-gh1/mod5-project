// frontend/src/components/DeleteReviewModal/DeleteReviewModal.jsx

import { useDispatch } from "react-redux";
import { useModal } from '../../context/Modal';
import { deleteReview, spotDetails } from "../../store/spots";

const DeleteReviewModal = ({ reviewId, spotId }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleYes = async () => {
        await dispatch(deleteReview(reviewId));
        await dispatch(spotDetails(spotId));
        closeModal();
    };

    const handleNo = () => {
        closeModal();
    };

    return (
        <div className="delete-modal-container">
            <h2>Confirm Delete</h2>
            <div>Are you sure you want to delete this review?</div>
            <button onClick={handleYes} className="yes-button">Yes (Delete Review)</button>
            <button onClick={handleNo}>No (Keep Review)</button>
        </div>
    );
}

export default DeleteReviewModal;