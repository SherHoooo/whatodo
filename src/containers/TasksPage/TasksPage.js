import React from 'react';
import { connect } from 'react-redux';

// 引入样式
import './TasksPage.scss';

// 引入相关action
import { getData } from './../../actions/tasks';

// 引入UI组件
import { Icon } from 'antd'
import Tasklist from './../../components/taskList/taskList'

// Which part of the Redux global state does our component want to receive as props?
function mapStateToProps(state) {
  const { data } = state;
  return {
    tasksData: data.tasksData
  };
}

export class TasksPage extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.func,
    taskData: React.PropTypes.array
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(getData());
  }

  render() {
    const tasks = this.props.tasksData
    const tasksData = tasks.data
    return (
      <div className="task-container">
        <ul className="task-list">
          {tasksData.map(data => 
            <Tasklist
              key={data._id}
              listData={data}
              dispatch={this.props.dispatch}
            />
          )}
          <li className="add-task-list">
            <Icon type="plus" /> 
            <span>新建任务列表...</span>
          </li>
        </ul>
      </div>
    );
  }
}

export default connect(mapStateToProps)(TasksPage);
