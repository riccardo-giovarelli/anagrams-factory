import { PayloadAction } from '@reduxjs/toolkit';

import { AnagramsStateType, AnagramType } from './anagramSlice.type';


/**
 * CASE REDUCER: fetchAnagrams.fulfilled
 */
export const caseAnagramsFulfilled = (state: AnagramsStateType, action: any) => {
  if (!action.payload) {
    state.anagrams = null;
  } else {
    switch (action.payload.status) {
      case 200:
        state.anagrams = action.payload.data;
        break;
      case 422:
        state.error = `${action.payload.data.title}: ${action.payload.data.detail}`;
        state.anagrams = null;
        break;
      case 400:
        state.error = `${action.payload.data.title}: ${action.payload.data.detail}`;
        state.anagrams = null;
        break;
      default:
        state.error = 'Generic Error: Server response is not supported';
        state.anagrams = null;
        break;
    }
    state.status = 'succeeded';
  }
};

/**
 * CASE REDUCER: fetchAnagrams.rejected
 */
export const caseAnagramsRejected = (state: AnagramsStateType, action: any) => {
  state.status = 'failed';
  state.error = `Generic Error: ${action.error.message}`;
};

/**
 * CASE REDUCER: fetchAnagrams.pending
 */
export const caseAnagramsPending = (state: AnagramsStateType) => {
  state.status = 'loading';
  state.error = '';
};

/**
 * REDUCER: restore
 */
export const reducerRestore = (state: AnagramsStateType) => {
  state.error = '';
  state.anagrams = null;
  state.offset = 0;
  state.unique = false;
  state.text = '';
};

/**
 * REDUCER: setUnique
 */
export const reducerSetUnique = (state: AnagramsStateType, action: PayloadAction<boolean>) => {
  state.unique = action.payload;
};

/**
 * REDUCER: setOffset
 */
export const reducerSetOffset = (state: AnagramsStateType, action: PayloadAction<number>) => {
  state.offset = action.payload;
};

/**
 * REDUCER: setAnagrams
 */
export const reduceSetLimit = (state: AnagramsStateType, action: PayloadAction<number>) => {
  state.limit = action.payload;
};

/**
 * REDUCER: setAnagrams
 */
export const reduceSetAnagrams = (state: AnagramsStateType, action: PayloadAction<AnagramType>) => {
  state.anagrams = action.payload;
};

/**
 * REDUCER: setText
 */
export const reduceSetText = (state: AnagramsStateType, action: PayloadAction<string>) => {
  state.text = action.payload;
};
