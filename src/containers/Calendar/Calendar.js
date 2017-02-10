import React from 'react';
import { connect } from 'react-redux';

// 引入样式
import './Calendar.scss';

// 引入action 
import { getData } from './../../actions/calendar';

// 引入UI组件
import Calendar from './../../components/calendarblock'

// Which part of the Redux global state does our component want to receive as props?
function mapStateToProps(state) {
  const { data } = state;
  return {
    data: data.calendarData
  };
}

export class CalendarPage extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.func,
    data: React.PropTypes.object
  };

  constructor(props) {
    super(props);
  }
  componentWillMount() {
    this.props.dispatch(getData())
  }

  render() {
    return (
      <div className="calendar-container">
        <Calendar data={this.props.data}/>
      </div>
    );
  }
}

export default connect(mapStateToProps)(CalendarPage);
