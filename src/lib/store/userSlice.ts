import { CompanyState } from "./../types";

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
export interface UserState {
  email: string;
  username: string;
  auth: boolean;
  isAdmin: boolean;
  id: number | null;
  company: CompanyState;
}
const initialState: UserState = {
  email: "",
  username: "",
  auth: true,
  isAdmin: true,
  id: null,
  company: {
    id: null,
    name: "",
    address: "",
    imageUrl: "",
    serviceChargeRate: null,
    taxRate: null,
    currency: "",
    coverPhoto: "",
  },
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loggedIn: (
      state,
      action: PayloadAction<{
        email: string;
        isAdmin: boolean;
        company: CompanyState;
      }>
    ) => {
      state.email = action.payload.email;
      state.isAdmin = action.payload.isAdmin;
      state.auth = true;
      state.company = action.payload.company;
    },

    updateCompany: (state, action: PayloadAction<CompanyState>) => {
      console.log(action.payload)
      state.company = action.payload;
    },

    loggedOut: (state) => {
      state.email = "";
      state.username = "";
      state.isAdmin = false;
      state.auth = false;
    },
  },
});

export const { loggedIn, loggedOut, updateCompany } = userSlice.actions;

export default userSlice.reducer;
