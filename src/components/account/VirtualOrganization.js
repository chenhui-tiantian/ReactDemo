/**
 * Created by chenh on 2015/11/19.
 * account management
 * include add search delete modify
 * a
 */
'use strict';

var React = require('react');
require('./account.css');

var mui = require('material-ui');
const RaisedButton = mui.RaisedButton;
const TextField = mui.TextField;

var AccountStore = require('../../store/account/AccountStore');
var AccountAction = require('../../actions/account/AccountAction');
var OrganizationList = require('./OrganizationList');

function getAllOrgnize() {
  return {
    organizes: AccountStore.getAllOrganizes() || null
  };
}

var VirtualOrganization = React.createClass({
  getInitialState: function () {
    AccountStore.searchOrganizeByName('');
    return getAllOrgnize();
  },

  componentDidMount(){
    AccountStore.addChangedListener(this._onChange);
  },

  componentWillUnmount(){
    AccountStore.removeChangedListener(this._onChange);
  },
  _onSearch()
  {
    AccountAction.selectAccountByName(this.refs.organizeName.getValue());
  },
  _onChange(){
    this.setState(getAllOrgnize());
  },

  render()
  {
    return (
      <div className="virtualOrganization">
        <div className="search">
          <TextField name="organizeName" hintText="虚拟组织名" ref="organizeName"/>
          <RaisedButton label="search" primary={true} onClick={this._onSearch}/>
        </div>

        <div className="list">
          <OrganizationList organizes={this.state.organizes}/>
        </div>

      </div>
    );
  }
});

module.exports = VirtualOrganization;
