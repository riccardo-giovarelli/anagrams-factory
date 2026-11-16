import { createSlice } from "@reduxjs/toolkit";

import { reduceSetCurrentTab } from "./tabsReducers";
import { TabsStateType } from "./tabsSlice.type";

// Initial state
export const tabsInitialState: TabsStateType = {
  currentTab: "search",
};

/**
 * Tabs slice
 */
export const tabsSlice = createSlice({
  name: "tabs",
  initialState: tabsInitialState,
  reducers: {
    setCurrentTab: reduceSetCurrentTab,
  },
});

export const { setCurrentTab } = tabsSlice.actions;

export default tabsSlice.reducer;
