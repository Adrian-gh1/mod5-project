// frontend/src/store/spots.js

import { csrfFetch } from './csrf';

const LOAD_SPOTS = 'spots/loadSpots';
const initialState = [];

export const loadSpots = (spots) => {
    return {
        type: LOAD_SPOTS,
        spots
    };
};

export const allspots = () => async (dispatch) => {

  const response = await csrfFetch('/api/spots', {
    method: 'GET'
  });
  const data = await response.json();
  dispatch(loadSpots(data.Spots));
  return response;
};

const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SPOTS:
      return action.spots;
    default:
      return state;
  }
};

export default spotsReducer;