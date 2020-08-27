import { takeEvery, put, call } from 'redux-saga/effects';
import {
  AUTH_SIGN_IN_REQUEST,
  AUTH_SIGN_UP_REQUEST,
  AUTH_SIGN_OUT_REQUEST,
} from '../types';

import {
  signInSuccess,
  signOutSuccess,
  signUpSuccess,
  setError,
} from '../actions';

import axios from '../api';

function* signInSaga({ payload: { login, password } }) {
  try {
    const data = yield axios
      .post('/signIn', { login, password })
      .then((response) => response.data);

    yield call(
      [localStorage, 'setItem'],
      'jwtToken',
      JSON.stringify(data.token)
    );
    yield put(signInSuccess(data));
  } catch (error) {
    yield put(setError(error.message));
  }
}

function* signOutSaga() {
  try {
    yield call([localStorage, 'removeItem'], 'jwtToken');
    yield put(signOutSuccess());
  } catch (error) {
    yield put(setError(error.message));
  }
}

function* signUpSaga({ payload: { login, password } }) {
  try {
    const data = yield axios
      .post('/signUp', { login, password })
      .then((response) => response.data);

    yield put(signUpSuccess(data));
  } catch (error) {
    yield put(setError(error.message));
  }
}

export default function* watchAuth() {
  yield takeEvery(AUTH_SIGN_IN_REQUEST, signInSaga);
  yield takeEvery(AUTH_SIGN_UP_REQUEST, signUpSaga);
  yield takeEvery(AUTH_SIGN_OUT_REQUEST, signOutSaga);
}
