import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from 'axiosInstance';
import { format, parse } from 'date-fns';
import { ru } from 'date-fns/locale';
import { listTypeUsers } from 'helpers/myLocal';

const apiUrl = import.meta.env.VITE_API_URL;

const initialState = {
  preloader_docs: false
};

////// getEveryDocumentReq - get каждый документ
export const getEveryDocumentReq = createAsyncThunk('getEveryDocumentReq', async function (guid, { dispatch, rejectWithValue }) {
  const url = `${apiUrl}/documents/${guid}`;
  try {
    const response = await axiosInstance.get(url);
    if (response.status >= 200 && response.status < 300) {
      return response?.data;
    } else {
      throw Error(`Error: ${response.status}`);
    }
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const docsSlice = createSlice({
  name: 'docsSlice',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    ////////////// getEveryDocumentReq
    builder.addCase(getEveryDocumentReq.fulfilled, (state, action) => {
      state.preloader_docs = false;
    });
    builder.addCase(getEveryDocumentReq.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader_docs = false;
    });
    builder.addCase(getEveryDocumentReq.pending, (state, action) => {
      state.preloader_docs = true;
    });
  }
});

export const {} = docsSlice.actions;

export default docsSlice.reducer;
