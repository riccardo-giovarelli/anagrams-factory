import { PayloadAction } from '@reduxjs/toolkit';

import { tabsIdType, TabsStateType } from './tabsSlice.type';


/**
 * REDUCER: setText
 */
export const reduceSetCurrentTab = (state: TabsStateType, action: PayloadAction<tabsIdType>) => {
  state.currentTab = action.payload;
};
