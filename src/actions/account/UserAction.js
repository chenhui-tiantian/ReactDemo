/**
 * Created by jiangrx on 12/24/15.
 */
var DispatcherAccount = require('../../dispatcher/account/AccountDispatcher');
var ConstantsUser = require('../../constants/account/UsersConstants');

var ActionTypes = ConstantsUser.ActionTypes;

module.exports = {

  addUser: function(payload) {
    DispatcherAccount.dispatch({
      type: ActionTypes.ADD_USER,
      payload: payload
    });
  },
  editUser: function(payload) {
    DispatcherAccount.dispatch({
      type: ActionTypes.EDIT_USER,
      payload: payload
    });
  },
  deleteUser: function(payload) {
    DispatcherAccount.dispatch({
      type: ActionTypes.DELETE_USER,
      payload: payload
    });
  },
  selectUser: function(payload){
    DispatcherAccount.dispatch({
      type: ActionTypes.SEARCH_ORGANIZATION,
      payload: payload
    });
  },
  fetchAllUsers: function(payload){
    DispatcherAccount.dispatch({
      type: ActionTypes.FETCH_ALL_USERS,
      payload: payload
    });
  },
  fetchLoggedInUsers: function(payload){
    DispatcherAccount.dispatch({
      type: ActionTypes.FETCH_LOGGED_IN_USERS,
      payload: payload
    });
  },
  fetchRoles: function(payload){
    DispatcherAccount.dispatch({
      type: ActionTypes.FETCH_ROLES,
      payload: payload
    });
  },
  fetchVDCs: function(payload){
    DispatcherAccount.dispatch({
      type: ActionTypes.FETCH_VDCS,
      payload: payload
    });
  },
  setDisplayFilter: function(payload) {
    DispatcherAccount.dispatch({
      type: ActionTypes.SET_DISPLAY_FILTER,
      payload: payload
    });
  }
};
