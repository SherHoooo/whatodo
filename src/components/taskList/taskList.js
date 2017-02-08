import React from 'react';

// 引入UI组件
import { Menu, Dropdown, Icon, Popover, DatePicker, Button, message, Modal} from 'antd'

import Taskitem from './../taskItem/taskItem'
import Priority from './../Priority'
import Deadline from './../Deadline'
import './taskList.scss'

// 引入相关action
import { addTask, delList, delAllTask, renameList} from './../../actions/tasks';




class Tasklist extends React.Component {
  constructor(props) {
    super(props);
    this.handlePriorityMenuClick = this.handlePriorityMenuClick.bind(this)
    this.handleDeadlineChose = this.handleDeadlineChose.bind(this)
    this.state = {
      visible: false,
      priority: null,
      deadline: null,
      taskTitle: '',
      modalVisible: false,
      listVisible: false,
      renameVisible: false,
      rename: ''
    }
  }
  handleMenuClick(e) {
    return false
  }
  handleVisibleChange() {
    this.setState({visible: !this.state.visible})
  }
  handleListVisible() {
    this.setState({listVisible: !this.state.listVisible})
  }
  handlePriorityMenuClick(val) {
    this.setState({priority: val})
  }
  handleDeadlineChose(val) {
    this.setState({deadline: val})
  }
  handleTitleChange(e) {
    this.setState({taskTitle: e.target.value})
  }
  handleDeleteList() {
    this.setState({modalVisible: false})
    this.props.dispatch(delList({_id: this.props.listData._id, index: this.props.listindex}))
  }
  delAllTask() {
    this.setState({listVisible: false})
    this.props.dispatch(delAllTask({_id: this.props.listData._id, index: this.props.listindex}))
  }
  showDelModal() {
    this.setState({modalVisible: true})
    this.setState({listVisible: false})
  }
  showRenameModal() {
    this.setState({renameVisible: true})
    this.setState({listVisible: false})
  }
  hideModel() {
    this.setState({modalVisible: false})
  }
  handleRename() {
    this.setState({renameVisible: false})
    const props = this.props
    props.dispatch(renameList({listindex: props.listindex, title: this.state.rename, listid: props.listData._id}))
  }
  hideRenameModel() {
    this.setState({renameVisible: false})
  }
  handleRenameInput(e) {
    this.setState({rename: e.target.value})
  }
  submitAddTask() {
    if(!this.state.taskTitle) {
      message.warning('任务标题还没有填写')
      return false
    }
    const task = {
      priority: this.state.priority,
      deadline: this.state.deadline,
      title: this.state.taskTitle,
      status: 0,
      listid: this.props.listData._id,
      index: this.props.listindex
    }
    this.props.dispatch(addTask(task))
    this.setState({visible: false})
    this.setState({priority: null})
    this.setState({deadline: null})
    this.setState({taskTitle: ''})
  }
  render() {
    // 列表下拉菜单
    const listMenu = (
      <Menu>
        <Menu.Item>
          <div onClick={()=>this.showRenameModal()}>重命名</div>
        </Menu.Item>
        <Menu.Item>
          <div onClick={()=>this.showDelModal()}>删除列表</div>
        </Menu.Item>
        <Menu.Item>
          <div onClick={()=>this.delAllTask()}>清空任务</div>        
        </Menu.Item>
      </Menu>
    )
    const listData = this.props.listData
    const undoneNum = listData.data.length === 0 ? '' : (' · ' + listData.data.length)
    const showPriority = (val) => {
      switch(val) {
        case 0:
          return (
            <p><Icon type="star" /><span>普通</span></p>
          )
        case 1:
          return (
            <p className="priority-important"><Icon type="star" /><span>重要</span></p>
          )
        case 2:
          return (
            <p className="priority-urgent"><Icon type="star" /><span>紧急</span></p>
          )
        default :
          return (
            <p><Icon type="exclamation-circle-o" /><span>选择优先级</span></p>
          )
      }
    }
    // 增加任务下拉菜单
    const addTaskMenu = (
      <Menu className="add-task-menu" id={'add-task-menu'+this.props.listindex} onClick={() => this.handleMenuClick()}>
        <Menu.Item>
          <textarea placeholder="任务内容" value={this.state.taskTitle} onChange={this.handleTitleChange.bind(this)}></textarea>
        </Menu.Item>
        <Menu.Item>
          <Icon type="calendar" />
          <Deadline deadline={this.state.deadline} handleChose={this.handleDeadlineChose} listindex={this.props.listindex}/>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item>
          {showPriority(this.state.priority)}
          <Priority priority={this.state.priority} handleChose={this.handlePriorityMenuClick}/>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item className="submit-add-task">
          <Button type="primary" onClick={()=>this.submitAddTask()}>确定</Button>
        </Menu.Item>
      </Menu>
    )
    return (
      <li className="muti-task">
        <header>
          <span>{listData.title}{undoneNum}</span>
          <Dropdown overlay={listMenu} 
          visible={this.state.listVisible}
          onVisibleChange={() => this.handleListVisible()}
          trigger={['click']}>
            <Icon type="down" />
          </Dropdown>
        </header>
        <ul>
          {listData.data.map((data, index) => 
            <Taskitem
              key={data._id}
              data={data}
              listindex={this.props.listindex}
              taskindex={index}
              dispatch={this.props.dispatch}
            />
          )}
          <Dropdown 
            overlay={addTaskMenu} 
            visible={this.state.visible} 
            trigger={['click']}
            onVisibleChange={() => this.handleVisibleChange()}>
            <li className="add-task-item">
              <Icon type="plus" />
              <span>添加任务...</span>
            </li>
          </Dropdown>
        </ul>
        <Modal visible={this.state.modalVisible}
          onOk={this.handleDeleteList.bind(this)}
          onCancel={this.hideModel.bind(this)}
        >
          <h3>您确定永久删除此列表吗？</h3>
        </Modal>
         <Modal visible={this.state.renameVisible}
          onOk={this.handleRename.bind(this)}
          onCancel={this.hideRenameModel.bind(this)}
        >
          <input type="text" onChange={this.handleRenameInput.bind(this)} id="rename-list" placeholder={listData.title} />
        </Modal>
      </li>
    )
  }
}

export default Tasklist;
