import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {Action, configureStore, ThunkAction} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import {fork} from 'redux-saga/effects';
import {createWrapper} from 'next-redux-wrapper';

import sessionSlice from './slices/session';
import sessionSagasHandler from './slices/session/sagas';

export type Store = ReturnType<typeof createStore>;

export type RootState = ReturnType<Store['getState']>;

export type Dispatch = Store['dispatch'];

export type Thunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;

export const useAppDispatch = () => useDispatch<Dispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export function* initializeSaga() {
  yield fork(sessionSagasHandler);
}

export const createStore = () => {
  const sagaMiddleware = createSagaMiddleware();

  const store = configureStore({
    reducer: {[sessionSlice.name]: sessionSlice.reducer},
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat([sagaMiddleware]),
    devTools: process.env.NODE_ENV !== 'production',
  });

  sagaMiddleware.run(initializeSaga);

  return store;
};

const store = createWrapper(createStore);

export default store;
