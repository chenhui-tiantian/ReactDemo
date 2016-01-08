/**
 * Created by jiangrx on 12/25/15.
 */
var DispatcherAccount = require('../../dispatcher/account/AccountDispatcher');
var ConstantsRoles = require('../../constants/account/RolesConstants');

var ActionTypes = ConstantsRoles.ActionTypes;

module.exports = {

  fetchRoles: function (payload) {
    DispatcherAccount.dispatch({
      type: ActionTypes.FETCH_ROLES,
      payload: payload
    });
  },
  fetchScopeEnterprise(){
    DispatcherAccount.dispatch({
      type: ActionTypes.FETCH_SCOPE_ENTERPRISE
    });
  },
  selectRole: function (role) {
    DispatcherAccount.dispatch({
      type: ActionTypes.SELECT_ROLE_CHANGE,
      role: role
    });
  },
  getEnterpriseRoles: function (enterPriseID) {
    DispatcherAccount.dispatch({
      type: ActionTypes.GET_ENTERPRISE_ROLES,
      enterPriseID: enterPriseID
    });
  },
  deleteRoleByID: function (roleID) {
    DispatcherAccount.dispatch({
      type: ActionTypes.DELETE_ROLE,
      roleID: roleID
    });
  },
  addRole: function (links, name, ldap) {
    DispatcherAccount.dispatch({
      type: ActionTypes.ADD_ROLE,
      links: links,
      name: name,
      ldap: ldap
    });
  },
  getRolePrivilige: function (payload) {
    DispatcherAccount.dispatch({
      type: ActionTypes.GET_ROLE_PRIVILIEGE,
      payload: payload
    });
  },
  getCurrentRolePrivilige: function(payload){
    DispatcherAccount.dispatch({
      type: ActionTypes.GET_CURRENT_ROLE_PRIVILIEGE,
      payload: payload
    });
  },
  savePrivilege: function(payload){
    DispatcherAccount.dispatch({
      type: ActionTypes.SAVE_PRIVILEGE,
      payload: payload
    })
  }
};
