import reducersGenerate from './reducersGenerate';

// 引入常量
import { TASK } from './../constants/actionTypes';

import initialState from './initialState';

// 获取所有数据
const getTaskData = reducersGenerate(TASK.GATDATA, initialState.data.tasks, {
  'GET_TASK_DATA_PENDING': (state) => {
    return Object.assign({}, state, {
      isFetching: true
    });
  },
  'GET_TASK_DATA_FULFILLED': (state, action) => {
    return Object.assign({}, state, {
      isFetching: false,
      data: action.payload.data
    });
  },
  'GET_TASK_DATA_REJECTED': (state, action) => {
    return Object.assign({}, state, {
      isFetching: false
    });
  }
});

// 添加任务
const addTask = reducersGenerate(TASK.ADDTASK, initialState.data.tasks, {
  'ADD_TASK_PENDING': (state) => {
    return Object.assign({}, state, {
      isFetching: true
    });
  },
  'ADD_TASK_FULFILLED': (state, action) => {
    const newstate = Object.assign({}, state, {isFetching: false})
    const newData = action.payload.data
    const index = action.payload.index
    var oldData = newstate.data[index].data
    newstate.data[index].data = [...oldData, newData]
    return newstate
  },
  'ADD_TASK_REJECTED': (state, action) => {
    return Object.assign({}, state, {
      isFetching: false
    });
  }
})

// 新建任务列表
const addList = reducersGenerate(TASK.ADDLIST, initialState.data.tasks, {
  'ADD_LIST_PENDING': (state) => {
    return Object.assign({}, state, {
      isFetching: true
    });
  },
  'ADD_LIST_FULFILLED': (state, action) => {
    return Object.assign({}, state, {
      isFetching: false,
      data: [...state.data, action.payload.data]
    });
  },
  'ADD_LIST_REJECTED': (state, action) => {
    return Object.assign({}, state, {
      isFetching: false
    });
  }
})

// 删除列表
const delList = reducersGenerate(TASK.DELLIST, initialState.data.tasks, {
  'DEL_LIST_PENDING': (state) => {
    return Object.assign({}, state, {
      isFetching: true
    });
  },
  'DEL_LIST_FULFILLED': (state, action) => {
    var newdata = Object.assign({}, state, {isFetching: false})
    var index = action.payload.index
    var data = [...state.data]
    data.splice(index, 1)
    return {
      isFetching: false,
      data: data
    }
  },
  'DEL_LIST_REJECTED': (state, action) => {
    return Object.assign({}, state, {
      isFetching: false
    });
  }
})

// 删除列表内所有任务
const delAllTask = reducersGenerate(TASK.DELALLTASK, initialState.data.tasks, {
  'DEL_ALL_TASK_PENDING': (state) => {
    return Object.assign({}, state, {
      isFetching: true
    });
  },
  'DEL_ALL_TASK_FULFILLED': (state, action) => {
    var newdata = Object.assign({}, state, {isFetching: false})
    var index = action.payload.index
    var data = [...state.data]
    data[index].data = []
    return {
      isFetching: false,
      data: data
    }
  },
  'DEL_ALL_TASK_REJECTED': (state, action) => {
    return Object.assign({}, state, {
      isFetching: false
    });
  }
})

// 改变任务状态
const changeStatus = reducersGenerate(TASK.CHANGESTATUS, initialState.data.tasks, {
  'CHANGE_STATUS_PENDING': (state) => {
    return Object.assign({}, state, {
      isFetching: true
    });
  },
  'CHANGE_STATUS_FULFILLED': (state, action) => {
    var newstate = Object.assign({}, state, {isFetching: false})
    var taskindex = action.payload.taskindex
    var listindex = action.payload.listindex
    var data = [...newstate.data]
    data[listindex].data[taskindex] = action.payload.data
    return {
      isFetching: false,
      data: data
    }
  },
  'CHANGE_STATUS_REJECTED': (state, action) => {
    return Object.assign({}, state, {
      isFetching: false
    });
  }
})

// 删除任务
const delTask = reducersGenerate(TASK.DELTASK, initialState.data.tasks, {
  'DEL_TASK_PENDING': (state) => {
    return Object.assign({}, state, {
      isFetching: true
    });
  },
  'DEL_TASK_FULFILLED': (state, action) => {
    var newstate = Object.assign({}, state, {isFetching: false})
    var taskindex = action.payload.taskindex
    var listindex = action.payload.listindex
    var data = [...newstate.data]
    data[listindex].data.splice(taskindex, 1)
    return {
      isFetching: false,
      data: data
    }
  },
  'DEL_TASK_REJECTED': (state, action) => {
    return Object.assign({}, state, {
      isFetching: false
    });
  }
})

// 重命名列表
const renameList = reducersGenerate(TASK.RENAMELIST, initialState.data.tasks, {
  'RENAME_LIST_PENDING': (state) => {
    return Object.assign({}, state, {
      isFetching: true
    });
  },
  'RENAME_LIST_FULFILLED': (state, action) => {
    var newdata = Object.assign({}, state, {isFetching: false})
    var index = action.payload.index
    var data = [...state.data]
    data[index].title = action.payload.title
    return {
      isFetching: false,
      data: data
    }
  },
  'RENAME_LIST_REJECTED': (state, action) => {
    return Object.assign({}, state, {
      isFetching: false
    });
  }
})

// 合成reducer
const taskReducers = (state = initialState.data.tasks, action) => {
  const type = action.type.replace(/_PENDING|_FULFILLED|_REJECTED/, '')
  switch(type) {
    case TASK.GETDATA:
      return getTaskData(state, action) 
    case TASK.ADDTASK:
      return addTask(state, action)
    case TASK.ADDLIST:
      return addList(state, action)
    case TASK.DELLIST:
      return delList(state, action)
    case TASK.DELALLTASK:
      return delAllTask(state, action)
    case TASK.CHANGESTATUS:
      return changeStatus(state, action)
    case TASK.DELTASK:
      return delTask(state, action)
    case TASK.RENAMELIST:
      return renameList(state, action)
    default:
      return state
  }
}

export default taskReducers

