import { configureStore } from '@reduxjs/toolkit';

import anagramReducer from './reducers/anagram/anagramSlice';
import tabsReducer from './reducers/tabs/tabsSlice';


const store = configureStore({
  reducer: {
    anagram: anagramReducer,
    tab: tabsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
