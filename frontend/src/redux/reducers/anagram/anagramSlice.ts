import { createSlice } from '@reduxjs/toolkit';

import { getAnagrams } from './anagramSlice.lib';


/**
 * Anagram reducer
 */
export const anagramSlice = createSlice({
  name: 'anagram',
  initialState: {
    text: '',
    anagrams: [],
  },
  reducers: {
    setText: (state, action) => {
      state.text = action.payload;
    },
    setAnagrams: (state, action) => {
      if (!state.text) {
        state.anagrams = [];
      }
      getAnagrams(state.text, action.payload.offset, action.payload.limit).then((res: any) => {
        state.anagrams = res;
      });
    },
  },
});

export const { setText, setAnagrams } = anagramSlice.actions;

export default anagramSlice.reducer;
