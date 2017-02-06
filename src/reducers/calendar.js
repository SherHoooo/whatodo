import reducersGenerate from './reducersGenerate';

// 引入常量
import { CALENDAR } from './../constants/actionTypes';

import initialState from './initialState';

export default reducersGenerate(CALENDAR.GATDATA, initialState.data.calendar);


