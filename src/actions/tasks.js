import cFetch from './../utils/cFetch';
import cookie from 'js-cookie';
import { TASK } from './../constants/actionTypes';
import { API_CONFIG } from './../config/api';

export const getData = () => {
  return {
    type: TASK.GETDATA,
    payload: cFetch(API_CONFIG.tasks.getData, { method: "GET", params: {} }).then(res => {
      return {
        data: res.data
      }
    })
  };
};
