// 这里统一存放action常量

// auth.js
export const USER = 'USER';
export const LOGIN = 'LOGIN';
export const SIGN = 'SIGN';

export const CURRENT_USER_REQUEST = 'CURRENT_USER_REQUEST';
export const CURRENT_USER_SUCCESS = 'CURRENT_USER_SUCCESS';

// task数据相关
export const TASK = {
  GETDATA: 'GET_TASK_DATA',
  ADDTASK: 'ADD_TASK',
  ADDLIST: 'ADD_LIST',
  DELLIST: 'DEL_LIST',
  DELALLTASK: 'DEL_ALL_TASK',
  CHANGESTATUS: 'CHANGE_STATUS',
  RENAMELIST: 'RENAME_LIST',
  DELTASK: 'DEL_TASK'
}


// calendar数据相关
export const CALENDAR = {
  GETDATA: 'GET_CALENDAR_DATA'
}


// notice数据相关
export const NOTICE = {
  GETDATA: 'GET_NOTICE_DATA'
}