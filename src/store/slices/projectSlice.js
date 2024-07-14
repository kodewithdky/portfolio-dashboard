import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const projectSlice = createSlice({
  name: "project",
  initialState: {
    loading: false,
    projects: [],
    error: null,
    message: null,
    singleProject: {},
  },
  reducers: {
    //get projects
    getAllProjectsRequest(state, action) {
      state.projects = [];
      state.error = null;
      state.loading = true;
    },
    getAllProjectsSuccess(state, action) {
      state.projects = action.payload;
      state.error = null;
      state.loading = false;
    },
    getAllProjectsFailed(state, action) {
      state.projects = state.projects;
      state.error = action.payload;
      state.loading = false;
    },
    //add project
    addNewProjectRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    addNewProjectSuccess(state, action) {
      state.error = null;
      state.loading = false;
      state.message = action.payload;
    },
    addNewProjectFailed(state, action) {
      state.error = action.payload;
      state.loading = false;
      state.message = null;
    },
    //delete project
    deleteProjectRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    deleteProjectSuccess(state, action) {
      state.error = null;
      state.loading = false;
      state.message = action.payload;
    },
    deleteProjectFailed(state, action) {
      state.error = action.payload;
      state.loading = false;
      state.message = null;
    },
    //update project
    updateProjectRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    updateProjectSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
      state.error = null;
    },
    updateProjectFailed(state, action) {
      state.error = action.payload;
      state.loading = false;
      state.message = null;
    },
    //reset projects
    resetProjectSlice(state, action) {
      state.error = null;
      state.projects = state.projects;
      state.message = null;
      state.loading = false;
    },
    //clear all errors
    clearAllErrors(state, action) {
      state.error = null;
      state = state.projects;
    },
  },
});

//get projects
export const getAllProjects = () => async (dispatch) => {
  dispatch(projectSlice.actions.getAllProjectsRequest());
  try {
    const response = await axios.get(
      "http://localhost:7071/api/v1/project/get",
      { withCredentials: true }
    );
    dispatch(projectSlice.actions.getAllProjectsSuccess(response.data));
    dispatch(projectSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      projectSlice.actions.getAllProjectsFailed(error.response.data.message)
    );
  }
};

//add project
export const addNewProject = (data) => async (dispatch) => {
  dispatch(projectSlice.actions.addNewProjectRequest());
  try {
    const response = await axios.post(
      "http://localhost:7071/api/v1/project/add",
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    dispatch(projectSlice.actions.addNewProjectSuccess(response.data.message));
    dispatch(projectSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      projectSlice.actions.addNewProjectFailed(error.response.data.message)
    );
  }
};

//delete project
export const deleteProject = (id) => async (dispatch) => {
  dispatch(projectSlice.actions.deleteProjectRequest());
  try {
    const response = await axios.delete(
      `http://localhost:7071/api/v1/project/delete/${id}`,
      {
        withCredentials: true,
      }
    );
    dispatch(projectSlice.actions.deleteProjectSuccess(response.data.message));
    dispatch(projectSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      projectSlice.actions.deleteProjectFailed(error.response.data.message)
    );
  }
};

//update project
export const updateProject = (id, newData) => async (dispatch) => {
  dispatch(projectSlice.actions.updateProjectRequest());
  try {
    const response = await axios.put(
      `http://localhost:7071/api/v1/project/update/${id}`,
      newData,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    dispatch(projectSlice.actions.updateProjectSuccess(response.data.message));
    dispatch(projectSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      projectSlice.actions.updateProjectFailed(error.response.data.message)
    );
  }
};

//reset projects
export const resetProjectSlice = () => (dispatch) => {
  dispatch(projectSlice.actions.resetProjectSlice());
};

//clear all errors
export const clearAllProjectErrors = () => (dispatch) => {
  dispatch(projectSlice.actions.clearAllErrors());
};

export default projectSlice.reducer;
