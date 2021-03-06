import { takeEvery, put } from 'redux-saga/effects';
import { PROFILE_REQUEST, PROFILE_UPDATE_REQUEST } from '../types';
import {
  profileSuccess,
  profileUpdateSuccess,
  signOutRequest,
} from '../actions';
import axios from '../api';

function* profileSaga() {
  try {
    const data = yield axios.get('/profile').then((response) => response.data);

    yield put(profileSuccess(data));
  } catch (error) {
    yield put(signOutRequest());
  }
}

function* profileUpdateSaga({ payload: { about, name, location } }) {
  try {
    const data = yield axios
      .put('/profile', { about, name, location })
      .then((response) => response.data);

    yield put(profileUpdateSuccess(data));
  } catch (error) {
    yield put(signOutRequest());
  }
}

export default function* watchProfile() {
  yield takeEvery(PROFILE_REQUEST, profileSaga);
  yield takeEvery(PROFILE_UPDATE_REQUEST, profileUpdateSaga);
}
