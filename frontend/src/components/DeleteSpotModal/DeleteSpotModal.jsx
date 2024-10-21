// frontend/src/components/DeleteSpotModal/DeleteSpotModal.jsx

import { useDispatch } from "react-redux";
import { useModal } from '../../context/Modal';
import { deleteSpot, userSpots } from "../../store/spots";
import './DeleteSpotModal.css';

const DeleteSpotModal = ({spotId}) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleYes = async () => {
        await dispatch(deleteSpot(spotId));
        await dispatch(userSpots());
        closeModal();
    };

    const handleNo = () => {
        closeModal();
    };

    return (
        <div className="delete-modal-container">
            <h2>Confirm Delete</h2>
            <div>Are you sure you want to remove this spot?</div>
            <div></div>
            <button onClick={handleYes} className="yes-button">Yes (Delete Spot)</button>
            <button onClick={handleNo}>No (Keep Spot)</button>
        </div>
    );
};

export default DeleteSpotModal;