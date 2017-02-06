import reducersGenerate from './reducersGenerate';

// 引入常量
import { TASK } from './../constants/actionTypes';

import initialState from './initialState';

export default reducersGenerate(TASK.GATDATA, initialState.data.tasks, {
  'GET_TASK_DATA_PENDING': (state) => {
    return Object.assign({}, state, {
      isFetching: true
    });
  },
  'GET_TASK_DATA_FULFILLED': (state, action) => {
    return Object.assign({}, state, {
      isFetching: false,
      data: action.payload.data
    });
  },
  'GET_TASK_DATA_REJECTED': (state, action) => {
    return Object.assign({}, state, {
      isFetching: false
    });
  }
});


