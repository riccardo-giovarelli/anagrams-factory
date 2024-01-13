

import { DictionaryStateType } from './dictionarySlice.type';


/**
 * CASE REDUCER: searchWord.fulfilled
 */
export const caseSearchWordFulfilled = (state: DictionaryStateType, action: any) => {
  if (!action.payload) {
    state.found = false;
  } else {
    switch (action.payload.status) {
      case 200:
        state.found = true;
        break;
      case 422:
        state.error = `${action.payload.data.title}: ${action.payload.data.detail}`;
        state.found = false;
        break;
      case 400:
        state.error = `${action.payload.data.title}: ${action.payload.data.detail}`;
        state.found = false;
        break;
      default:
        state.error = 'Generic Error: Server response is not supported';
        state.found = false;
        break;
    }
    state.status = 'succeeded';
  }
};

/**
 * CASE REDUCER: searchWord.rejected
 */
export const caseSearchWordRejected = (state: DictionaryStateType, action: any) => {
  state.status = 'failed';
  state.error = `Generic Error: ${action.error.message}`;
};

/**
 * CASE REDUCER: searchWord.pending
 */
export const caseSearchWordPending = (state: DictionaryStateType) => {
  state.status = 'loading';
  state.error = '';
};
