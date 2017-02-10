import reducersGenerate from './reducersGenerate';

// 引入常量
import { CALENDAR } from './../constants/actionTypes';

import initialState from './initialState';

// 获取所有数据
const getCalendarData = reducersGenerate(CALENDAR.GETDATA, initialState.data.calendar, {
  'GET_CALENDAR_DATA_PENDING': (state) => {
    return Object.assign({}, state, {
      isFetching: true
    });
  },
  'GET_CALENDAR_DATA_FULFILLED': (state, action) => {
    action.payload.data.hasData = true
    return Object.assign({}, state, {
      isFetching: false,
      data: action.payload.data
    });
  },
  'GET_CALENDAR_DATA_REJECTED': (state, action) => {
    return Object.assign({}, state, {
      isFetching: false
    });
  }
});

// 合成reducer
const calendarReducers = (state = initialState.data.calendar, action) => {
  const type = action.type.replace(/_PENDING|_FULFILLED|_REJECTED/, '')
  switch(type) {
    case CALENDAR.GETDATA:
      return getCalendarData(state, action)
    default:
      return state
  }
}

export default calendarReducers