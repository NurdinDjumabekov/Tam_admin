import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from 'axiosInstance';
import { format, parse } from 'date-fns';
import { ru } from 'date-fns/locale';
import { listTypeUsers } from 'helpers/myLocal';

const apiUrl = import.meta.env.VITE_API_URL;

const initialState = {
  preloader_order: false,
  activeDateDay: format(new Date(), 'yyyy-MM-dd', { locale: ru }),
  activeSelectRole: { ...listTypeUsers?.[0] }, // селект ролей
  listOrders: [], // список заказов
  everyOrder: {}, // каждый заказ
  activeUser: {} // нужен для выбора пользователя при создании
};

////// getListOrdersReq - get cписок заказов
export const getListOrdersReq = createAsyncThunk('getListOrdersReq', async function (data, { dispatch, rejectWithValue }) {
  const url = `${apiUrl}/orders/list_admin`;
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

////// getEveryOrdersReq - get каждый заказ
export const getEveryOrdersReq = createAsyncThunk('getEveryOrdersReq', async function (data, { dispatch, rejectWithValue }) {
  const url = `${apiUrl}/orders/every`;
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

////// editTimeCleaningOrderReq - edit время уборкит каждого заказа
export const editTimeCleaningOrderReq = createAsyncThunk('editTimeCleaningOrderReq', async function (data, { dispatch, rejectWithValue }) {
  const url = `${apiUrl}/orders/edit_cleaning`;
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

////// editTimesOrderReq - edit время начала и конца каждого заказа
export const editTimesOrderReq = createAsyncThunk('editTimesOrderReq', async function (data, { dispatch, rejectWithValue }) {
  const url = `${apiUrl}/orders/edit_times_order`;
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

////// extendOrderReq - продление аренды
export const extendOrderReq = createAsyncThunk('extendOrderReq', async function (data, { dispatch, rejectWithValue }) {
  const url = `${apiUrl}/orders/extend_admin`;
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

////// delTarifOrderReq - удаление тарифа с брони
export const delTarifOrderReq = createAsyncThunk('delTarifOrderReq', async function (data, { dispatch, rejectWithValue }) {
  const url = `${apiUrl}/orders/del_tarif_in_order`;
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

////// crudStatusOrderReq - редактирование статуса заказа
export const crudStatusOrderReq = createAsyncThunk('crudStatusOrderReq', async function (data, { dispatch, rejectWithValue }) {
  const url = `${apiUrl}/orders/crud_status`;
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

////// createOrderAdmin - создание заказа админом
export const createOrderAdmin = createAsyncThunk('createOrderAdmin', async function (data, { dispatch, rejectWithValue }) {
  const url = `${apiUrl}/orders/create_admin`;
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

////// createOrderForLandlord - создание заказа для арендодателей
export const createOrderForLandlord = createAsyncThunk('createOrderForLandlord', async function (data, { dispatch, rejectWithValue }) {
  const url = `${apiUrl}/orders/create_landlord`;
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

const orderSlice = createSlice({
  name: 'orderSlice',
  initialState,
  reducers: {
    listOrdersFN: (state, action) => {
      state.listOrders = action.payload;
    },
    activeDateDayFN: (state, action) => {
      state.activeDateDay = action?.payload;
    },
    activeSelectRoleFN: (state, action) => {
      state.activeSelectRole = action?.payload;
    },
    everyOrderFN: (state, action) => {
      state.everyOrder = action?.payload;
    }
  },

  extraReducers: (builder) => {
    ////////////// getListOrdersReq
    builder.addCase(getListOrdersReq.fulfilled, (state, action) => {
      state.listOrders = action.payload;
      state.preloader_order = false;
    });
    builder.addCase(getListOrdersReq.rejected, (state, action) => {
      state.error = action.payload;
      state.listOrders = [];
      state.preloader_order = false;
    });
    builder.addCase(getListOrdersReq.pending, (state, action) => {
      state.preloader_order = true;
    });

    ////////////// getEveryOrdersReq
    builder.addCase(getEveryOrdersReq.fulfilled, (state, action) => {
      state.everyOrder = action.payload;
      state.preloader_order = false;
    });
    builder.addCase(getEveryOrdersReq.rejected, (state, action) => {
      state.error = action.payload;
      state.everyOrder = {};
      state.preloader_order = false;
    });
    builder.addCase(getEveryOrdersReq.pending, (state, action) => {
      state.preloader_order = true;
    });

    ////////////// getEveryOrdersReq
    builder.addCase(editTimeCleaningOrderReq.fulfilled, (state, action) => {
      state.preloader_order = false;
    });
    builder.addCase(editTimeCleaningOrderReq.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader_order = false;
    });
    builder.addCase(editTimeCleaningOrderReq.pending, (state, action) => {
      state.preloader_order = true;
    });

    ////////////////// editTimesOrderReq
    builder.addCase(editTimesOrderReq.fulfilled, (state, action) => {
      state.preloader_order = false;
    });
    builder.addCase(editTimesOrderReq.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader_order = false;
    });
    builder.addCase(editTimesOrderReq.pending, (state, action) => {
      state.preloader_order = true;
    });

    //////////////// extendOrderReq
    builder.addCase(extendOrderReq.fulfilled, (state, action) => {
      state.preloader_order = false;
    });
    builder.addCase(extendOrderReq.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader_order = false;
    });
    builder.addCase(extendOrderReq.pending, (state, action) => {
      state.preloader_order = true;
    });

    /////////////////// delTarifOrderReq
    builder.addCase(delTarifOrderReq.fulfilled, (state, action) => {
      state.preloader_order = false;
    });
    builder.addCase(delTarifOrderReq.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader_order = false;
    });
    builder.addCase(delTarifOrderReq.pending, (state, action) => {
      state.preloader_order = true;
    });

    //////////////////// crudStatusOrderReq
    builder.addCase(crudStatusOrderReq.fulfilled, (state, action) => {
      state.preloader_order = false;
    });
    builder.addCase(crudStatusOrderReq.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader_order = false;
    });
    builder.addCase(crudStatusOrderReq.pending, (state, action) => {
      state.preloader_order = true;
    });

    //////////////////// createOrderAdmin
    builder.addCase(createOrderAdmin.fulfilled, (state, action) => {
      state.preloader_order = false;
    });
    builder.addCase(createOrderAdmin.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader_order = false;
    });
    builder.addCase(createOrderAdmin.pending, (state, action) => {
      state.preloader_order = true;
    });
  }
});

export const { listOrdersFN, activeDateDayFN, activeSelectRoleFN, everyOrderFN } = orderSlice.actions;

export default orderSlice.reducer;
