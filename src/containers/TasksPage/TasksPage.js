import React from 'react';
import { connect } from 'react-redux';

// 引入样式
import './TasksPage.scss';

// 引入相关action
import { getData } from './../../actions/tasks';
import { addList } from './../../actions/tasks';

// 引入UI组件
import { Icon, Dropdown, Menu, Message} from 'antd'
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
    this.state = {
      newListTitle: '',
      visible: false
    }
    this.handleNewListTitle = this.handleNewListTitle.bind(this)
  }

  componentDidMount() {
    this.props.dispatch(getData());
  }
  handleVisibleChange(val) {
    this.setState({newListTitle: ''})
    this.setState({visible: val})
  }
  hidePopover() {
    this.setState({visible: false})
  }
  handleNewListTitle(e) {
    this.setState({newListTitle: e.target.value})
  }
  submitNewList() {
    this.setState({visible: false})
    const title = this.state.newListTitle
    if (!title.trim()) {
      Message.warning('请填写标题')
      return false
    }
    this.props.dispatch(addList({title: title}))
  }
  render() {
    const tasks = this.props.tasksData
    const tasksData = tasks.data
    const newListContent = (
      <Menu>
        <Menu.Item>
          <input type="text" placeholder="输入任务列表名..." 
          className="new-list-title" value={this.state.newListTitle} 
          onChange={this.handleNewListTitle}
          />
        </Menu.Item>
        <Menu.Divider/>
        <Menu.Item>
          <span className="cancel-new-list" onClick={()=>this.hidePopover()}>取消</span>
          <span className="submit-new-list" onClick={()=>this.submitNewList()}>确认</span>
        </Menu.Item>
      </Menu>
    )
    return (
      <div className="task-container">
        <ul className="task-list">
          {tasksData.map((data, index) => 
            <Tasklist
              key={data._id}
              listData={data}
              listindex={index}
              dispatch={this.props.dispatch}
            />
          )}
          <Dropdown overlay={newListContent} trigger={['click']} 
            visible={this.state.visible}
            onVisibleChange={this.handleVisibleChange.bind(this)}
            >
            <li className="add-task-list">
              <Icon type="plus" />
                <span>新建任务列表...</span>
            </li>
          </Dropdown>
        </ul>
      </div>
    );
  }
}

export default connect(mapStateToProps)(TasksPage);
