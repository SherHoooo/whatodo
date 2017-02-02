import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button } from 'antd';
import { loginUser } from './../../actions/auth';

import './Login.scss';

const createForm = Form.create;
const FormItem = Form.Item;

function noop() {
  return false;
}

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.loginFaileCallback = this.loginFaileCallback.bind(this);
    this.showLoginSign = this.showLoginSign.bind(this)
  }

  state = {
    isLogin: true
  }

  handleSubmit(e) {
    e.preventDefault();

    const { dispatch } = this.props;
    this.props.form.validateFields((errors) => {
      if (errors) {
        if((errors['sign-email'] || errors['sign-password'] || errors['sign-password']) && !this.state.isLogin) return false
        else if ((errors['login-email'] || errors['login-password']) && this.state.isLogin) return false
      }
      const fieldsVal = (this.props.form.getFieldsValue());
      if (this.state.isLogin) {
        const creds = {
          email: fieldsVal['login-email'],
          password: fieldsVal['login-email'],
          type: 'login'
        }
        dispatch(loginUser(creds, this.loginFaileCallback));
      }
      else {
        const creds = {
          email: fieldsVal['sign-email'],
          password: fieldsVal['sign-password'],
          nickname: fieldsVal['text'],
          type: 'sign'
        }
        dispatch(loginUser(creds, this.loginFaileCallback));
      }
    });
  }

  loginFaileCallback(email, message){
    const { setFields } = this.props.form;
    const newValue = {
      email: {
        name: "email",
        validating: false,
        value: email,
        errors: [message]
      }
    };
    setFields(newValue);
  }

  showLoginSign(e) {
    console.log(this)
    this.setState({isLogin: !this.state.isLogin})
  }

  render() {
    const { getFieldProps } = this.props.form;
    const loginEmailProps = getFieldProps('login-email', {
      validate: [{
        rules: [
          { required: true }
        ],
        trigger: 'onChange'
      }, {
        rules: [
          { type: 'email', message: '请输入正确的邮箱地址' }
        ],
        trigger: 'onChange'
      }]
    });
    const signEmailProps = getFieldProps('sign-email', {
      validate: [{
        rules: [
          { required: true }
        ],
        trigger: 'onChange'
      }, {
        rules: [
          { type: 'email', message: '请输入正确的邮箱地址' }
        ],
        trigger: 'onChange'
      }]
    });
    const loginPasswordProps = getFieldProps('login-password', {
      rules: [
        { required: true, min: 8, message: '密码至少为 8 个字符' }
      ],
      trigger: 'onChange'
    }); 
    const signPasswordProps = getFieldProps('sign-password', {
      rules: [
        { required: true, min: 8, message: '密码至少为 8 个字符' }
      ],
      trigger: 'onChange'
    });

    const nicknameProps = getFieldProps('text', {
      rules: [
        { required: true, min: 2, message: '昵称最少为2个字符'},
        {max: 7, message: '昵称最多为7个字符'}
      ],
      trigger: 'onChange'
    })
    // 展现登录框或者注册框
    let classString = '' + (this.state.isLogin ? 'login' : 'sign')
    return (
      <div className="login-container">
        <div className="login-mask"/>
        <Form className="login-content" horizontal onSubmit={this.handleSubmit}>
          <h2></h2>
          <div className="login-sign">
            <p><span onClick={this.showLoginSign}>登录</span><span onClick={this.showLoginSign}>注册</span></p>
            <div className={this.state.isLogin ? 'login' : 'sign'}></div>
          </div>
          <div className="login-block" style={{display: this.state.isLogin ? 'block' : 'none'}}>
            <FormItem hasFeedback>
              <Input
                {...loginEmailProps}
                placeholder="请输入登录邮箱"
                type="email"
                size="large"
              />
            </FormItem>
            <FormItem hasFeedback>
              <Input {...loginPasswordProps} type="password" autoComplete="off" placeholder="请输入密码"
                onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop} />
            </FormItem>
          </div>
          <div className="sign-block" style={{display: this.state.isLogin ? 'none' : 'block'}}>
            <FormItem hasFeedback>
              <Input
                {...nicknameProps}
                placeholder="昵称"
                type="text"
              />
            </FormItem>
            <FormItem hasFeedback>
              <Input
                {...signEmailProps}
                placeholder="请输入登录邮箱"
                type="email"
              />
            </FormItem>
            <FormItem hasFeedback>
              <Input {...signPasswordProps} type="password" autoComplete="off" placeholder="请输入密码"
                onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop} />
            </FormItem>
          </div>
          <FormItem>
            <Button className="ant-col-24" type="primary" htmlType="submit">{this.state.isLogin ? '登录' : '注册'}</Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

Login.propTypes = {
  form: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { auth } = state;
  return {
    auth
  };
}

export default connect(mapStateToProps)(createForm()(Login));
