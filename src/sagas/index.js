import { fork } from 'redux-saga/effects';
import watchAuth from './authSaga';

function* rootSaga() {
  yield fork(watchAuth);
}

export default rootSaga;
