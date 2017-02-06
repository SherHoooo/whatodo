import { combineReducers } from 'redux';

import calendarData from './calendar';
import tasksData from './tasks';
import noticeData from './notice';

const dataReducer = combineReducers({
  tasksData,
  calendarData,
  noticeData
});

export default dataReducer;
