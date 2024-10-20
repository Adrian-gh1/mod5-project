// frontend/src/store/spots.js

import { csrfFetch } from './csrf';

const LOAD_SPOTS = 'spots/loadSpots';
const LOAD_SPOT_DETAILS = 'spots/loadSpotDetails';
const LOAD_SPOT_REVIEWS = 'spots/loadSpotReviews';
const CREATE_SPOT = 'spots/createSpot';
const ADD_IMAGE = 'spots/addImage';
const ADD_REVIEW = 'spots/addReview';
const LOAD_USER_SPOTS = 'spots/loadUserSpots'
const UPDATE_SPOT = 'spots/updateSpot';
const DELETE_SPOT = 'spots/deleteSpot';
const DELETE_REVIEW = 'spots/deleteReview';
const initialState = {
  spots: [],
  selectedSpot: null,
  spotReviews: [],
  userSpots: []
};

// Acion Creators
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

export const addSpot = (spot) => {
  return {
    type: CREATE_SPOT,
    spot
  };
};

export const imageAction = (image) => {
  return {
    type: ADD_IMAGE,
    image
  };
};

export const reviewAction = (review) => {
  return {
    type: ADD_REVIEW,
    review
  };
};

export const userSpotsAction = (userSpots) => {
  return {
    type: LOAD_USER_SPOTS,
    userSpots
  };
};

export const updateSpotAction = (spot) => {
  return {
    type: UPDATE_SPOT,
    spot
  };
};

export const deleteSpotAction = (spotId) => {
  return {
    type: DELETE_SPOT,
    spotId
  };
};

export const deleteReviewAction = (reviewId) => {
  return {
    type: DELETE_REVIEW,
    reviewId
  };
};

// Thunk Actions
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

export const createSpot = (spotData) => async (dispatch) => {
  const response = await csrfFetch('/api/spots', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(spotData)
  });
  const data = await response.json();
  dispatch(addSpot(data));
  return data;
};

export const addImage = (spotId, imageData) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/images`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(imageData)
  });
  const data = await response.json();
  dispatch(imageAction(data));
  return data;
}; 

export const addReview = (spotId, reviewData) => async (dispatch) => {  
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(reviewData)
  });
  const data = await response.json();

  const userData = {
    ...data,
    User: {
        id: reviewData.User.id,
        firstName: reviewData.User.firstName,
        lastName: reviewData.User.lastName
    }
  };

  dispatch(reviewAction(userData));
  return userData;
};

export const userSpots = () => async (dispatch) => {
  const response = await csrfFetch('/api/spots/current', {
    method: 'GET',
  });
  const data = await response.json();  
  dispatch(userSpotsAction(data.Spots));
  return data;
};

export const updateSpot = (spotId, spotData) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(spotData)
  });
  const data = await response.json();  
  dispatch(updateSpotAction(data));
  return data;
};

export const deleteSpot = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: 'DELETE',
  });
  const data = await response.json();  
  dispatch(deleteSpotAction(spotId));
  return data;
};

export const deleteReview = (reviewId) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: 'DELETE',
  });
  const data = await response.json();  
  dispatch(deleteReviewAction(reviewId));
  return data;
};

// Reducer
const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SPOTS:
      return { ...state, spots: action.spots};
    case LOAD_SPOT_DETAILS:
      return { ...state, selectedSpot: action.spot};
    case LOAD_SPOT_REVIEWS:
      return { ...state, spotReviews: action.reviews};
    case CREATE_SPOT:
      return { ...state, spots: [ ...state.spots, action.spot]};
    case ADD_IMAGE:
      return { ...state, selectedSpot: { ...state.selectedSpot, SpotImages: [...state.selectedSpot.SpotImages, action.image]}};
    case ADD_REVIEW:
      return { ...state, spotReviews: [action.review, ...state.spotReviews]}; // NOTE: action.review is first so that the rview shows up at the top o fthe review list
    case LOAD_USER_SPOTS:
      return { ...state, userSpots: action.userSpots}
    case UPDATE_SPOT:
      return { ...state, spots: state.spots.map(spot => (spot.id === action.spot.id ? action.spot : spot))}
    case DELETE_SPOT:
      return { ...state, spots: state.spots.filter(spot => spot.id !== action.spotId)};
    case DELETE_REVIEW:
      return { ...state, spotReviews: state.spotReviews.filter(review => review.id !== action.reviewId)};
    default:
      return state;
  }
};

export default spotsReducer;