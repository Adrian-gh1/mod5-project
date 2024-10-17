// frontend/src/components/CreateSpotFormPage/CreateSpotFormPage.jsx

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const CreateSpotFormPage = () => {

    const dispatch = useDispatch();

    return (
        <div className='container'>
            Create a New Spot
        </div>
    );
};

export default CreateSpotFormPage;