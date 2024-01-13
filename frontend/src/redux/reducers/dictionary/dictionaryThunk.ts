import axios from 'axios';

import { createAsyncThunk } from '@reduxjs/toolkit';

import { StateType } from '../../redux.type';


/**
 * @function searchWord
 *
 * @return {AxiosResponse} Fetch return
 */
export const searchWord = createAsyncThunk('dictionary/searchWord', async (_, { getState }) => {
  const state = getState() as StateType;
  const { text } = state.anagram;
  try {
    const response = await axios.get(
      `${location.protocol}//${location.hostname}:3000/api/dictionary/search?word=${encodeURIComponent(text)}&lang=it`
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
