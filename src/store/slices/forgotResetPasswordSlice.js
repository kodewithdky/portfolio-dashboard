import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const forgotResetPassSlice = createSlice({
  name: "forgotPassword",
  initialState: {
    loading: false,
    error: null,
    message: null,
  },
  reducers: {
    //forgot password
    forgotPasswordRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    forgotPasswordSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    forgotPasswordFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    //reset password
    resetPasswordRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    resetPasswordSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    resetPasswordFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    //clear all errors
    clearAllErrors(state, action) {
      state.error = null;
      state = state;
    },
  },
});

//forgot password
export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch(forgotResetPassSlice.actions.forgotPasswordRequest());
    const response = await axios.post(
      "http://localhost:7071/api/v1/user/forgot-password",
      { email },
      { withCredentials: true, headers: { "Content-Type": "application/json" } }
    );
    dispatch(
      forgotResetPassSlice.actions.forgotPasswordSuccess(response.data.message)
    );
  } catch (error) {
    dispatch(
      forgotResetPassSlice.actions.forgotPasswordFailed(
        error.response.data.message
      )
    );
  }
};

//reset password
export const resetPassword =
  (token, newPassword, confirmPassword) => async (dispatch) => {
    try {
      dispatch(forgotResetPassSlice.actions.resetPasswordRequest());
      const response = await axios.put(
        ` http://localhost:7071/api/v1/user/reset-password/${token}`,
        { newPassword, confirmPassword },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      dispatch(
        forgotResetPassSlice.actions.resetPasswordSuccess(response.data.message)
      );
    } catch (error) {
      dispatch(
        forgotResetPassSlice.actions.resetPasswordFailed(
          error.response.data.message
        )
      );
    }
  };

//clear all errors
export const clearAllForgotResetPassErrors = () => (dispatch) => {
  dispatch(forgotResetPassSlice.actions.clearAllErrors());
};

export default forgotResetPassSlice.reducer;
