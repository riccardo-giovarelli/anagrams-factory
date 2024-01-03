import { createSlice } from '@reduxjs/toolkit';

import { AnagramsInitialState } from './anagramSlice.type';


//Initial state
const anagramsInitialState: AnagramsInitialState = {
  text: '',
  anagrams: null,
  loading: false,
  unique: false,
  offset: 0,
  limit: 50,
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
    setLimit: (state, action) => {
      state.limit = action.payload;
    },
    setOffset: (state, action) => {
      state.offset = action.payload;
    },
    setUnique: (state, action) => {
      state.unique = action.payload;
    },
  },
});

export const { setText, setAnagrams, setLoading, setLimit, setOffset, setUnique } = anagramSlice.actions;

export default anagramSlice.reducer;
