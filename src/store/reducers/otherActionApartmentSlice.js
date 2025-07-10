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
  listPrices: [], // список тарифов
  listPhotosApartment: [], // список фото квартиры
  listVideoApartment: [], // видео квартиры
  listFaq: [], // список вопросов и овтетом
  listInfoCompany: [], // список плюсов компании
  dataApp: {}
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
    const url = `${apiUrl}/convenience/edit_convenience_apartment`;
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
  const url = `${apiUrl}/tariffs/get_prices`;
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

////// crudPriceApartmentReq - crud ценников каждой квартиры
export const crudPriceApartmentReq = createAsyncThunk('crudPriceApartmentReq', async function (data, { dispatch, rejectWithValue }) {
  const url = `${apiUrl}/tariffs/crud_tariffs_list`;
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

////// getListPhotoApartmentReq - get cписок фотографий квартиры
export const getListPhotoApartmentReq = createAsyncThunk('getListPhotoApartmentReq', async function (data, { dispatch, rejectWithValue }) {
  const url = `${apiUrl}/photo_apartment/get_list`;
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

////// loadPhotoApartmentReq - загрузить cписок фотографий квартиры
export const loadPhotoApartmentReq = createAsyncThunk('loadPhotoApartmentReq', async function (data, { dispatch, rejectWithValue }) {
  const url = `${apiUrl}/photo_apartment/upload`;
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

////// delPhotoApartmentReq - удаление фото каждой квартиры
export const delPhotoApartmentReq = createAsyncThunk('delPhotoApartmentReq', async function (data, { dispatch, rejectWithValue }) {
  const url = `${apiUrl}/photo_apartment/delete`;
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

////// getVideoApartmentReq - get видео квартиры
export const getVideoApartmentReq = createAsyncThunk('getVideoApartmentReq', async function (data, { dispatch, rejectWithValue }) {
  const url = `${apiUrl}/video_apartment/get_list`;
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

////// loadVideoApartmentReq - загрузить видео квартиры
export const loadVideoApartmentReq = createAsyncThunk('loadVideoApartmentReq', async function (data, { dispatch, rejectWithValue }) {
  const url = `${apiUrl}/video_apartment/upload`;
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

////// getListFaq - загрузить список вопросо и ответом
export const getListFaq = createAsyncThunk('getListFaq', async function (data, { dispatch, rejectWithValue }) {
  const url = `${apiUrl}/data_app/faq`;
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

////// getListInfoCompany - загрузить список плючов tam.kg
export const getListInfoCompany = createAsyncThunk('getListInfoCompany', async function (data, { dispatch, rejectWithValue }) {
  const url = `${apiUrl}/data_app/info_company`;
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

////// getDataContacts - get контактные данные
export const getDataContacts = createAsyncThunk('getDataContacts', async function (data, { dispatch, rejectWithValue }) {
  const url = `${apiUrl}/data_app/main`;
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

////// createApplicationUser - создание заявки арендодателей
export const createApplicationUser = createAsyncThunk('createApplicationUser', async function (data, { dispatch, rejectWithValue }) {
  const url = `${apiUrl}/data_app/create_app_user`;
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
    ////////////// getRulesAllReq
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
      state.listPrices = action.payload?.map((i) => {
        return {
          ...i,
          value: i?.guid,
          label: i?.name
        };
      });
    });
    builder.addCase(getListPriceReq.rejected, (state, action) => {
      state.error = action.payload;
      state.listPrices = [];
      state.preloader_other_action = false;
    });
    builder.addCase(getListPriceReq.pending, (state, action) => {
      state.preloader_other_action = true;
    });

    ////////////// crudPriceApartmentReq
    builder.addCase(crudPriceApartmentReq.fulfilled, (state, action) => {
      state.preloader_other_action = false;
    });
    builder.addCase(crudPriceApartmentReq.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader_other_action = false;
    });
    builder.addCase(crudPriceApartmentReq.pending, (state, action) => {
      state.preloader_other_action = true;
    });

    ////////////////// getListPhotoApartmentReq
    builder.addCase(getListPhotoApartmentReq.fulfilled, (state, action) => {
      state.preloader_other_action = false;
      state.listPhotosApartment = action.payload;
    });
    builder.addCase(getListPhotoApartmentReq.rejected, (state, action) => {
      state.error = action.payload;
      state.listPhotosApartment = [];
      state.preloader_other_action = false;
    });
    builder.addCase(getListPhotoApartmentReq.pending, (state, action) => {
      state.preloader_other_action = true;
    });

    ///////////////////// loadPhotoApartmentReq
    builder.addCase(loadPhotoApartmentReq.fulfilled, (state, action) => {
      state.preloader_other_action = false;
    });
    builder.addCase(loadPhotoApartmentReq.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader_other_action = false;
    });
    builder.addCase(loadPhotoApartmentReq.pending, (state, action) => {
      state.preloader_other_action = true;
    });

    //////////////////////// delPhotoApartmentReq
    builder.addCase(delPhotoApartmentReq.fulfilled, (state, action) => {
      state.preloader_other_action = false;
    });
    builder.addCase(delPhotoApartmentReq.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader_other_action = false;
    });
    builder.addCase(delPhotoApartmentReq.pending, (state, action) => {
      state.preloader_other_action = true;
    });

    /////////////////////////// getVideoApartmentReq
    builder.addCase(getVideoApartmentReq.fulfilled, (state, action) => {
      state.preloader_other_action = false;
      state.listVideoApartment = action.payload;
    });
    builder.addCase(getVideoApartmentReq.rejected, (state, action) => {
      state.error = action.payload;
      state.listVideoApartment = [];
      state.preloader_other_action = false;
    });
    builder.addCase(getVideoApartmentReq.pending, (state, action) => {
      state.preloader_other_action = true;
    });

    //////////////////////////// loadVideoApartmentReq
    builder.addCase(loadVideoApartmentReq.fulfilled, (state, action) => {
      state.preloader_other_action = false;
    });
    builder.addCase(loadVideoApartmentReq.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader_other_action = false;
    });
    builder.addCase(loadVideoApartmentReq.pending, (state, action) => {
      state.preloader_other_action = true;
    });

    //////////////////////////// getListFaq
    builder.addCase(getListFaq.fulfilled, (state, action) => {
      state.preloader_other_action = false;
      state.listFaq = action.payload;
    });
    builder.addCase(getListFaq.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader_other_action = false;
    });
    builder.addCase(getListFaq.pending, (state, action) => {
      state.preloader_other_action = true;
    });

    //////////////////////////// getListInfoCompany
    builder.addCase(getListInfoCompany.fulfilled, (state, action) => {
      state.preloader_other_action = false;
      state.listInfoCompany = action.payload;
    });
    builder.addCase(getListInfoCompany.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader_other_action = false;
    });
    builder.addCase(getListInfoCompany.pending, (state, action) => {
      state.preloader_other_action = true;
    });

    //////////////////////////// getDataContacts
    builder.addCase(getDataContacts.fulfilled, (state, action) => {
      state.preloader_other_action = false;
      state.dataApp = action.payload;
    });
    builder.addCase(getDataContacts.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader_other_action = false;
    });
    builder.addCase(getDataContacts.pending, (state, action) => {
      state.preloader_other_action = true;
    });

    //////////////////////////// createApplicationUser
    builder.addCase(createApplicationUser.fulfilled, (state, action) => {
      state.preloader_other_action = false;
    });
    builder.addCase(createApplicationUser.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader_other_action = false;
    });
    builder.addCase(createApplicationUser.pending, (state, action) => {
      state.preloader_other_action = true;
    });
  }
});

export const { listAllRulesFN, listAllConveniencesFN, listPricesFN } = otherActionApartmentSlice.actions;

export default otherActionApartmentSlice.reducer;
