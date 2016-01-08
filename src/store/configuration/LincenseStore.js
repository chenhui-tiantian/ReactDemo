/**
 * Created by chenh on 2016/1/5.
 */

var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var LicenseResource = require('../../resources/configuration/LicenseResource');
var ConfigurationDispatcher = require('../../dispatcher/configuration/ConfigurationDispatcher');
var ConfigurationConstants = require('../../constants/configuration/ConfigurationConstants');
var StatusDialogStore = require('../common/StatusDialogStore');
var ActionTypes = ConfigurationConstants.ActionTypes;
var LICENSE_CHANGE = 'license_change';
var CUSTOMERCODE_CHANGE = 'customercode_change';

var _licenses = [];
var _customerCode = {};

var ConfigurationStore = assign({}, EventEmitter.prototype, {

   fetchLicenses: function () {
     LicenseResource.getLicenses().then(result => {
      if (result.collection) {
        _licenses = result.collection;
      }
      this.emit(LICENSE_CHANGE);
    });
  },

  fetchCustomerCode(){
    LicenseResource.getCustomerCode().then(result => {
      if (result.collection) {
        _customerCode = result.collection[0];
      }
      this.emit(CUSTOMERCODE_CHANGE);
    });
  },

  deleteLicense: function (id) {
    LicenseResource.deleteLicensesByID(id).then(() => {
      StatusDialogStore.pushMessage({title: '删除许可证', body: '删除成功！', isFail: false});
      this.fetchLicenses();
    }, (e)=> {
      StatusDialogStore.pushMessage({title: '删除许可证', body: e.message, isFail: true});
    });
  },

  addLicense: function(code){
    LicenseResource.addLicense(code).then(() => {
      StatusDialogStore.pushMessage({title: '添加许可证', body: '添加成功！', isFail: false});
      this.fetchLicenses();
    }, (e)=> {
      StatusDialogStore.pushMessage({title: '添加许可证', body: e.message, isFail: true});
    });
  },



  getCustomerCode(){
    return _customerCode;
  },

  getLicense()
  {
    return _licenses;
  },
  addLicenseChangedListener(callback)
  {
    this.on(LICENSE_CHANGE, callback);
  },
  removeLicenseChangedListener(callback){
    this.removeListener(LICENSE_CHANGE, callback);
  },
  addCustomerChangedListener(callback)
  {
    this.on(CUSTOMERCODE_CHANGE, callback);
  },
  removeCustomerChangedListener(callback){
    this.removeListener(CUSTOMERCODE_CHANGE, callback);
  }
});

ConfigurationDispatcher.register(function (action) {
  switch (action.type) {
    case ActionTypes.FETCH_LICENSE:
      ConfigurationStore.fetchLicenses();
      break;
    case ActionTypes.DELETE_LICENSE:
      ConfigurationStore.deleteLicense(action.id);
      break;
    case ActionTypes.ADD_LICENSE:
      ConfigurationStore.addLicense(action.code);
      break;
    case ActionTypes.FETCH_CUSTOMERCODE:
      ConfigurationStore.fetchCustomerCode();
      break;
    default:
      break;
  }
});

module.exports = ConfigurationStore;
