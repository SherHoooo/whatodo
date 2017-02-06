import reducersGenerate from './reducersGenerate';

// 引入常量
import { NOTICE } from './../constants/actionTypes';

import initialState from './initialState';

export default reducersGenerate(NOTICE.GATDATA, initialState.data.notice);


