// frontend/src/store/spots.js

import { csrfFetch } from './csrf';

const LOAD_SPOTS = 'spots/loadSpots';
const LOAD_SPOT_DETAILS = 'spots/loadSpotDetails';
const initialState = {
  spots: [],
  selectedSpot: null
};

export const loadSpots = (spots) => {
    return {
        type: LOAD_SPOTS,
        spots
    };
};

export const loadSpotDetails = (spot) => {
  return {
    type: LOAD_SPOT_DETAILS,
    spot
  };
};

export const allSpots = () => async (dispatch) => {
  const response = await csrfFetch('/api/spots', {
    method: 'GET'
  });
  const data = await response.json();
  dispatch(loadSpots(data.Spots));
  return response;
};

export const spotDetails = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: 'GET'
  });
  const data = await response.json();
  dispatch(loadSpotDetails(data));
  return response;
};

const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SPOTS:
      return { ...state, spots: action.spots};
    case LOAD_SPOT_DETAILS:
      return { ...state, selectedSpot: action.spot}; 
    default:
      return state;
  }
};

export default spotsReducer;