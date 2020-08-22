import { takeEvery, put } from 'redux-saga/effects';
import { PROFILE_REQUEST, PROFILE_UPDATE_REQUEST } from '../types';
import { profileSuccess, profileUpdateSuccess, setError } from '../actions';
import axios from '../api';

function* profileSaga() {
  try {
    const data = yield axios.get('/profile').then((response) => response.data);

    yield put(profileSuccess(data));
  } catch (error) {
    yield put(setError(error.message));
  }
}

function* profileUpdateSaga({ payload: { about } }) {
  try {
    const data = yield axios
      .put('/profile', { about })
      .then((response) => response.data);

    yield put(profileUpdateSuccess(data));
  } catch (error) {
    yield put(setError(error.message));
  }
}

export default function* watchProfile() {
  yield takeEvery(PROFILE_REQUEST, profileSaga);
  yield takeEvery(PROFILE_UPDATE_REQUEST, profileUpdateSaga);
}
