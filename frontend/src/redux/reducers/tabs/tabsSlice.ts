import { createSlice } from '@reduxjs/toolkit';

import { reduceSetCurrentTab } from './tabsReducers';
import { TabsStateType } from './tabsSlice.type';


//Initial state
const tabsInitialState: TabsStateType = {
  currentTab: 'search',
};

/**
 * Anagram reducer
 */
export const tabsSlice = createSlice({
  name: 'tabs',
  initialState: tabsInitialState,
  reducers: {
    setCurrentTab: reduceSetCurrentTab,
  },
});

export const { setCurrentTab } = tabsSlice.actions;

export default tabsSlice.reducer;
