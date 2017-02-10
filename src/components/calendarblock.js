import React from 'react';

// 引入UI组件
import { Calendar } from 'antd'

// import './taskItem.scss'

class CalendarBlock extends React.Component {
  constructor(props) {
    super(props);
    this.dateCellRender = this.dateCellRender.bind(this)
    this.state = {
      data: {
        '2017210': [{
          title: '哈哈哈哈',
          priority: 1,
          status: 2,
          id: 'fdafda'
        }]
      }
    }
  }
  dateCellRender(val) {
    const date = new Date(val.time).getDate()
    const month = new Date(val.time).getMonth()+1
    const year = new Date(val.time).getFullYear()
    const listData = this.props.data.data[''+year+month+date];
    if (!listData) return false
    return (
      <ul className="events">
        {
          listData.map(item => {
              var priority = item.priority || 0
              priority = priority === 0 ? 'normal' : (priority === 1 ? 'important' : 'urgent')
              return (
                <li key={item.id} className={`event-${priority}`}>
                  <span>●</span>
                  <span style={{textDecoration: item.status===2 ? 'line-through': 'none'}}>{item.title}</span>
                </li>
              )
            }
          )
        }
      </ul>
    );
  }
  render() {
    if (!this.props.data.data.hasData) return <Calendar  fullscreen={true}/>
    else return <Calendar dateCellRender={this.dateCellRender} fullscreen={true}/>
  }
}


export default CalendarBlock;

