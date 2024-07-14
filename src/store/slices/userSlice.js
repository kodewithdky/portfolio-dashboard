import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    user: {},
    isAuthenticated: false,
    error: null,
    message: null,
    isUpdated: false,
  },
  reducers: {
    //login
    loginRequest(state, action) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
      state.error = null;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    loginFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error = action.payload;
    },
    //load user
    loadUserRequest(state, action) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
      state.error = null;
    },
    loadUserSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    loadUserFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error = action.payload;
    },
    //logout user
    logoutSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error = null;
      state.message = action.payload;
    },
    logoutFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = state.isAuthenticated;
      state.user = state.user;
      state.error = action.payload;
    },
    //update password
    updatePasswordRequest(state, action) {
      state.loading = true;
      state.isUpdated = false;
      state.message = null;
      state.error = null;
    },
    updatePasswordSuccess(state, action) {
      state.loading = false;
      state.isUpdated = true;
      state.message = action.payload;
      state.error = null;
    },
    updatePasswordFailed(state, action) {
      state.loading = false;
      state.isUpdated = false;
      state.message = null;
      state.error = action.payload;
    },
    //update profile
    updateProfileRequest(state, action) {
      state.loading = true;
      state.isUpdated = false;
      state.message = null;
      state.error = null;
    },
    updateProfileSuccess(state, action) {
      state.loading = false;
      state.isUpdated = true;
      state.message = action.payload;
      state.error = null;
    },
    updateProfileFailed(state, action) {
      state.loading = false;
      state.isUpdated = false;
      state.message = null;
      state.error = action.payload;
    },
    //reset profile
    updateProfileResetAfterUpdate(state, action) {
      state.error = null;
      state.isUpdated = false;
      state.message = null;
    },

    //clear all errors
    clearAllErrors(state, action) {
      state.error = null;
      state.user = state.user;
    },
  },
});

//login
export const login = (email, password) => async (dispatch) => {
  dispatch(userSlice.actions.loginRequest());
  try {
    const { data } = await axios.post(
      "http://localhost:7071/api/v1/user/login",
      { email, password },
      { withCredentials: true, headers: { "Content-Type": "application/json" } }
    );
    console.log("data:",data)
    dispatch(userSlice.actions.loginSuccess(data));
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(userSlice.actions.loginFailed(error?.response?.data?.message));
  }
};

//get user
export const getUser = () => async (dispatch) => {
  dispatch(userSlice.actions.loadUserRequest());
  try {
    const { data } = await axios.get(
      "http://localhost:7071/api/v1/user/get-user",
      {
        withCredentials: true,
      }
    );
    dispatch(userSlice.actions.loadUserSuccess(data));
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(userSlice.actions.loadUserFailed(error.response.data.message));
  }
};
//get user
export const logout = () => async (dispatch) => {
  try {
    const { data } = await axios.get(
      "http://localhost:7071/api/v1/user/logout",
      {
        withCredentials: true,
      }
    );
    dispatch(userSlice.actions.logoutSuccess(data.message));
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(userSlice.actions.loadUserFailed(error.response.data.message));
  }
};
//update password
export const updatePassword =
  (currentPassword, newPassword, confirmPassword) => async (dispatch) => {
    dispatch(userSlice.actions.updatePasswordRequest());
    try {
      const { data } = await axios.put(
        "http://localhost:7071/api/v1/user/change-password",
        { currentPassword, newPassword, confirmPassword },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      dispatch(userSlice.actions.updatePasswordSuccess(data.message));
      dispatch(userSlice.actions.clearAllErrors());
    } catch (error) {
      dispatch(
        userSlice.actions.updatePasswordFailed(error.response.data.message)
      );
    }
  };
//update profile
export const updateProfile = (data) => async (dispatch) => {
  dispatch(userSlice.actions.updateProfileRequest());
  try {
    const response = await axios.put(
      "http://localhost:7071/api/v1/user/update-profile",
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    dispatch(userSlice.actions.updateProfileSuccess(response.data.message));
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      userSlice.actions.updateProfileFailed(error.response.data.message)
    );
  }
};
//reset profile
export const resetProfile = () => (dispatch) => {
  dispatch(userSlice.actions.updateProfileResetAfterUpdate());
};
//clear all errors
export const clearAllUserErrors = () => (dispatch) => {
  dispatch(userSlice.actions.clearAllErrors());
};

export default userSlice.reducer;
