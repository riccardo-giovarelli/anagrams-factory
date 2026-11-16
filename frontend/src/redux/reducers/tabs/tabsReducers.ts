import { PayloadAction } from "@reduxjs/toolkit";

import { tabsIdType, TabsStateType } from "./tabsSlice.type";

/**
 * REDUCER: setCurrentTab
 */
export const reduceSetCurrentTab = (state: TabsStateType, action: PayloadAction<tabsIdType>): void => {
  state.currentTab = action.payload;
};
