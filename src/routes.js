import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/App/App';
import HomePage from './containers/HomePage/HomePage';
import ConnectedTasksPage from './containers/TasksPage/TasksPage';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={ConnectedTasksPage}/>
    <Route path="task" component={ConnectedTasksPage}/>
    <Route path="*" component={NotFoundPage}/>
  </Route>
);
