import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import axiosInstance from 'axiosInstance';
import { format, parse } from 'date-fns';
import { ru } from 'date-fns/locale';
import { myAlert } from 'helpers/myAlert';

const initialState = {
  dataSave: {
    guid: '',
    typeUser: '',
    fio: '',
    phoneNumber: ''
  }
};

const saveDataSlice = createSlice({
  name: 'saveDataSlice',
  initialState,
  reducers: {
    dataSaveFn: (state, action) => {
      state.dataSave = action.payload;
    },

    clearDataSave: (state, action) => {
      state.dataSave = {
        guid: '',
        typeUser: '',
        fio: '',
        phoneNumber: ''
      };
    }
  }
});
export const { dataSaveFn, clearDataSave } = saveDataSlice.actions;

export default saveDataSlice.reducer;
