/**
 * Created by jiangrx on 12/24/15.
 */
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var ResourceUser = require('../../resources/account/UserResource');
var DispatcherAccount = require('../../dispatcher/account/AccountDispatcher');
var ConstantsUser = require('../../constants/account/UsersConstants');
let StoreRoles = require('../../store/account/RolesStore');
let StoreVDCs = require('../../store/VDC/vdcStore');

const ActionTypes = ConstantsUser.ActionTypes;
const FETCHED_USERS = 'FETCHED_USERS';
const FETCH_USER_FAIL = 'FETCH_USER_FAIL';
const FETCHED_LOGGED_IN_USERS = 'FETCHED_LOGGED_IN_USERS';
const FETCH_LOGGED_IN_USERS_FAIL = 'FETCH_LOGGED_IN_USERS_FAIL';
const ADD_USER_SUCCESS = 'ADD_USER_SUCCESS';
const ADD_USER_FAIL = 'ADD_USER_FAIL';
const EDIT_USER_SUCCESS = 'EDIT_USER_SUCCESS';
const EDIT_USER_FAIL = 'EDIT_USER_FAIL';
const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
const DELETE_USER_FAIL = 'DELETE_USER_FAIL';
const PARSED_ROLES = 'PARSED_ROLES';
const FETCHED_ROLES = 'FETCHED_ROLES';
const FETCHED_VDCS = 'FETCHED_VDCS';
const PARSED_VDCS = 'PARSED_VDCS';

let _users = [];
let _loggedInUsers = [];
let _roles = [];
let _vdcs = [];
let _rolesIndexes = [];
let _selectedVDCs = [];
let _displayFilter = 0;
let _totalSize = 0;

