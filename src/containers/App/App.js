import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Login from './../Login/Login';
import { Link } from 'react-router';
import './App.scss';
import { Menu, Dropdown, Icon, Popover, Input} from 'antd';

// 用户按钮下拉菜单
const userMenu = (
  <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">修改密码</a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">上传头像</a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">退出登录</a>
    </Menu.Item>
  </Menu>
)

// 添加朋友气泡卡片
const addFriendPopContent = (
  <Input
        placeholder="请输入用户名"
        prefix={<Icon type="user" />}
      />
)

// 搜索气泡卡片
const searchPopContent = (
  <Input
        placeholder="请输入任务名称"
        prefix={<Icon type="search" />}
      />
)

// 主界面组件
class App extends Component {
  static propTypes = {
    children: PropTypes.element,
    isAuthenticated: React.PropTypes.bool,
    routing: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.renderAuthenticatedPage = this.renderAuthenticatedPage.bind(this);
  }

  componentDidMount() {
  }

  renderAuthenticatedPage() {
    return (
      <div id="wrapper">
        <header className="app-head">
          <div className="logo"></div>
          <ul className="header-menu">
            <li>
              <Icon type="pushpin-o" />
              <Link to="/task" activeClassName="active">任务</Link>
            </li>
            <li>
              <Icon type="calendar" />
              <Link to="/calendar" activeClassName="active">日历</Link>
            </li>
            <li>
              <Icon type="notification" />
              <Link to="/notice" activeClassName="active">通知</Link>
            </li>
          </ul>
          <ul className="func-menu">
            <li className="search-pro">
              <Popover content={searchPopContent} title="搜索任务">
                <Icon type="search" />
              </Popover>
            </li>
            <li className="add-friend">
              <Popover content={addFriendPopContent} title="添加朋友">
                <Icon type="plus-circle-o" />
              </Popover>
            </li>
            <li className="user-menu">
              <Dropdown overlay={userMenu} trigger={['click']}>
                <a className="ant-dropdown-link" href="#"></a>
              </Dropdown>
            </li>

          </ul>
        </header>
        <div className="main-contain">
          {this.props.children}
        </div>
      </div>
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
  console.log(state)
  return {
    isAuthenticated, user,routing
  };
}

export default connect(mapStateToProps)(App);
