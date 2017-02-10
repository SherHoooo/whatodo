import { LOGIN, SIGN } from './../constants/actionTypes';
import initialState from './initialState';
import reducersGenerate from './reducersGenerate';

const login = reducersGenerate(LOGIN, initialState.auth, {
  'LOGIN_PENDING': (state) => {
    return Object.assign({}, state, {
      isFetching: true,
      isAuthenticated: false
    });
  },
  'LOGIN_FULFILLED': (state, action) => {
    if (action.payload.status === 200) {
      window.location.href="/task"
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true
      });
    }
    return Object.assign({}, state, {
      isFetching: false,
      isAuthenticated: false
    })
   
  },
  'LOGIN_REJECTED': (state, action) => {
    return Object.assign({}, state, {
      isFetching: false,
      isAuthenticated: false,
      errorMessage: action.message
    });
  }
});

const sign = reducersGenerate(SIGN, initialState.auth, {
  'SIGN_PENDING': (state) => {
    return Object.assign({}, state, {
      isFetching: true,
      isAuthenticated: false
    });
  },
  'SIGN_FULFILLED': (state, action) => {
    if (action.payload.status === 200) {
      window.location.href="/task"
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true
      });
    }
    return Object.assign({}, state, {
      isFetching: false,
      isAuthenticated: false
    })
  },
  'SIGN_REJECTED': (state, action) => {
    return Object.assign({}, state, {
      isFetching: false,
      isAuthenticated: false,
      errorMessage: action.message
    });
  }
});

const authReducers = (state = initialState.auth, action) => {
  const type = action.type.replace(/_PENDING|_FULFILLED|_REJECTED/, '')
  switch(type) {
    case LOGIN:
      return login(state, action) 
    case SIGN:
      return sign(state, action)
    default:
      return state
  }
}

export default authReducers