import axios from 'axios';
import config from '../config';
import {
  TASK_LIST_REQUEST,
  TASK_LIST_SUCCESS,
  TASK_LIST_FAIL,
  TASK_DETAILS_REQUEST,
  TASK_DETAILS_SUCCESS,
  TASK_DETAILS_FAIL,
  TASK_CREATE_REQUEST,
  TASK_CREATE_SUCCESS,
  TASK_CREATE_FAIL,
  TASK_UPDATE_REQUEST,
  TASK_UPDATE_SUCCESS,
  TASK_UPDATE_FAIL,
  TASK_DELETE_REQUEST,
  TASK_DELETE_SUCCESS,
  TASK_DELETE_FAIL,
} from '../constants/taskConstants';

// Get all tasks
export const listTasks = () => async (dispatch, getState) => {
  try {
    dispatch({ type: TASK_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`${config.API_URL}/api/tasks`, axiosConfig);

    dispatch({
      type: TASK_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TASK_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Get task details
export const getTaskDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: TASK_DETAILS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`${config.API_URL}/api/tasks/${id}`, axiosConfig);

    dispatch({
      type: TASK_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TASK_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Create a new task
export const createTask = (task) => async (dispatch, getState) => {
  try {
    dispatch({ type: TASK_CREATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const axiosConfig = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`${config.API_URL}/api/tasks`, task, axiosConfig);

    dispatch({
      type: TASK_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TASK_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Update a task
export const updateTask = (task) => async (dispatch, getState) => {
  try {
    dispatch({ type: TASK_UPDATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const axiosConfig = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `${config.API_URL}/api/tasks/${task._id}`,
      task,
      axiosConfig
    );

    dispatch({
      type: TASK_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TASK_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Delete a task
export const deleteTask = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: TASK_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`${config.API_URL}/api/tasks/${id}`, axiosConfig);

    dispatch({ type: TASK_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: TASK_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}; 