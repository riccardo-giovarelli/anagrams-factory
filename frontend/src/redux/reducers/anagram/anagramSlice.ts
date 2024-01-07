import { createSlice } from '@reduxjs/toolkit';

import {
    caseAnagramsFulfilled, caseAnagramsPending, caseAnagramsRejected, reducerRestore,
    reducerSetOffset, reducerSetUnique, reduceSetAnagrams, reduceSetLimit, reduceSetText
} from './anagramReducers';
import { AnagramsStateType } from './anagramSlice.type';
import { fetchAnagrams } from './anagramThunk';


//Initial state
const anagramsInitialState: AnagramsStateType = {
  text: '',
  anagrams: null,
  unique: false,
  offset: 0,
  limit: 50,
  status: 'idle',
  error: '',
};

/**
 * Anagram reducer
 */
export const anagramSlice = createSlice({
  name: 'anagram',
  initialState: anagramsInitialState,
  reducers: {
    setText: reduceSetText,
    setAnagrams: reduceSetAnagrams,
    setLimit: reduceSetLimit,
    setOffset: reducerSetOffset,
    setUnique: reducerSetUnique,
    restore: reducerRestore,
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAnagrams.pending, caseAnagramsPending)
      .addCase(fetchAnagrams.fulfilled, caseAnagramsFulfilled)
      .addCase(fetchAnagrams.rejected, caseAnagramsRejected);
  },
});

export const { setText, setAnagrams, setLimit, setOffset, setUnique, restore } = anagramSlice.actions;

export default anagramSlice.reducer;
