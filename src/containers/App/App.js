import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Login from './../Login/Login';
import { Link } from 'react-router';
import './App.scss';
import { Icon } from 'antd';

class App extends Component {
  static propTypes = {
    children: PropTypes.element,
    isAuthenticated: React.PropTypes.bool,
    routing: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.renderAuthenticatedPage = this.renderAuthenticatedPage.bind(this);

    this.state = {
      collapse: false
    };
  }

  componentDidMount() {
  }

  renderAuthenticatedPage() {
    return (
      <header>
        <div className="logo"></div>
        <ul className="header-menu">
          <li>
            <Link to="/task" activeClassName="active">任务</Link>
          </li>
          <li>
            <Link to="/calendar" activeClassName="active">日历</Link>
          </li>
          <li>
            <Link to="/notice" activeClassName="active">通知</Link>
          </li>
        </ul>
        <ul className="func-menu">
          <li className="search-pro"><Icon type="search" /></li>
          <li><Icon type="plus-circle-o" /></li>
          <li><Icon type="user" /></li>
        </ul>
      </header>
    );
  }

  render() {
    const { isAuthenticated } = this.props;
    return (
      <div>
        {isAuthenticated? this.renderAuthenticatedPage() : <Login/>}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { routing, auth: { isAuthenticated, user } } = state;
  return {
    isAuthenticated, user,routing
  };
}

export default connect(mapStateToProps)(App);
