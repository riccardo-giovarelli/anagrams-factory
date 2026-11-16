import axios from "axios";

import { createAsyncThunk } from "@reduxjs/toolkit";

import { StateType } from "../../redux.type";
import { AnagramApiErrorData, AnagramThunkPayload } from "./anagramReducers";
import { AnagramType } from "./anagramSlice.type";

/**
 * @function fetchAnagrams
 *
 * Fetches paginated anagrams from the backend API based on the current Redux state.
 */
export const fetchAnagrams = createAsyncThunk<AnagramThunkPayload, void, { state: StateType; rejectValue: string }>(
  "anagram/fetchAnagrams",
  async (_, { getState, rejectWithValue }) => {
    const { text, offset, limit, unique } = getState().anagram;
    const baseUrl = import.meta.env.VITE_API_URL || `${window.location.protocol}//${window.location.hostname}:3000`;

    try {
      const response = await axios.get<AnagramType>(`${baseUrl}/api/anagram/make`, {
        params: {
          text,
          limit,
          offset,
          unique,
        },
      });

      return {
        status: 200,
        data: response.data,
      };
    } catch (error: unknown) {
      if (axios.isAxiosError<AnagramApiErrorData>(error) && error.response) {
        const { status, data } = error.response;

        if (status === 400 || status === 422) {
          return rejectWithValue(`${data?.title ?? "Invalid input"}: ${data?.detail ?? "Check the entered text."}`);
        }

        return rejectWithValue("Generic Error: Server response is not supported");
      }

      if (error instanceof Error) {
        return rejectWithValue(`Generic Error: ${error.message}`);
      }

      return rejectWithValue("Generic Error: Unable to connect to the server");
    }
  },
);
