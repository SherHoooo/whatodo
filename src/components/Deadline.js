import React from 'react';

import { DatePicker } from 'antd'
import zhCN from 'antd/lib/date-picker/locale/zh_CN';
import moment from 'moment'

class Deadline extends React.Component {
  constructor(props) {
    super(props);
    this.handlePicker = this.handlePicker.bind(this)
    this.getContainer = this.getContainer.bind(this)
  }
  handlePicker(val, dateString) {
    this.props.handleChose(val)
  }
  handleClick(e) {
  }
  disabledDate(current) {
    return current && current.time < Date.now();
  }
  getContainer() {
    return document.getElementById('add-task-menu'+this.props.listindex)
  }
  render() {
    return (
     <DatePicker
      showTime
      locale={zhCN}
      format="YYYY-MM-DD HH:mm"
      disabledDate={this.disabledDate}
      placeholder="可以不填喔~"
      onChange={this.handlePicker}
      getCalendarContainer={this.getContainer}
     />
    )
  }
}


export default Deadline;

