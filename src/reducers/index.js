import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import auth from './auth';
import data from './data';

import reducersGenerate from './reducersGenerate';

// 引入常量
import { USER } from './../constants/actionTypes';

import initialState from './initialState';

const users = reducersGenerate(USER, initialState.users);

const rootReducer = combineReducers({
  routing: routerReducer,
  auth,
  users,
  data
});

export default rootReducer;
