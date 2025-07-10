import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import axiosInstance from 'axiosInstance';
import { format, parse } from 'date-fns';
import { ru } from 'date-fns/locale';
import { myAlert } from 'helpers/myAlert';

const apiUrl = import.meta.env.VITE_API_URL;

const initialState = {
  preloader_lock: false,
  listLockAdmin: [] // список админов
};

////// getListAdminsLockReq - get cписок админов для замков (по 100 каждому)
export const getListAdminsLockReq = createAsyncThunk('getListAdminsLockReq', async function (data, { dispatch, rejectWithValue }) {
  const url = `${apiUrl}/locks/get_list_admins`;
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

////// editDataLockReq - edit data lock каждой квартиры
export const editDataLockReq = createAsyncThunk('editDataLockReq', async function (data, { dispatch, rejectWithValue }) {
  const url = `${apiUrl}/locks/edit_lock_apartment`;
  try {
    const response = await axiosInstance.post(url, data);
    if (response.status >= 200 && response.status < 300) {
      return response?.data;
    } else {
      throw Error(`Error: ${response.status}`);
    }
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

////// editLockOrderReq - edit data lock каждого заказа
export const editLockOrderReq = createAsyncThunk('editLockOrderReq', async function (data, { dispatch, rejectWithValue }) {
  const url = `${apiUrl}/locks/edit_lock_order`;
  try {
    const response = await axiosInstance.post(url, data);
    if (response.status >= 200 && response.status < 300) {
      return response?.data;
    } else {
      throw Error(`Error: ${response.status}`);
    }
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const lockSlice = createSlice({
  name: 'lockSlice',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    ////////////// getListAdminsLockReq
    builder.addCase(getListAdminsLockReq.fulfilled, (state, action) => {
      state.listLockAdmin = action.payload;
      state.preloader_lock = false;
    });
    builder.addCase(getListAdminsLockReq.rejected, (state, action) => {
      state.error = action.payload;
      state.listLockAdmin = [];
      state.preloader_lock = false;
    });
    builder.addCase(getListAdminsLockReq.pending, (state, action) => {
      state.preloader_lock = true;
    });

    ////////////// editDataLockReq
    builder.addCase(editDataLockReq.fulfilled, (state, action) => {
      state.preloader_lock = false;
    });
    builder.addCase(editDataLockReq.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader_lock = false;
    });
    builder.addCase(editDataLockReq.pending, (state, action) => {
      state.preloader_lock = true;
    });

    //////////////// editLockOrderReq
    builder.addCase(editLockOrderReq.fulfilled, (state, action) => {
      state.preloader_lock = false;
    });
    builder.addCase(editLockOrderReq.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader_lock = false;
    });
    builder.addCase(editLockOrderReq.pending, (state, action) => {
      state.preloader_lock = true;
    });
  }
});

export const { listLockAdminFN } = lockSlice.actions;

export default lockSlice.reducer;
