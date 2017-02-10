import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/App/App';
import ConnectedTasksPage from './containers/TasksPage/TasksPage';
import ConnectedCalendarPage from './containers/Calendar/Calendar';
import Login from './containers/Login/Login';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Login}/>
    <Route path="task" component={ConnectedTasksPage}/>
    <Route path="calendar" component={ConnectedCalendarPage}/>
    <Route path="login" component={Login}/>
    <Route path="*" component={NotFoundPage}/>
  </Route>
);
