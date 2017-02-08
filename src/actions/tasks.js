import cFetch from './../utils/cFetch';
import cookie from 'js-cookie';
import { TASK } from './../constants/actionTypes';
import { API_CONFIG } from './../config/api';

const userId = cookie.get('user')
export const getData = () => {
  return {
    type: TASK.GETDATA,
    payload: cFetch(API_CONFIG.tasks.getData, { method: "GET", params: {_id: userId} }).then(res => {
      // if(res.status === 403) return window.location.href="/login"
      return {
        data: res.data
      }
    })
  };
};

export const addTask = (task) => {
  task.user = userId
  return {
    type: TASK.ADDTASK,
    payload: cFetch(API_CONFIG.tasks.addTask, { method: "POST", body: JSON.stringify(task)}).then(res => {
      // if(res.status === 403) return window.location.href="/login"
      return res
    })
  }
}

export const addList = (list) => {
  list.user = userId
  return {
    type: TASK.ADDLIST,
    payload: cFetch(API_CONFIG.tasks.addList, { method: "POST", body: JSON.stringify({tasklist: list})}).then(res => {
      // if(res.status === 403) return window.location.href="/login"
      return res
    })
  }
}

export const delList = (list) => {
  const param = {
    index: list.index,
    listId: list._id,
    userid: userId
  }
  return {
    type: TASK.DELLIST,
    payload: cFetch(API_CONFIG.tasks.delList, { method: "POST", body: JSON.stringify(param)}).then(res => {
      return res
    })
  }
}

export const delAllTask = (list) => {
  const param = {
    index: list.index,
    listId: list._id,
    userid: userId
  }
  return {
    type: TASK.DELALLTASK,
    payload: cFetch(API_CONFIG.tasks.delAllTask, { method: "POST", body: JSON.stringify(param)}).then(res => {
      return res
    })
  }
}

export const changeStatus = (task) => {
  return {
    type: TASK.CHANGESTATUS,
    payload: cFetch(API_CONFIG.tasks.changeStatus, { method: "POST", body: JSON.stringify(task)}).then(res => {
      return res
    })
  }
}

export const delTask = (task) => {
  return {
    type: TASK.DELTASK,
    payload: cFetch(API_CONFIG.tasks.delTask, { method: "POST", body: JSON.stringify(task)}).then(res => {
      return res
    })
  }
}

export const renameList = (task) => {
  return {
    type: TASK.RENAMELIST,
    payload: cFetch(API_CONFIG.tasks.renameList, { method: "POST", body: JSON.stringify(task)}).then(res => {
      return res
    })
  }
}