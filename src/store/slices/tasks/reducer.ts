import { createSlice } from '@reduxjs/toolkit';

import { Material, Service } from '@/store/api/tasks/types';

import { InitialState } from './types';

const initialState: InitialState = {
  progresses: {},
  offerServices: [],
  offerComment: '',
  loading: false,
  error: undefined,
  offerID: undefined,
  filesOnDevice: undefined,
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
    setTaskFilesOnDevice: (state, { payload }) => {
      state.filesOnDevice = payload;
    },
    setTaskFileOnDevice: (state, { payload }) => {
      state.filesOnDevice = { ...state.filesOnDevice, ...payload };
    },
    setNewOfferServices: (state, { payload }) => {
      state.offerServices = payload;
    },
    addOfferService: (state, { payload }) => {
      state.offerServices = state.offerServices.concat(payload);
    },
    addServiceLocalPrice: (state, { payload }) => {
      state.offerServices = state.offerServices.reduce<Service[]>(
        (acc, val) => {
          if (val.ID === payload.serviceID) {
            return acc.concat({ ...val, localPrice: payload.localPrice });
          }
          return acc.concat(val);
        },
        [],
      );
    },
    addServiceLocalCount: (state, { payload }) => {
      state.offerServices = state.offerServices.reduce<Service[]>(
        (acc, val) => {
          if (val.ID === payload.serviceID) {
            return acc.concat({ ...val, localCount: payload.localCount });
          }
          return acc.concat(val);
        },
        [],
      );
    },
    addMaterialLocalPrice: (state, { payload }) => {
      state.offerServices = state.offerServices.reduce<Service[]>(
        (acc, val) => {
          if (val.ID === payload.serviceID) {
            const newMaterials = val.materials?.reduce<Material[]>(
              (matAcc, matVal) => {
                if (matVal.ID === payload.materialID) {
                  return matAcc.concat({
                    ...matVal,
                    localPrice: payload.localPrice,
                  });
                }
                return matAcc.concat(matVal);
              },
              [],
            );
            return acc.concat({ ...val, materials: newMaterials });
          }
          return acc.concat(val);
        },
        [],
      );
    },
    addMaterialLocalCount: (state, { payload }) => {
      state.offerServices = state.offerServices.reduce<Service[]>(
        (acc, val) => {
          if (val.ID === payload.serviceID) {
            const newMaterials = val.materials?.reduce<Material[]>(
              (matAcc, matVal) => {
                if (matVal.ID === payload.materialID) {
                  return matAcc.concat({
                    ...matVal,
                    localCount: payload.localCount,
                  });
                }
                return matAcc.concat(matVal);
              },
              [],
            );
            return acc.concat({ ...val, materials: newMaterials });
          }
          return acc.concat(val);
        },
        [],
      );
    },
    setOfferComment: (state, { payload }) => {
      state.offerComment = payload;
    },
    setOfferID: (state, { payload }) => {
      state.offerID = payload;
    },
  },
});

export default tasks;