var UserStore = assign({}, EventEmitter.prototype, {

  fetchAllUsers: function (payload) {
    ResourceUser.fetchAllUsers(payload).then((results)=> {
      if (results.collection) {
        _users = results.collection.filter(function (user) {
          return user.links[1].title !== 'M_ROLE';
        });
        for (let i = 0; i < _users.length; i++) {
          let href = _users[i].links[1].href;
          _users[i].roleID = parseInt(href.substr(href.lastIndexOf('/') + 1));
        }
        _totalSize = results.totalSize - 1;
        this.emit(FETCHED_USERS);
      } else {
        this.emit(FETCH_USER_FAIL);
      }
    }, (reason) => {
      console.log(reason);
      this.emit(FETCH_USER_FAIL);
    });
  },
  fetchLoggedInUsers: function (payload) {
    ResourceUser.fetchLoggedInUsers(payload).then((results)=> {
      if (results.collection) {
        _loggedInUsers = results.collection.filter(function (user) {
          return user.links[1].title !== 'M_ROLE';
        });
        for (let i = 0; i < _loggedInUsers.length; i++) {
          let href = _users[i].links[1].href;
          _loggedInUsers[i].roleID = parseInt(href.substr(href.lastIndexOf('/') + 1));
        }
        _totalSize = results.totalSize - 1;
        this.emit(FETCHED_USERS);
      } else {
        this.emit(FETCH_USER_FAIL);
      }
    }, (reason) => {
      console.log(reason);
      this.emit(FETCH_USER_FAIL);
    });
  },
  addUser: function (payload) {
    ResourceUser.addUser(payload).then(()=> {
      this.emit(ADD_USER_SUCCESS);
      this.fetchAllUsers(payload);
    }, ()=> {
      this.emit(ADD_USER_FAIL);
    });
  },
  editUser: function (payload) {
    ResourceUser.editUser(payload).then(()=> {
      this.emit(EDIT_USER_SUCCESS);
      this.fetchAllUsers(payload);
    }, ()=> {
      this.emit(EDIT_USER_FAIL);
    });
  },
  deleteUser: function (payload) {
    ResourceUser.deleteUser(payload).then(()=> {
      this.emit(DELETE_USER_SUCCESS);
      this.fetchAllUsers(payload);
    }, ()=> {
      this.emit(DELETE_USER_FAIL);
    });
  },
  getTotalSize(){
    return _totalSize;
  },
  getUsers(){
    let ret;
    switch (_displayFilter) {
      case 0:
        ret = this.getAllUsers();
        break;
      case 1:
        ret = this.filterActiveUsers();
        break;
      case 2:
        ret = this.filterInactiveUsers();
        break;
      case 3:
        ret = this.getLoggedInUsers();
        break;
      default:
        ret = this.getAllUsers();
        break;
    }
    return ret;
  },
  getAllUsers(){
    return _users;
  },
  getLoggedInUsers(){
    return _loggedInUsers;
  },
  filterActiveUsers(){
    return _users.filter(function (user) {
      return user.active;
    });
  },
  filterInactiveUsers(){
    return _users.filter(function (user) {
      return !user.active;
    });
  },
  parseRoles(){
    _rolesIndexes = [];
    for (let i = 0; i < _roles.length; i++) {
      _rolesIndexes.push({text: _roles[i].name, payload: i});
    }
    this.emit(PARSED_ROLES);
  },
  parseVDCs(payload){
    _selectedVDCs = [-1];
    if (payload.availableVirtualDatacenters !== -1) {
      _selectedVDCs = payload.availableVirtualDatacenters.split(',');
      for (let i = 0; i < _selectedVDCs.length; i++) {
        _selectedVDCs[i] = parseInt(_selectedVDCs[i]);
      }
    }
    for (let i = 0; i < _vdcs.length; i++) {
      if (_selectedVDCs.indexOf(_vdcs[i].id) !== -1) {
        _vdcs[i].selected = true;
      } else {
        _vdcs[i].selected = false;
      }
    }
    this.emit(PARSED_VDCS);
  },
  getParsedRoles(){
    return _rolesIndexes;
  },
  getRoles(){
    return _roles;
  },
  getVDCs(){
    return _vdcs;
  },
  getSelectedVDCs(){
    return _selectedVDCs;
  },
  setSelectedVDCs(selectedVDCs){
    _selectedVDCs = selectedVDCs;
  },
  setDisplayFilter(payload){
    _displayFilter = payload.displayFilter;
  },
  getDisplayFilter(){
    return _displayFilter;
  },
  addFetchUsersListener(callback)
  {
    this.on(FETCHED_USERS, callback);
  },
  removeFetchUsersListener(callback){
    this.removeListener(FETCHED_USERS, callback);
  },
  addParsedRolesListener(callback){
    this.on(PARSED_ROLES, callback);
  },
  removeParsedRolesListener(callback){
    this.removeListener(PARSED_ROLES, callback);
  },
  addParsedVDCsListener(callback){
    this.on(PARSED_VDCS, callback);
  },
  removeParsedVDCsListener(callback){
    this.removeListener(PARSED_VDCS, callback);
  }
});

UserStore.dispatchToken = DispatcherAccount.register(function (action) {
  switch (action.type) {
    case ActionTypes.FETCH_ALL_USERS:
      UserStore.fetchAllUsers(action.payload);
      break;
    case ActionTypes.FETCH_LOGGED_IN_USERS:
      UserStore.fetchLoggedInUsers(action.payload);
      break;
    case ActionTypes.FETCH_ROLES:
      StoreRoles.once(FETCHED_ROLES, ()=> {
        console.log('fetched roles');
        _roles = StoreRoles.getRoles();
        UserStore.parseRoles();
      });
      break;
    case ActionTypes.FETCH_VDCS:
      StoreVDCs.fetchVDCs(action.payload);
      StoreVDCs.once(FETCHED_VDCS, ()=> {
        console.log('fetched VDCS in userstore');
        _vdcs = StoreVDCs.getVDCs().slice();
        UserStore.parseVDCs(action.payload);
      });
      break;
    case ActionTypes.ADD_USER:
      UserStore.addUser(action.payload);
      break;
    case ActionTypes.EDIT_USER:
      UserStore.editUser(action.payload);
      break;
    case ActionTypes.DELETE_USER:
      UserStore.deleteUser(action.payload);
      break;
    case ActionTypes.SET_DISPLAY_FILTER:
      UserStore.setDisplayFilter(action.payload);
      break;
    default:
      break;
  }
});

module.exports = UserStore;
