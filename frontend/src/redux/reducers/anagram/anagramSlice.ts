import { createSlice } from '@reduxjs/toolkit';

import { AnagramsInitialState } from './anagramSlice.type';


//Initial state
const anagramsInitialState: AnagramsInitialState = {
  text: '',
  anagrams: [],
  loading: false,
};

/**
 * Anagram reducer
 */
export const anagramSlice = createSlice({
  name: 'anagram',
  initialState: anagramsInitialState,
  reducers: {
    setText: (state, action) => {
      state.text = action.payload;
    },
    setAnagrams: (state, action) => {
      state.anagrams = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setText, setAnagrams, setLoading } = anagramSlice.actions;

export default anagramSlice.reducer;
