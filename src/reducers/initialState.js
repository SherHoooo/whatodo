// 统一声明默认State
import cookie from 'js-cookie';

export default {
  auth: {
    isFetching: false,
    isAuthenticated: cookie.get('access_token') ? true : false
  },
  users: {
    isFetching: false,
    email: String,
    nickname: String
  },
  data: {
    tasks: {
      data: [],
      isFetching: false
    },
    calendar: {
      data: {},
      isFetching: false
    },
    notice: {
      data: [],
      isFetching: false
    }
  }
};
