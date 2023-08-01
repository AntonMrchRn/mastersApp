import { createSlice } from '@reduxjs/toolkit';

import { Material, Service } from '@/store/api/tasks/types';

import { getTaskServices } from './asyncActions';
import { InitialState } from './types';

const initialState: InitialState = {
  progresses: {},
  currentTaskID: undefined,
  offerServices: [],
  offerComment: '',
  loading: false,
  error: undefined,
};

const tasks = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setProgresses: (state, { payload }) => {
      state.progresses = { ...state.progresses, ...payload };
    },
    deleteProgress: (state, { payload }) => {
      delete state.progresses[payload];
    },
    setNewOfferServices: (state, { payload }) => {
      state.offerServices = payload;
    },
    addOfferService: (state, { payload }) => {
      state.offerServices = state.offerServices.concat(payload);
    },
    addServiceLocalSum: (state, { payload }) => {
      state.offerServices = state.offerServices.reduce<Service[]>(
        (acc, val) => {
          if (val.ID === payload.serviceID) {
            return acc.concat({ ...val, localSum: payload.localSum });
          }
          return acc.concat(val);
        },
        []
      );
    },
    addMaterialLocalSum: (state, { payload }) => {
      state.offerServices = state.offerServices.reduce<Service[]>(
        (acc, val) => {
          if (val.ID === payload.serviceID) {
            const newMaterials = val.materials?.reduce<Material[]>(
              (matAcc, matVal) => {
                if (matVal.ID === payload.materialID) {
                  return matAcc.concat({
                    ...matVal,
                    localSum: payload.localSum,
                  });
                }
                return matAcc.concat(matVal);
              },
              []
            );
            return acc.concat({ ...val, materials: newMaterials });
          }
          return acc.concat(val);
        },
        []
      );
    },
    setOfferComment: (state, { payload }) => {
      state.offerComment = payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(getTaskServices.pending, state => {
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(getTaskServices.fulfilled, (state, { payload }) => {
      state.offerServices = payload.services;
      state.currentTaskID = payload.taskId;
      state.loading = false;
      state.error = undefined;
    });
    builder.addCase(getTaskServices.rejected, (state, { payload }) => {
      state.error = payload as Error;
      state.loading = false;
    });
  },
});

export default tasks;
