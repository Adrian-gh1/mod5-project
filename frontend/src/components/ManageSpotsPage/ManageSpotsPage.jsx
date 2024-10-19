// frontend/src/components/ManageSpotsPage/ManageSpotsPage.jsx

import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userSpots } from '../../store/spots';

const ManageSpotsPage = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user);
    const userSpotList = useSelector(state => state.spots.userSpots);

    useEffect(() => {
        if (currentUser) {
            dispatch(userSpots());
        }
    }, [dispatch, currentUser]);

    return (
        <div>
            <h2>Manage Spots</h2>
            {userSpotList.length > 0 ? (
                userSpotList.map(spot => (
                    <div key={spot.id}>
                        {spot.name}
                        {spot.city}
                        {spot.state}
                        {spot.price}
                    </div>
                ))

            ) : (
                <div></div>
            )}
        </div>
    );
};

export default ManageSpotsPage;