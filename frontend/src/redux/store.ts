import { configureStore } from '@reduxjs/toolkit';

import anagramReducer from './reducers/anagram/anagramSlice';

const store = configureStore({
  reducer: {
    anagram: anagramReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
