import cFetch from './../utils/cFetch';
import cookie from 'js-cookie';
import { LOGIN, SIGN } from './../constants/actionTypes';
import { API_CONFIG } from './../config/api';

export const loginUser = (creds, cbk) => {
  return {
    type: LOGIN,
    fallback: cbk,
    payload: cFetch(API_CONFIG.auth, { method: "POST", body: JSON.stringify(creds) }).then(res => {
      cookie.set('user', res.user._id)
      return {status: res.status, message: res.message}
    })
  };
};

export const signUser = (creds, cbk) => {
  return {
    type: SIGN,
    payload: cFetch(API_CONFIG.sign, { method: "POST", body: JSON.stringify(creds) }).then(res => {
      cookie.set('user', res.user._id)
      return {status: res.status, message: res.message}
    })
  };
}