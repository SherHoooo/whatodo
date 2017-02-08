import React from 'react';

// 引入UI组件
import { Menu, Dropdown, Icon, Tooltip, Popconfirm} from 'antd'

import { formateTime } from './../../utils/tool'

import { changeStatus, delTask } from './../../actions/tasks';

import './taskItem.scss'

class Taskitem extends React.Component {
  constructor(props) {
    super(props);
  }
  handleChangeStatus(val) {
    if (val === this.props.data.status) return false
    this.props.dispatch(changeStatus({taskId: this.props.data._id, status: val, listindex: this.props.listindex, taskindex: this.props.taskindex}))
  }
  confirmDelTask() {
    this.props.dispatch(delTask({taskId: this.props.data._id, listindex: this.props.listindex, taskindex: this.props.taskindex}))
  }
  render() {
    const statusMenu = (
      <Menu>
        <Menu.Item>
          <div onClick={()=>this.handleChangeStatus(0)}>
            <Tooltip title="未完成" placement="right">
              <Icon type="frown" />
            </Tooltip>
          </div>
        </Menu.Item>
        <Menu.Item>
          <div onClick={()=>this.handleChangeStatus(1)}>
            <Tooltip title="进行中" placement="right">
              <Icon type="meh" />
            </Tooltip>
          </div>
        </Menu.Item>
        <Menu.Item>
          <div onClick={()=>this.handleChangeStatus(2)}>
            <Tooltip title="已完成" placement="right">
              <Icon type="smile" />
            </Tooltip>
          </div>
        </Menu.Item>
      </Menu>
    );
    const data = this.props.data
    const classString = (data.status === 2 ? 'done': '')
    const priorityClass = (data.priority === 1) ? 'task-important' : (data.priority===2 ? 'task-urgent':'task-normal')
    var dealineSpan = () => false
    if (data.deadline) {
      dealineSpan = () => <p><span className='deadline'>{formateTime(data.deadline)}</span></p>
    }
    return (
      <li className={'task-item '+classString + ' '+ priorityClass}>
        <div className="task-status">
          <Dropdown overlay={statusMenu}>
            {returnIcon(data.status, 'status')}
          </Dropdown>
        </div>
        <div className="task-title">
          <span className="task-title-content">{data.title}</span>
          {dealineSpan()}
        </div>
        <div className="task-delete">
          <Popconfirm title="确定删除此任务?" onConfirm={()=>this.confirmDelTask()} okText="确定" cancelText="取消">
            <Icon type="delete" />
          </Popconfirm> 
        </div>
      </li>
    )
  }
}


// 返回相应的状态Icon
const returnIcon = (status, type='status') => {
  if (status === 0) return <Icon type="frown" />
  else if(status === 1) return <Icon type="meh" />
  else if(status === 2) return <Icon type="smile" />
}

export default Taskitem;

