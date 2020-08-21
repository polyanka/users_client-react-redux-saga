import {
  AUTH_SIGN_IN_REQUEST,
  AUTH_SIGN_IN_SUCCESS,
  AUTH_SIGN_UP_REQUEST,
  AUTH_SIGN_UP_SUCCESS,
  AUTH_SIGN_OUT_SUCCESS,
  AUTH_SIGN_OUT_REQUEST,
} from '../types';

export const signInRequest = (data) => ({
  type: AUTH_SIGN_IN_REQUEST,
  payload: data,
});

export const signInSuccess = (user) => ({
  type: AUTH_SIGN_IN_SUCCESS,
  payload: user,
});

export const signUpRequest = (data) => ({
  type: AUTH_SIGN_UP_REQUEST,
  payload: data,
});

export const signUpSuccess = (user) => ({
  type: AUTH_SIGN_UP_SUCCESS,
  payload: user,
});

export const signOutRequest = () => ({
  type: AUTH_SIGN_OUT_REQUEST,
});

export const signOutSuccess = () => ({
  type: AUTH_SIGN_OUT_SUCCESS,
});
