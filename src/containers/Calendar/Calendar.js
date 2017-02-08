import React from 'react';
import { connect } from 'react-redux';

// 引入样式
import './Calendar.scss';

// 引入UI组件
import { Calendar } from 'antd'

// Which part of the Redux global state does our component want to receive as props?
function mapStateToProps(state) {
  const { data } = state;
  return {
    tasksData: data.tasksData
  };
}

export class CalendarPage extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.func,
    taskData: React.PropTypes.array
  };

  constructor(props) {
    super(props);
  }
  onPanelChange(val, date) {
    console.log(val, date)
  }
  render() {
    return (
      <div className="calendar-container">
        <Calendar onPanelChange={this.onPanelChange} />
      </div>
    );
  }
}

export default connect(mapStateToProps)(CalendarPage);
