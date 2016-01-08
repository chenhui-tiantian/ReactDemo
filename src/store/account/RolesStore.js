/**
 * Created by jiangrx on 12/25/15.
 * add by chenh : operater roles
 */
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var ResourceRoles = require('../../resources/account/RolesResource');
var ScopeResource = require('../../resources/account/ScopeResource');
var enterprisesResource = require('../../resources/enterprises');
var DispatcherAccount = require('../../dispatcher/account/AccountDispatcher');
var ConstantsRoles = require('../../constants/account/RolesConstants');
var StatusDialogStore = require('../common/StatusDialogStore');

const ActionTypes = ConstantsRoles.ActionTypes;
const FETCH_ROLE_FAIL = 'FETCH_ROLE_FAIL';
const FETCHED_ROLES = 'roles_change';
const ENTERPRISEROLES_CHANGE = 'enterpriseRole_change';
const GET_SCOPE_ENTERPRISE = 'scope_enterprise_change';
const SCOPE_ENTERPRISE_CHANGE = 'scope_enterprise_change';
const SELECT_ROLE_CHANGE = 'select_role_change';
const PRIVILEGE_SAVED = 'PRIVILEGE_SAVED';
let _roles = [];
let _totalSize = 0;

let _enterpriseRoles = [];
let _scopes = [];
var _enterprises = [];

var _selectRole = {};

var RolesStore = assign({}, EventEmitter.prototype, {

  fetchScopes() {
    ScopeResource.fetchScopes().then((result) => {
      if (result.collection) {
        _scopes = result.collection;
        this.emit(SCOPE_ENTERPRISE_CHANGE);
      }
    });
  },

  fetchEnterprise(){
    enterprisesResource.fetchAll().then((result) => {
      if (result.collection) {
        _enterprises = result.collection;
        _enterprises.unshift({
          id: 0,
          name: '全局角色'
        });


        this.emit(SCOPE_ENTERPRISE_CHANGE);
      }
    });
  },

  fetchRoles(payload) {
    ResourceRoles.fetchRoles(payload).then((results)=> {
      if (results.collection) {
        _roles = results.collection.filter(function (role) {
          return role.name !== 'M_ROLE';
        });
        _totalSize = results.totalSize - 1;
        console.log('roles fetched');
        this.emit(FETCHED_ROLES);
      } else {
        this.emit(FETCH_ROLE_FAIL);
      }
    }, (reason) => {
      console.log(reason);
      this.emit(FETCH_ROLE_FAIL);
    });
  },

  searchEnterpriseRoles: function (enterpriseid) {
    ResourceRoles.getEnterpriseRoles(enterpriseid).then(result => {
      _enterpriseRoles = [];
     if(result.collection){
       this.selectRole(result.collection[0]);
       result.collection.forEach(role => {
         if (role.idEnterprise) {
           _enterpriseRoles.push(role);

         } else {
           let name = role.name;
           role.name = name + '(全局角色)';
           _enterpriseRoles.unshift(role);
         }
       });

       this.emit(ENTERPRISEROLES_CHANGE);
     }
     });

  },

  addRole(links, name, ldap){
    console.log('store');
    ResourceRoles.addRole(links, name, ldap).then(() => {
      StatusDialogStore.pushMessage({title: '添加角色', body: '成功添加角色', isFail: false});
      this.searchEnterpriseRoles();
    }, (e)=> {
      StatusDialogStore.pushMessage({title: '添加角色', body: e.message, isFail: true});
    });
  },

  deleteRoleByID(roleID){
    ResourceRoles.deleteRoleByID(roleID).then(() => {
      StatusDialogStore.pushMessage({title: '删除角色', body: '成功删除角色', isFail: false});
      this.searchEnterpriseRoles();
    }, (e)=> {
      StatusDialogStore.pushMessage({title: '删除角色', body: e.message, isFail: true});
    });
  },

  savePrivilege(payload){
    ResourceRoles.savePrivilege(payload).then(()=>{
      this.emit(PRIVILEGE_SAVED);
    });
  },
  selectRole(role){
    _selectRole = role;
    console.log(_selectRole);
    window.setTimeout(()=> {
      this.emit(SELECT_ROLE_CHANGE);
    });
  },

  getTotalSize()
  {
    return _totalSize;
  },

  getRoles()
  {
    return _roles;
  },

  getEnterpriseRoles()
  {
    return _enterpriseRoles;
  },

  getScopes(){
    return _scopes;
  },

  getEnterprises(){
    return _enterprises;
  },

  getSelectRole()
  {
    return _selectRole;
  },
  addSelectRoleListener(callback)
  {
    this.on(SELECT_ROLE_CHANGE, callback);
  },

  removeSelectRoleListener(callback)
  {
    this.removeListener(SELECT_ROLE_CHANGE, callback);
  },

  addFetchRolesListener(callback)
  {
    this.on(FETCHED_ROLES, callback);
  },

  removeRolesListener(callback)
  {
    this.removeListener(FETCHED_ROLES, callback);
  },
  addEnterpriseRolesListener(callback)
  {
    this.on(ENTERPRISEROLES_CHANGE, callback);
  },

  removeEnterpriseRolesListener(callback)
  {
    this.removeListener(ENTERPRISEROLES_CHANGE, callback);
  },
  addScopeEnterpriseListener(callback)
  {
    this.on(SCOPE_ENTERPRISE_CHANGE, callback);
  },

  removeScopeEnterpriseListener(callback)
  {
    this.removeListener(SCOPE_ENTERPRISE_CHANGE, callback);
  }
});

RolesStore.dispatchToken = DispatcherAccount.register(function (action) {
  switch (action.type) {
    case ActionTypes.FETCH_ROLES:
      RolesStore.fetchRoles(action.payload);
      break;
    case ActionTypes.GET_ENTERPRISE_ROLES:
      RolesStore.searchEnterpriseRoles(action.enterPriseID);
      break;
    case ActionTypes.FETCH_SCOPE_ENTERPRISE:
      RolesStore.fetchScopes();
      RolesStore.fetchEnterprise();
      break;
    case ActionTypes.ADD_ROLE:
      RolesStore.addRole(action.links, action.name, action.ldap);
      break;
    case ActionTypes.DELETE_ROLE:
      RolesStore.deleteRoleByID(action.roleID);
      break;
    case ActionTypes.SELECT_ROLE_CHANGE:
      RolesStore.selectRole(action.role);
      break;
    case ActionTypes.SAVE_PRIVILEGE:
      RolesStore.savePrivilege(action.payload);
      break;
    default:
      break;
  }
});

module.exports = RolesStore;
