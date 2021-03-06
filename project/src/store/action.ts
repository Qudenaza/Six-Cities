import { createAction } from '@reduxjs/toolkit';
import { ActionType } from '../types/action';
import { GroupedByCityOffers, Offer, AuthInfo, Comment } from '../types/types';
import { Location } from '../types/location';
import { AuthorizationStatus } from '../const';

export const changeLocation = createAction(ActionType.ChangeLocation, (location: Location) => ({
  payload: {
    location,
  },
}));

export const setOffers = createAction(ActionType.SetOffers, (value: GroupedByCityOffers) => ({
  payload: {
    value,
  },
}));

export const setNearByOffers = createAction(ActionType.SetNearByOffers, (value: Offer[]) => ({
  payload: {
    value,
  },
}));

export const setFavoriteOffers = createAction(ActionType.SetFavoriteOffers, (value: Offer[]) => ({
  payload: {
    value,
  },
}));

export const removeFromFavorites = createAction(ActionType.RemoveFavoriteOffer, (value: number) => ({
  payload: {
    value,
  },
}));

export const updateOfferFavoriteStatus = createAction(ActionType.UpdateOfferFavoriteStatus, (value: Offer) => ({
  payload: {
    value,
  },
}));

export const setLoadingStatus = createAction(ActionType.SetLoadingStatus, (status: boolean) => ({
  payload: {
    status,
  },
}));


export const setOffer = createAction(ActionType.SetOffer, (value: Offer) => ({
  payload: {
    value,
  },
}));

export const setComments = createAction(ActionType.SetComments, (value: Comment[]) => ({
  payload: {
    value,
  },
}));

export const changeSelectedSortingType = createAction(ActionType.ChangeSelectedSortingType, (value: string) => ({
  payload: {
    value,
  },
}));

export const setAuthorization = createAction(ActionType.SetAuthorization, (value: AuthorizationStatus) => ({
  payload: {
    value,
  },
}));

export const setAuthInfo = createAction(ActionType.SetAuthInfo, (value: AuthInfo) => ({
  payload: {
    value,
  },
}));

export const setLogout = createAction(ActionType.SetLogout, (value: AuthorizationStatus) => ({
  payload: {
    value,
  },
}));
