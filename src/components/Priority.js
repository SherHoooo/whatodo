import React from 'react';

import { Icon } from 'antd'

class Priority extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      hasChosed: false
    }
  }
  handleClick(e) {
    this.setState({hasChosed: true})
    this.props.handleChose(parseInt(e.currentTarget.getAttribute('data-key')))
  }
  render() {
    return (
      <ul className="priority-menu">
        <li className="priority-normal" data-key="0" onClick={this.handleClick.bind(this)}>
          <Icon type="star" />
          <span>普通</span>
        </li>
        <li className="priority-important" data-key="1" onClick={this.handleClick.bind(this)}>
          <Icon type="star" />
          <span>重要</span>
        </li>
        <li className="priority-urgent" data-key="2" onClick={this.handleClick.bind(this)}>
          <Icon type="star" />
          <span>紧急</span>
        </li>
      </ul>
    )
  }
}


export default Priority;
