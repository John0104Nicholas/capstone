import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userLoginReducer, userRegisterReducer } from './reducers/userReducers';
import { taskListReducer, taskDetailsReducer, taskCreateReducer, taskUpdateReducer, taskDeleteReducer } from './reducers/taskReducers';

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  taskList: taskListReducer,
  taskDetails: taskDetailsReducer,
  taskCreate: taskCreateReducer,
  taskUpdate: taskUpdateReducer,
  taskDelete: taskDeleteReducer,
});

// Get user info from localStorage if available
const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store; 