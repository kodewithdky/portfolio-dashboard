import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const messageSlice = createSlice({
  name: "messages",
  initialState: {
    loading: false,
    messages: [],
    error: null,
    message: null,
  },
  reducers: {
    //get messages
    getAllMessagesRequest(state, action) {
      state.messages = [];
      state.error = null;
      state.loading = true;
    },
    getAllMessagesSuccess(state, action) {
      state.messages = action.payload;
      state.error = null;
      state.loading = false;
    },
    getAllMessagesFailed(state, action) {
      state.messages = state.messages;
      state.error = action.payload;
      state.loading = false;
    },
    //delete message
    deleteMessageRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    deleteMessageSuccess(state, action) {
      state.error = null;
      state.loading = false;
      state.message = action.payload;
    },
    deleteMessageFailed(state, action) {
      state.error = action.payload;
      state.loading = false;
      state.message = null;
    },
    //reset messages
    resetMessageSlice(state, action) {
      state.error = null;
      state.messages = state.messages;
      state.message = null;
      state.loading = false;
    },
    //clear all errors
    clearAllErrors(state, action) {
      state.error = null;
      state.messages = state.messages;
    },
  },
});

//get messages
export const getAllMessages = () => async (dispatch) => {
  dispatch(messageSlice.actions.getAllMessagesRequest());
  try {
    const response = await axios.get(
      "http://localhost:7071/api/v1/message/get",
      {
        withCredentials: true,
      }
    );
    dispatch(messageSlice.actions.getAllMessagesSuccess(response.data));
    dispatch(messageSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      messageSlice.actions.getAllMessagesFailed(error.response.data.message)
    );
  }
};

//delete message
export const deleteMessage = (id) => async (dispatch) => {
  dispatch(messageSlice.actions.deleteMessageRequest());
  try {
    const response = await axios.delete(
      `http://localhost:7071/api/v1/message/delete/${id}`,
      {
        withCredentials: true,
      }
    );
    dispatch(messageSlice.actions.deleteMessageSuccess(response.data.message));
    dispatch(messageSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      messageSlice.actions.deleteMessageFailed(error.response.data.message)
    );
  }
};

//clear all errors
export const clearAllMessageErrors = () => (dispatch) => {
  dispatch(messageSlice.actions.clearAllErrors());
};

//reset messages
export const resetMessagesSlice = () => (dispatch) => {
  dispatch(messageSlice.actions.resetMessageSlice());
};

export default messageSlice.reducer;
