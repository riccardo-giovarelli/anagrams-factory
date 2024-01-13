import { createSlice } from '@reduxjs/toolkit';

import {
    caseSearchWordFulfilled, caseSearchWordPending, caseSearchWordRejected
} from './dictionaryReducers';
import { DictionaryStateType } from './dictionarySlice.type';
import { searchWord } from './dictionaryThunk';


//Initial state
const dictionaryInitialState: DictionaryStateType = {
  found: false,
  status: 'idle',
  error: '',
};

export const dictionarySlice = createSlice({
  name: 'dictionary',
  initialState: dictionaryInitialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(searchWord.pending, caseSearchWordPending)
      .addCase(searchWord.fulfilled, caseSearchWordFulfilled)
      .addCase(searchWord.rejected, caseSearchWordRejected);
  },
});
