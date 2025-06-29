import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import axiosInstance from 'axiosInstance';
import { format, parse } from 'date-fns';
import { ru } from 'date-fns/locale';
import { myAlert } from 'helpers/myAlert';

const apiUrl = import.meta.env.VITE_API_URL;

const initialState = {
  preloader_apartment: false,
  listApartments: [], // список квартир
  listEquipment: [], // список оснащений каждой квартиры
  dataSelects: {}, /// все селекты
  everyApartment: {} /// все селекты
};

////// getApartmentsReq - get cписок всех квартир
export const getApartmentsReq = createAsyncThunk('getApartmentsReq', async function (data, { dispatch, rejectWithValue }) {
  const url = `${apiUrl}/user/main`;
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

////// getEveryApartmentsReq - get cписок всех квартир
export const getEveryApartmentsReq = createAsyncThunk('getEveryApartmentsReq', async function (data, { dispatch, rejectWithValue }) {
  const url = `${apiUrl}/apartments/detailed_admin`;
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

////// getEquipmentReq - get cписок оснащений каждой квартир
export const getEquipmentReq = createAsyncThunk('getEquipmentReq', async function (data, { dispatch, rejectWithValue }) {
  const url = `${apiUrl}/user/asdasdasdas`;
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

////// crudLandLordReq - crud всех арендодателей
export const crudLandLordReq = createAsyncThunk('crudLandLordReq', async function (data, { dispatch, rejectWithValue }) {
  const url = `${apiUrl}/user/crud`;
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

////// crudEquipmentReq - crud оснащений каждой квартиры
export const crudEquipmentReq = createAsyncThunk('crudEquipmentReq', async function (data, { dispatch, rejectWithValue }) {
  const url = `${apiUrl}/user/crudEquipmentReq`;
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

////// getApartmentslandlordReq - get cписок квартир арендодателей
export const getApartmentslandlordReq = createAsyncThunk('getApartmentslandlordReq', async function (props, { dispatch, rejectWithValue }) {
  const { guidLandlord } = props;
  const url = `${apiUrl}/apartments/list_landlord`;
  try {
    const data = { guidLandlord };
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

////// getAllSelectsReq - get cписок стандартный данных для админки
export const getAllSelectsReq = createAsyncThunk('getAllSelectsReq', async function (props, { dispatch, rejectWithValue }) {
  const url = `${apiUrl}/data_app/admin`;
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

////// crudApartmentReq - crud всех квартир
export const crudApartmentReq = createAsyncThunk('crudApartmentReq', async function (data, { dispatch, rejectWithValue }) {
  const url = `${apiUrl}/apartments/create`;
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

/// только для карты
////// editCoordinatesApartmnentReq - редактирование удобств квартиры
export const editCoordinatesApartmnentReq = createAsyncThunk(
  'editCoordinatesApartmnentReq',
  async function (data, { dispatch, rejectWithValue }) {
    const url = `${apiUrl}/apartments/edit_coordinates_map`;
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

const apartmentsSlice = createSlice({
  name: 'apartmentsSlice',
  initialState,
  reducers: {
    listApartmentsFN: (state, action) => {
      state.listApartments = action.payload;
    },
    listEquipmentFn: (state, action) => {
      state.listEquipment = action.payload;
    }
  },

  extraReducers: (builder) => {
    ////////////// getApartmentsReq
    builder.addCase(getApartmentsReq.fulfilled, (state, action) => {
      state.preloader_apartment = false;
      state.listApartments = action.payload;
    });
    builder.addCase(getApartmentsReq.rejected, (state, action) => {
      state.error = action.payload;
      state.listApartments = [];
      state.preloader_apartment = false;
    });
    builder.addCase(getApartmentsReq.pending, (state, action) => {
      state.preloader_apartment = true;
    });

    ////////////// getEveryApartmentsReq
    builder.addCase(getEveryApartmentsReq.fulfilled, (state, action) => {
      state.preloader_apartment = false;
      state.everyApartment = action.payload;
    });
    builder.addCase(getEveryApartmentsReq.rejected, (state, action) => {
      state.error = action.payload;
      state.everyApartment = {};
      state.preloader_apartment = false;
    });
    builder.addCase(getEveryApartmentsReq.pending, (state, action) => {
      state.preloader_apartment = true;
    });

    ////////////// getEquipmentReq
    builder.addCase(getEquipmentReq.fulfilled, (state, action) => {
      state.preloader_apartment = false;
      state.listEquipment = action.payload;
    });
    builder.addCase(getEquipmentReq.rejected, (state, action) => {
      state.error = action.payload;
      state.listEquipment = [];
      state.preloader_apartment = false;
    });
    builder.addCase(getEquipmentReq.pending, (state, action) => {
      state.preloader_apartment = true;
    });

    ////////////// crudLandLordReq
    builder.addCase(crudLandLordReq.fulfilled, (state, action) => {
      state.preloader_apartment = false;
    });
    builder.addCase(crudLandLordReq.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader_apartment = false;
    });
    builder.addCase(crudLandLordReq.pending, (state, action) => {
      state.preloader_apartment = true;
    });

    ////////////// crudEquipmentReq
    builder.addCase(crudEquipmentReq.fulfilled, (state, action) => {
      state.preloader_apartment = false;
    });
    builder.addCase(crudEquipmentReq.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader_apartment = false;
    });
    builder.addCase(crudEquipmentReq.pending, (state, action) => {
      state.preloader_apartment = true;
    });

    ////////////// getApartmentslandlordReq
    builder.addCase(getApartmentslandlordReq.fulfilled, (state, action) => {
      state.preloader_apartment = false;
      state.listApartments = action.payload;
    });
    builder.addCase(getApartmentslandlordReq.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader_apartment = false;
      state.listApartments = [];
    });
    builder.addCase(getApartmentslandlordReq.pending, (state, action) => {
      state.preloader_apartment = true;
    });

    ////////////// getAllSelectsReq
    builder.addCase(getAllSelectsReq.fulfilled, (state, action) => {
      state.preloader_apartment = false;
      state.dataSelects = action.payload;
    });
    builder.addCase(getAllSelectsReq.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader_apartment = false;
      state.dataSelects = {};
    });
    builder.addCase(getAllSelectsReq.pending, (state, action) => {
      state.preloader_apartment = true;
    });

    ////////////// crudApartmentReq
    builder.addCase(crudApartmentReq.fulfilled, (state, action) => {
      state.preloader_apartment = false;
    });
    builder.addCase(crudApartmentReq.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader_apartment = false;
    });
    builder.addCase(crudApartmentReq.pending, (state, action) => {
      state.preloader_apartment = true;
    });
  }
});

export const { listApartmentsFN, listEquipmentFn } = apartmentsSlice.actions;

export default apartmentsSlice.reducer;
