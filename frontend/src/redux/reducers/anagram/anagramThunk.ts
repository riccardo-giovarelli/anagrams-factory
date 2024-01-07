import axios from 'axios';

import { createAsyncThunk } from '@reduxjs/toolkit';

import { StateType } from '../../redux.type';


/**
 * @function fetchAnagrams
 *
 * @return {AxiosResponse} Fetch return
 */
export const fetchAnagrams = createAsyncThunk('anagram/fetchAnagrams', async (_, { getState }) => {
  const state = getState() as StateType;
  const { text, offset, limit, unique } = state.anagram;
  try {
    const response = await axios.get(
      `${location.protocol}//${location.hostname}:3000/api/anagram/make?text=${encodeURIComponent(
        text
      )}&limit=${limit}&offset=${offset}&unique=${unique}`
    );
    return {
      status: response.status,
      data: response.data,
    };
  } catch (e: any) {
    if (e.response) {
      return {
        status: e.response.status,
        data: e.response.data,
      };
    }
  }
});
