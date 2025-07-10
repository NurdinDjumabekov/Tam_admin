import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import axiosInstance from 'axiosInstance';
import { format, parse } from 'date-fns';
import { ru } from 'date-fns/locale';
import { myAlert } from 'helpers/myAlert';

const apiUrl = import.meta.env.VITE_API_URL;

const initialState = {
  preloader_user: false,
  listLandlord: [], // храню пользователей и арендодателей
  searchUser: '', // поиск пользователя
  typeUsers: '' // активный тип пользователя tamkg || landlord
};

////// getAllLandLordReq - get cписок всех арендодателей и пользователей
export const getAllLandLordReq = createAsyncThunk('getAllLandLordReq', async function (data, { dispatch, rejectWithValue }) {
  const url = `${apiUrl}/users/get_users`;
  try {
    const response = await axiosInstance.post(url, data);
    if (response.status >= 200 && response.status < 300) {
      return response?.data?.list;
    } else {
      throw Error(`Error: ${response.status}`);
    }
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

////// crudLandLordReq - crud всех арендодателей
export const crudLandLordReq = createAsyncThunk('crudLandLordReq', async function (data, { dispatch, rejectWithValue }) {
  const url = `${apiUrl}/users/crud_landlord`;
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

const usersSlice = createSlice({
  name: 'usersSlice',
  initialState,
  reducers: {
    listLandlordsFN: (state, action) => {
      state.listLandlord = action.payload;
    },
    searchUserFN: (state, action) => {
      state.searchUser = action?.payload;
    },
    typeUsersFn: (state, action) => {
      state.typeUsers = action?.payload;
    }
  },

  extraReducers: (builder) => {
    ////////////// getAllLandLordReq
    builder.addCase(getAllLandLordReq.fulfilled, (state, action) => {
      state.preloader_user = false;
      state.listLandlord = action.payload;
    });
    builder.addCase(getAllLandLordReq.rejected, (state, action) => {
      state.error = action.payload;
      state.listLandlord = [];
      state.preloader_user = false;
    });
    builder.addCase(getAllLandLordReq.pending, (state, action) => {
      state.preloader_user = true;
    });

    ////////////// crudLandLordReq
    builder.addCase(crudLandLordReq.fulfilled, (state, action) => {
      state.preloader_user = false;
    });
    builder.addCase(crudLandLordReq.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader_user = false;
    });
    builder.addCase(crudLandLordReq.pending, (state, action) => {
      state.preloader_user = true;
    });
  }
});

export const { listLandlordsFN, searchUserFN, typeUsersFn } = usersSlice.actions;

export default usersSlice.reducer;
