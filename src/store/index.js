import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

//// slice
import saveDataSlice from './reducers/saveDataSlice';
import usersSlice from './reducers/usersSlice';
import apartmentsSlice from './reducers/apartmentsSlice';
import otherActionApartmentSlice from './reducers/otherActionApartmentSlice';
import lockSlice from './reducers/lockSlice';
import orderSlice from './reducers/orderSlice';
import docsSlice from './reducers/docsSlice';

const reducer = combineReducers({
  saveDataSlice,
  usersSlice,
  apartmentsSlice,
  otherActionApartmentSlice,
  lockSlice,
  orderSlice,
  docsSlice
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['saveDataSlice']
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
});

export const persistor = persistStore(store);
export { store };
