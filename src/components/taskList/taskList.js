import React from 'react';

// 引入UI组件
import { Menu, Dropdown, Icon, Popover} from 'antd'

import Taskitem from './../../components/taskItem/taskItem'

import './taskList.scss'

const listMenu = (
  <Menu>
    <Menu.Item>重命名</Menu.Item>
    <Menu.Item>删除列表</Menu.Item>
    <Menu.Item>清空任务</Menu.Item>
  </Menu>
);



class Tasklist extends React.Component {
  constructor(props) {
    super(props);
    this.handleMenuClick = this.handleMenuClick.bind(this)
    this.handleVisibleChange = this.handleVisibleChange.bind(this)
    this.state = {
      addTaskMenuVisible: false
    }
  }
  handleMenuClick(e) {
    return false
  }
  handleVisibleChange() {
    this.setState({addTaskMenuVisible: !this.state.addTaskMenuVisible})
  }
  render() {
    const listData = this.props.listData
    const undone = listData.data.reduce((a, b) => b.status === 0 ? a+1 : a, 0)
    // 添加任务下拉菜单
    const addTaskMenu = (
      <Menu className="add-task-menu" onClick={() => this.handleMenuClick()}>
        <Menu.Item>
          <textarea placeholder="任务内容"></textarea>
        </Menu.Item>
        <Menu.Item>
          <Icon type="calendar" />
          <span>设置截止时间</span>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item>
          <Icon type="exclamation-circle-o" />
          <Dropdown overlay={priorityMenu} trigger={['click']}>
            <span>选择优先级</span>
          </Dropdown>
        </Menu.Item>
      </Menu>
    )
    //　设置优先级下拉菜单
    const priorityMenu = (
      <Menu className="priority-menu">
        <Menu.Item className="priority-normal">
          <Icon type="star" />
          <span>普通</span>
        </Menu.Item>
        <Menu.Item className="priority-important">
          <Icon type="star" />
          <span>重要</span>
        </Menu.Item>
        <Menu.Item className="priority-urgent">
          <Icon type="star" />
          <span>紧急</span>
        </Menu.Item>
      </Menu>
    )
    return (
      <li className="muti-task">
        <header>
          <span>{listData.title}·{undone}</span>
          <Dropdown overlay={listMenu}>
            <Icon type="down" />
          </Dropdown>
        </header>
        <ul>
          {listData.data.map(data => 
            <Taskitem
              key={data._id}
              data={data}
              dispatch={this.props.dispatch}
            />
          )}
          <Dropdown 
            overlay={addTaskMenu} 
            visible={this.state.addTaskMenuVisible} 
            trigger={['click']}
            onVisibleChange={() => this.handleVisibleChange()}>
            <li className="add-task-item">
              <Icon type="plus" />
              <span>添加任务...</span>
            </li>
          </Dropdown>
        </ul>
      </li>
    )
  }
}

export default Tasklist;
