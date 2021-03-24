import {ActionType} from './action';
import {AuthorizationStatus} from '../utils/const';
import {LoadedStatus, Filter, CITY_BY_DEFAULT} from '../utils/const';

const initialState = {
  city: CITY_BY_DEFAULT,
  offers: [],
  reviews: [],
  sortType: Filter.POPULAR,
  isDataLoaded: LoadedStatus.NOT_LOADED,
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  authInfo: {},
  isOfferLoaded: LoadedStatus.NOT_LOADED,
  offer: {},
  offersNear: [],
  favoritesOffers: [],
  isFavoritesOffersLoaded: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return {
        ...state,
        city: action.payload
      };

    case ActionType.CHANGE_SORT_TYPE:
      return {
        ...state,
        sortType: action.payload
      };

    case ActionType.LOAD_OFFERS:
      return {
        ...state,
        offers: action.payload,
        isDataLoaded: LoadedStatus.LOADED
      };

    case ActionType.LOAD_REVIEWS:
      return {
        ...state,
        reviews: action.payload,
      };

    case ActionType.REQUIRED_AUTHORIZATION:
      return {
        ...state,
        authorizationStatus: action.payload,
      };

    case ActionType.LOAD_AUTH_INFO:
      return {
        ...state,
        authInfo: action.payload,
      };

    case ActionType.LOAD_OFFER:
      return {
        ...state,
        offer: action.payload,
        isOfferLoaded: LoadedStatus.LOADED
      };
    case ActionType.LOAD_OFFERS_NEAR:
      return {
        ...state,
        offersNear: action.payload,
      };
    case ActionType.LOAD_FAVORITES_OFFERS:
      return {
        ...state,
        favoritesOffers: action.payload,
        isFavoritesOffersLoaded: LoadedStatus.LOADED
      };
    case ActionType.UPDATE_OFFERS:
      return {
        ...state,
        offers: state.offers.map((offer) => offer.id === action.payload.id ? action.payload : offer),
      };
    case ActionType.UPDATE_OFFER:
      return {
        ...state,
        offer: action.payload
      };
    case ActionType.UPDATE_OFFER_LOADED_STATUS:
      return {
        ...state,
        isOfferLoaded: action.payload,
      };
    case ActionType.UPDATE_OFFERS_NEAR:
      return {
        ...state,
        offersNear: state.offersNear.map((offer) => offer.id === action.payload.id ? action.payload : offer),
      };
    case ActionType.UPDATE_FAVORITES_OFFERS:
      return {
        ...state,
        favoritesOffers: state.favoritesOffers.map((offer) => offer.id === action.payload.id ? action.payload : offer),
      };
  }

  return state;
};

export {reducer};
