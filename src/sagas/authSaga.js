import { takeEvery, put, call } from 'redux-saga/effects';
import { AUTH_SIGN_IN_REQUEST, AUTH_SIGN_OUT_REQUEST } from '../types';

import { signInSuccess, signOutSuccess, setError } from '../actions';

import axios from '../api';

function* signInSaga({ payload: { login, password } }) {
  try {
    const user = yield axios
      .post('/signIn', { login, password })
      .then((response) => response.data);

    yield localStorage.setItem('jwtToken', JSON.stringify(user.token));

    yield put(signInSuccess(user));
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

export default function* watchAuth() {
  yield takeEvery(AUTH_SIGN_IN_REQUEST, signInSaga);
  yield takeEvery(AUTH_SIGN_OUT_REQUEST, signOutSaga);
}
