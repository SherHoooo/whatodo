import cFetch from './../utils/cFetch';
import cookie from 'js-cookie';
import { CALENDAR } from './../constants/actionTypes';
import { API_CONFIG } from './../config/api';

const userId = cookie.get('user')

export const getData = () => {
  return {
    type: CALENDAR.GETDATA,
    payload: cFetch(API_CONFIG.calendar.getData, { method: "GET", params: {user: userId} }).then(res => {
      // if(res.status === 403) return window.location.href="/login"
      return res
    })
  };
};

