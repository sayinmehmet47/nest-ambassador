import { createSlice } from '@reduxjs/toolkit';
import { userApi } from '../services/users';

export interface UserState {
  first_name: string;
  last_name: string;
  email: string;
  is_ambassador: Boolean;
}

const initialState: UserState = {
  first_name: '',
  last_name: '',
  email: '',
  is_ambassador: false,
};

export const authSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      userApi.endpoints.getUser.matchFulfilled,
      (state, { payload }) => {
        state.first_name = payload.first_name;
        state.last_name = payload.last_name;
        state.email = payload.email;
        state.is_ambassador = payload.is_ambassador;
      }
    );
  },
});

// Action creators are generated for each case reducer function
export const {} = authSlice.actions;

export default authSlice.reducer;
