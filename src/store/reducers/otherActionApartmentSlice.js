import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import axiosInstance from 'axiosInstance';
import { format, parse } from 'date-fns';
import { ru } from 'date-fns/locale';
import { myAlert } from 'helpers/myAlert';

const apiUrl = import.meta.env.VITE_API_URL;

const initialState = {
  preloader_other_action: false,
  listAllRules: [], // список всех правил
  listAllConveniences: [], // список всех правил
  listPrices: [] // список тарифов
};

////// getRulesAllReq - get cписок правил
export const getRulesAllReq = createAsyncThunk('getRulesAllReq', async function (data, { dispatch, rejectWithValue }) {
  const url = `${apiUrl}/rules/get_list`;
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

////// getConveniencesAllReq - get cписок удобств
export const getConveniencesAllReq = createAsyncThunk('getConveniencesAllReq', async function (data, { dispatch, rejectWithValue }) {
  const url = `${apiUrl}/convenience/get_list`;
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

////// editRulesApartmnentReq - редактирование правил квартиры
export const editRulesApartmnentReq = createAsyncThunk('editRulesApartmnentReq', async function (data, { dispatch, rejectWithValue }) {
  const url = `${apiUrl}/rules/edit_rule_apartment`;
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

////// editConveniencesApartmnentReq - редактирование удобств квартиры
export const editConveniencesApartmnentReq = createAsyncThunk(
  'editConveniencesApartmnentReq',
  async function (data, { dispatch, rejectWithValue }) {
    const url = `${apiUrl}/convenience/edit_rule_apartment`;
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
  }
);

////// getListPriceReq - get cписок тарифов
export const getListPriceReq = createAsyncThunk('getListPriceReq', async function (data, { dispatch, rejectWithValue }) {
  const url = `${apiUrl}/tariffs/get_price`;
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

const otherActionApartmentSlice = createSlice({
  name: 'otherActionApartmentSlice',
  initialState,
  reducers: {
    listAllRulesFN: (state, action) => {
      state.listAllRules = action.payload;
    },

    listAllConveniencesFN: (state, action) => {
      state.listAllConveniences = action.payload;
    },

    listPricesFN: (state, action) => {
      state.listPrices = action.payload;
    }
  },

  extraReducers: (builder) => {
    ////////////// getApartmentsReq
    builder.addCase(getRulesAllReq.fulfilled, (state, action) => {
      state.preloader_other_action = false;
      state.listAllRules = action.payload;
    });
    builder.addCase(getRulesAllReq.rejected, (state, action) => {
      state.error = action.payload;
      state.listAllRules = [];
      state.preloader_other_action = false;
    });
    builder.addCase(getRulesAllReq.pending, (state, action) => {
      state.preloader_other_action = true;
    });

    //////////////// editRulesApartmnentReq
    builder.addCase(editRulesApartmnentReq.fulfilled, (state, action) => {
      state.preloader_other_action = false;
    });
    builder.addCase(editRulesApartmnentReq.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader_other_action = false;
    });
    builder.addCase(editRulesApartmnentReq.pending, (state, action) => {
      state.preloader_other_action = true;
    });

    ////////////// getConveniencesAllReq
    builder.addCase(getConveniencesAllReq.fulfilled, (state, action) => {
      state.preloader_other_action = false;
      state.listAllConveniences = action.payload;
    });
    builder.addCase(getConveniencesAllReq.rejected, (state, action) => {
      state.error = action.payload;
      state.listAllConveniences = [];
      state.preloader_other_action = false;
    });
    builder.addCase(getConveniencesAllReq.pending, (state, action) => {
      state.preloader_other_action = true;
    });

    //////////////// editConveniencesApartmnentReq
    builder.addCase(editConveniencesApartmnentReq.fulfilled, (state, action) => {
      state.preloader_other_action = false;
    });
    builder.addCase(editConveniencesApartmnentReq.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader_other_action = false;
    });
    builder.addCase(editConveniencesApartmnentReq.pending, (state, action) => {
      state.preloader_other_action = true;
    });

    ////////////// getListPriceReq
    builder.addCase(getListPriceReq.fulfilled, (state, action) => {
      state.preloader_other_action = false;
      state.listPrices = action.payload;
    });
    builder.addCase(getListPriceReq.rejected, (state, action) => {
      state.error = action.payload;
      state.listPrices = [];
      state.preloader_other_action = false;
    });
    builder.addCase(getListPriceReq.pending, (state, action) => {
      state.preloader_other_action = true;
    });
  }
});

export const { listAllRulesFN, listAllConveniencesFN, listPricesFN } = otherActionApartmentSlice.actions;

export default otherActionApartmentSlice.reducer;
