/**
 * Created by Administrator on 2015/12/31 0031.
 */
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var ConstantsRoles = require('../../constants/account/RolesConstants');
var RolesResource = require('../../resources/account/RolesResource');
var DispatcherAccount = require('../../dispatcher/account/AccountDispatcher');
const ActionTypes = ConstantsRoles.ActionTypes;
const GET_PRIVILEGE_SUCCESS = 'GET_PRIVILEGE_SUCCESS';
const GET_PRIVILEGE_FAIL = 'GET_PRIVILEGE_FAIL';
const GET_ROLEPRIVILEGE_SUCCESS = 'GET_ROLEPRIVILEGE_SUCCESS';
const GET_ROLEPRIVILEGE_FAIL = 'GET_ROLEPRIVILEGE_FAIL';
var _roleprivileges = {};
var _currentroleprivilege=[];

var PriviligeGroupStore = assign({}, EventEmitter.prototype, {
  fetchPrivilegeGrops(payload) {
   RolesResource.gerPrivilege(payload).then((result)=> {
        console.log('Roles stroe',result);
      if (result.collection) {
        _roleprivileges = result.collection;
        this.emit(GET_PRIVILEGE_SUCCESS);
      } else {
        this.emit(GET_PRIVILEGE_FAIL);
      }
    }, (reason)=> {
      console.log(reason);
      this.emit(GET_PRIVILEGE_FAIL);
    });
  },
  fetchRolePrivilegeGrops(payload) {
    RolesResource.getCurrentRolePriviliege(payload).then((result)=> {
      if (result.collection) {
        _currentroleprivilege = result.collection;
        this.emit(GET_ROLEPRIVILEGE_SUCCESS);
      } else {
        this.emit(GET_ROLEPRIVILEGE_FAIL);
      }
    }, (reason)=> {
      console.log(reason);
      this.emit(GET_ROLEPRIVILEGE_FAIL);
    });
  },

  getPrivilegeGrops(){
    return _roleprivileges;
  },
  getCurrentRolePrivilige(){
    return _currentroleprivilege;
  },
  getPrilvlegeFailListener(callback){
    this.on(GET_PRIVILEGE_FAIL, callback);
  },
  removePrilvlegeFailListener(callback){
    this.removeListener(GET_PRIVILEGE_FAIL, callback);
  },
  addGetPrilvlegeSuccessListener(callback){
    this.on(GET_PRIVILEGE_SUCCESS, callback);
  },
  removeGetPrilvlegeSuccessListener(callback){
    this.removeListener(GET_PRIVILEGE_SUCCESS, callback);
  },
  getCurrentPrilvlegeFailListener(callback){
    this.on(GET_ROLEPRIVILEGE_FAIL, callback);
  },
  removeCurrentPrilvlegeFailListener(callback){
    this.removeListener(GET_ROLEPRIVILEGE_FAIL, callback);
  },
  addCURRENTPrilvlegeSuccessListener(callback){
    this.on(GET_ROLEPRIVILEGE_SUCCESS, callback);
  },
  removeCURRENTPrilvlegeSuccessListener(callback){
    this.removeListener(GET_ROLEPRIVILEGE_SUCCESS, callback);
  }


});
PriviligeGroupStore.dispatchToken = DispatcherAccount.register(function (action) {
  switch (action.type) {
    case ActionTypes.GET_ROLE_PRIVILIEGE:
      PriviligeGroupStore.fetchPrivilegeGrops(action.payload);
      break;
    case ActionTypes.GET_CURRENT_ROLE_PRIVILIEGE:
      PriviligeGroupStore.fetchRolePrivilegeGrops(action.payload);
      break;
    default:
      break;
  }
});

module.exports = PriviligeGroupStore;
