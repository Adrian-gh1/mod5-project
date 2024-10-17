// frontend/src/store/spots.js

import { csrfFetch } from './csrf';

const LOAD_SPOTS = 'spots/loadSpots';
const LOAD_SPOT_DETAILS = 'spots/loadSpotDetails';
const LOAD_SPOT_REVIEWS = 'spots/loadSpotReviews';
const initialState = {
  spots: [],
  selectedSpot: null,
  spotReviews: []
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

export const loadSpotReviews = (reviews) => {
  return {
    type: LOAD_SPOT_REVIEWS,
    reviews
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

  const reviewResponse = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: 'GET'
  });
  const reviewData = await reviewResponse.json();
  dispatch(loadSpotReviews(reviewData.Reviews));

  return {response, reviewData: reviewData.Reviews};
};

const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SPOTS:
      return { ...state, spots: action.spots};
    case LOAD_SPOT_DETAILS:
      return { ...state, selectedSpot: action.spot};
    case LOAD_SPOT_REVIEWS:
      return { ...state, spotReviews: action.reviews}
    default:
      return state;
  }
};

export default spotsReducer;