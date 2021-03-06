let host;

if(process.env.NODE_ENV == "test"){
  host = "http://localhost:4000";
}else{
  host = location.origin;
}

const baseUri = host + "/api/v1/";
export const API_CONFIG = {
  host: host,
  baseUri: baseUri,
  auth: 'auth',
  users: 'users',
  sign: 'sign',
  tasks: {
    getData: 'tasksdata',
    addTask: 'addtask',
    addList: 'addlist',
    delList: 'dellist',
    delAllTask: 'delalltask',
    changeStatus: 'changestatus',
    renameList: 'renamelist',
    delTask: 'deltask'
  },
  calendar: {
    getData: 'calendardata'
  }
};
