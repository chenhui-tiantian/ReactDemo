/**
 * Created by chenh on 2016/1/6.
 */
'use strict';

var React = require('react');
var mui = require('material-ui');
const FlatButton = mui.FlatButton;
var LicenseList = require('./LicenseList');
var LincenseStore = require('../../store/configuration/LincenseStore');
var ConfiguartionAction = require('../../actions/configuration/ConfiguartionAction');

var ControlButtons = require('../common/ControlButtons');
var AddLicense = require('./AddLicense');

require('./configuration.css');

function getLicense() {
  return {
    licenses: LincenseStore.getLicense() || null,
    customerCode: LincenseStore.getCustomerCode() || null
  };
}

var License = React.createClass({
  getInitialState() {
    return {
      AddLicenseShow: false,
      licenses: LincenseStore.getLicense() || null
    };
  },
  _onDialogSubmit(){
    this.setState({AddLicenseShow: false});
  },

  componentDidMount(){
    LincenseStore.addLicenseChangedListener(this._onChange);
    LincenseStore.addCustomerChangedListener(this._onChange);
    ConfiguartionAction.fetchLicenses();
    ConfiguartionAction.fetchCustomerCode();
  },

  componentWillUnmount(){
    LincenseStore.removeLicenseChangedListener(this._onChange);
    LincenseStore.removeCustomerChangedListener(this._onChange);
  },
  _onChange(){
    this.setState(getLicense());
  },
  _onAddLicense(){
    this.setState({AddLicenseShow: true});
  },


  render: function () {
    var hasLicense = this.state.licenses.length;

    return (
        <div className="addlicense">
          <div>
            <label>许可证编号:{(this.state.customerCode == null || this.state.customerCode == {}) ? '' : this.state.customerCode.customerId }</label>
          </div>
          <div>
            {hasLicense !== 0 ? '':'请管理员，提交许可证编号'}
          </div>
          <ControlButtons buttons={{
                  addButton: true,
                  editButton: false,
                  deleteButton: false
                }} addButtonHandler={this._onAddLicense}/>

        <div className="addlicense">
          <LicenseList licenses={this.state.licenses}/>
        </div>

        <div>
          <AddLicense open={this.state.AddLicenseShow}
                      onRequestClose={this._onDialogSubmit}/>
        </div>

      </div>
    );
  }
});

module.exports = License;
