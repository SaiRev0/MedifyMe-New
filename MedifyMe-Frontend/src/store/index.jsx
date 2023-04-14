import { configureStore } from "@reduxjs/toolkit";
import {
  patientReducer,
  loginSuccess,
  logoutSuccess,
} from "./slices/patientsSlice";
import {
  doctorReducer,
  doctorLoginSuccess,
  doctorLogoutSuccess,
} from "./slices/doctorsSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { patientApi } from "./apis/patientsApi";
import { doctorApi } from "./apis/doctorsApi";
import { meetApi } from "./apis/meetApi";

const store = configureStore({
  reducer: {
    patient: patientReducer,
    [patientApi.reducerPath]: patientApi.reducer,
    doctor: doctorReducer,
    [doctorApi.reducerPath]: doctorApi.reducer,
    [meetApi.reducerPath]: meetApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(patientApi.middleware)
      .concat(doctorApi.middleware)
      .concat(meetApi.middleware);
  },
});

setupListeners(store.dispatch);

export {
  store,
  loginSuccess,
  logoutSuccess,
  doctorLoginSuccess,
  doctorLogoutSuccess,
};

export {
  useLoginMutation,
  useRegisterMutation,
  useFetchHealthHistoryQuery,
  useFetchPrescriptionQuery,
  useHealthFormMutation,
  usePrescriptionFormMutation,
  useFetchVisitsQuery,
  useRequestDoctorMutation,
} from "./apis/patientsApi";

export {
  useDLoginMutation,
  useFetchPatientsQuery,
  useAcceptPatientsMutation,
} from "./apis/doctorsApi";

export { useFetchTokenQuery, useCreateMeetingMutation } from "./apis/meetApi";
