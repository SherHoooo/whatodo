import React from 'react';

// 引入UI组件
import { Menu, Dropdown, Icon, Tooltip } from 'antd'

import { formateTime } from './../../utils/tool'

import './taskItem.scss'

const statusMenu = (
  <Menu>
    <Menu.Item>
      <Tooltip title="未完成" placement="right">
        <Icon type="frown" />
      </Tooltip>
    </Menu.Item>
    <Menu.Item>
      <Tooltip title="进行中" placement="right">
        <Icon type="meh" />
      </Tooltip>
    </Menu.Item>
    <Menu.Item>
      <Tooltip title="已完成" placement="right">
        <Icon type="smile" />
      </Tooltip>
    </Menu.Item>
  </Menu>
);

class Taskitem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const data = this.props.data
    const classString = (data.status === 2 ? 'done': '')
    const priorityClass = (data.priority === 1) ? 'important' : (data.priority===2 ? 'urgent':'normal')
    return (
      <li className={'task-item '+classString + ' '+ priorityClass}>
        <div className="task-status">
          <Dropdown overlay={statusMenu}>
            {returnIcon(data.status, 'status')}
          </Dropdown>
        </div>
        <div className="task-title">
          {data.title}
          <p><span className='deadline'>{formateTime(data.deadline)}截止</span></p>
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
