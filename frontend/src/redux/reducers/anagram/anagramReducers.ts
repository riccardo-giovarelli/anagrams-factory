import { PayloadAction, SerializedError } from "@reduxjs/toolkit";

import { AnagramsStateType, AnagramType } from "./anagramSlice.type";

/**
 * Tipizzazione del payload restituito dal Thunk (Axios response wrapper)
 */
export interface AnagramApiErrorData {
  id?: number;
  status?: number;
  code?: string;
  title?: string;
  detail?: string;
}

export type AnagramThunkPayload =
  | {
      status: 200;
      data: AnagramType;
    }
  | {
      status: 400 | 422 | number;
      data: AnagramApiErrorData;
    }
  | undefined;

/**
 * CASE REDUCER: fetchAnagrams.fulfilled
 */
export const caseAnagramsFulfilled = (state: AnagramsStateType, action: PayloadAction<AnagramThunkPayload>): void => {
  if (!action.payload) {
    state.anagrams = null;
    state.status = "failed";
    state.error = "Generic Error: Empty response from server";
    return;
  }

  switch (action.payload.status) {
    case 200:
      state.anagrams = action.payload.data as AnagramType;
      state.status = "succeeded";
      state.error = "";
      break;
    case 400:
    case 422: {
      const errorData = action.payload.data as AnagramApiErrorData;
      state.error = `${errorData?.title ?? "Error"}: ${errorData?.detail ?? "Invalid input"}`;
      state.anagrams = null;
      state.status = "failed";
      break;
    }
    default:
      state.error = "Generic Error: Server response is not supported";
      state.anagrams = null;
      state.status = "failed";
      break;
  }
};

/**
 * CASE REDUCER: fetchAnagrams.rejected
 */
export const caseAnagramsRejected = (
  state: AnagramsStateType,
  action: { payload?: unknown; error: SerializedError },
): void => {
  state.status = "failed";
  state.anagrams = null;

  if (typeof action.payload === "string") {
    state.error = action.payload;
  } else {
    state.error = `Generic Error: ${action.error?.message ?? "Unknown error"}`;
  }
};

/**
 * CASE REDUCER: fetchAnagrams.pending
 */
export const caseAnagramsPending = (state: AnagramsStateType): void => {
  state.status = "loading";
  state.error = "";
};

/**
 * REDUCER: restore
 */
export const reducerRestore = (state: AnagramsStateType): void => {
  state.status = "idle";
  state.error = "";
  state.anagrams = null;
  state.offset = 0;
  state.unique = false;
  state.text = "";
};

/**
 * REDUCER: setUnique
 */
export const reducerSetUnique = (state: AnagramsStateType, action: PayloadAction<boolean>): void => {
  state.unique = action.payload;
  state.offset = 0;
};

/**
 * REDUCER: setOffset
 */
export const reducerSetOffset = (state: AnagramsStateType, action: PayloadAction<number>): void => {
  state.offset = action.payload;
};

/**
 * REDUCER: setLimit
 */
export const reduceSetLimit = (state: AnagramsStateType, action: PayloadAction<number>): void => {
  state.limit = action.payload;
};

/**
 * REDUCER: setAnagrams
 */
export const reduceSetAnagrams = (state: AnagramsStateType, action: PayloadAction<AnagramType | null>): void => {
  state.anagrams = action.payload;
};

/**
 * REDUCER: setText
 */
export const reduceSetText = (state: AnagramsStateType, action: PayloadAction<string>): void => {
  state.text = action.payload;
  if (state.error) {
    state.error = "";
  }
};
