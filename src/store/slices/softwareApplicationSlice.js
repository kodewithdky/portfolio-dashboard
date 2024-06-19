import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const softwareApplicationSlice = createSlice({
  name: "softwareApplications",
  initialState: {
    loading: false,
    softwareApplications: [],
    error: null,
    message: null,
  },
  reducers: {
    //get soft app
    getAllsoftwareApplicationsRequest(state, action) {
      state.softwareApplications = [];
      state.error = null;
      state.loading = true;
    },
    getAllsoftwareApplicationsSuccess(state, action) {
      state.softwareApplications = action.payload;
      state.error = null;
      state.loading = false;
    },
    getAllsoftwareApplicationsFailed(state, action) {
      state.softwareApplications = state.softwareApplications;
      state.error = action.payload;
      state.loading = false;
    },
    //add soft app
    addNewsoftwareApplicationsRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    addNewsoftwareApplicationsSuccess(state, action) {
      state.error = null;
      state.loading = false;
      state.message = action.payload;
    },
    addNewsoftwareApplicationsFailed(state, action) {
      state.error = action.payload;
      state.loading = false;
      state.message = null;
    },
    //delete soft app
    deletesoftwareApplicationsRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    deletesoftwareApplicationsSuccess(state, action) {
      state.error = null;
      state.loading = false;
      state.message = action.payload;
    },
    deletesoftwareApplicationsFailed(state, action) {
      state.error = action.payload;
      state.loading = false;
      state.message = null;
    },
    //reset soft app
    resetSoftwareApplicationSlice(state, action) {
      state.error = null;
      state.softwareApplications = state.softwareApplications;
      state.message = null;
      state.loading = false;
    },
    //clear all errors
    clearAllErrors(state, action) {
      state.error = null;
      state.softwareApplications = state.softwareApplications;
    },
  },
});

//get soft app
export const getAllSoftwareApplications = () => async (dispatch) => {
  dispatch(
    softwareApplicationSlice.actions.getAllsoftwareApplicationsRequest()
  );
  try {
    const response = await axios.get(
      "http://localhost:7071/api/v1/soft-app/get",
      { withCredentials: true }
    );
    dispatch(
      softwareApplicationSlice.actions.getAllsoftwareApplicationsSuccess(
        response.data
      )
    );
    dispatch(softwareApplicationSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      softwareApplicationSlice.actions.getAllsoftwareApplicationsFailed(
        error.response.data.message
      )
    );
  }
};

//add soft app
export const addNewSoftwareApplication = (data) => async (dispatch) => {
  dispatch(
    softwareApplicationSlice.actions.addNewsoftwareApplicationsRequest()
  );
  try {
    const response = await axios.post(
      "http://localhost:7071/api/v1/soft-app/add",
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    dispatch(
      softwareApplicationSlice.actions.addNewsoftwareApplicationsSuccess(
        response.data.message
      )
    );
    dispatch(softwareApplicationSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      softwareApplicationSlice.actions.addNewsoftwareApplicationsFailed(
        error.response.data.message
      )
    );
  }
};

//delete soft app
export const deleteSoftwareApplication = (id) => async (dispatch) => {
  dispatch(
    softwareApplicationSlice.actions.deletesoftwareApplicationsRequest()
  );
  try {
    const response = await axios.delete(
      `http://localhost:7071/api/v1/soft-app/delete/${id}`,
      {
        withCredentials: true,
      }
    );
    dispatch(
      softwareApplicationSlice.actions.deletesoftwareApplicationsSuccess(
        response.data.message
      )
    );
    dispatch(softwareApplicationSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      softwareApplicationSlice.actions.deletesoftwareApplicationsFailed(
        error.response.data.message
      )
    );
  }
};

//clear all errors
export const clearAllSoftwareAppErrors = () => (dispatch) => {
  dispatch(softwareApplicationSlice.actions.clearAllErrors());
};

//reset soft app
export const resetSoftwareApplicationSlice = () => (dispatch) => {
  dispatch(softwareApplicationSlice.actions.resetSoftwareApplicationSlice());
};

export default softwareApplicationSlice.reducer;
