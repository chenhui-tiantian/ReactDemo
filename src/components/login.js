'use strict';

var React = require('react');
var mui = require('material-ui');
var AppDispatcher = require('../dispatcher/ReactUcenterWebpackAppDispatcher');

var ThemeManager = require('material-ui/lib/styles/theme-manager');
var unicloudTheme = require('../themes/unicloud');


var UserStore = require('../store/UserStore');
var EnterpriseStore = require('../store/EnterpriseStore');
var EnterpriseResourceStore = require('../store/EnterpriseResourceStore');
var PrivilegeStore = require('../store/PrivilegeStore');

var RaisedButton = mui.RaisedButton;
var TextField = mui.TextField;
var LoginApp = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getChildContext() {
    return {
      muiTheme: ThemeManager.getMuiTheme(unicloudTheme)
    };
  },
  componentDidMount() {
    var self = this;
    UserStore.addAuthoredListener(function (user) {
      PrivilegeStore.fetchPrivileges(user.links.get('role').id).then(function () {
        EnterpriseStore.setCurrentEnterprise(user.links.get('enterprise').id);
        EnterpriseResourceStore.fetchEnterpriseResource(user.links.get('enterprise').id);
      });
    });

    UserStore.addFailedListener(function (err) {
      self.setState({
        err: err
      });
    });
  },
  getInitialState() {
    return {
      userName: '',
      password: '',
      err: null
    };
  },

  submitLogin() {
    AppDispatcher.dispatch({
      type: 'USER_LOGIN',
      userInfo: {
        userName: this.state.userName.trim(),
        password: this.state.password.trim()
      }
    });
  },
  onChange (ev) {
    var name = ev.target.name;
    var value = ev.target.value;
    if (name === 'username') {
      this.setState({
        userName: value
      });
    }
    if (name === 'password') {
      this.setState({
        password: value
      });
    }
  },
  render: function () {
    return (
      <div>
        <div className="login-frame">
          <h3> UniCenter 2.0 登录</h3>
          {this.state.err ? <div>登录失败！</div> : null}
          <TextField name="username" hintText="用户名" floatingLabelText="用户名" onChange={this.onChange}/>
          <TextField name="password" hintText="密码" floatingLabelText="密码" type="password" onChange={this.onChange} onEnterKeyDown={this.submitLogin}/>
          <div className="login-button">
            <RaisedButton label="登录" primary={true} onClick={this.submitLogin}/>
          </div>
        </div>
        <div className="fade mask"></div>
      </div>

    );
  }
});

module.exports = LoginApp;
