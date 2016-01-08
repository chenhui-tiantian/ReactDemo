/**
 * Created by lenovo on 2015/11/26.
 */
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var ResourceHost = require('../../resources/datacenter/HostResource');
var DispatcherHost = require('../../dispatcher/datacenter/DataCenterDispatcher');
var ConstantsHost = require('../../constants/datacenter/HostConstants');

const ActionTypes = ConstantsHost.ActionTypes;
const DISCOVER_HOST_SUCCESS = 'DISCOVER_HOST_SUCCESS';
const DISCOVER_HOST_FAIL = 'DISCOVER_HOST_FAIL';
const ADD_HOST_SUCCESS = 'ADD_HOST_SUCCESS';
const ADD_HOST_FAIL = 'ADD_HOST_FAIL';
const FETCH_HOSTS_SUCCESS = 'FETCH_HOSTS_SUCCESS';
const FETCH_HOSTS_FAIL = 'FETCH_HOSTS_FAIL';
const EDIT_HOST_SUCCESS = 'EDIT_HOST_SUCCESS';
const EDIT_HOST_FAIL = 'EDIT_HOST_FAIL';
const DEL_HOST_SUCCESS = 'DEL_HOST_SUCCESS';
const DEL_HOST_FAIL = 'DEL_HOST_FAIL';
const TRIGGER_HOSTS_CHANGE = 'TRIGGER_HOSTS_CHANGE';
const TRIGGER_HOST_CHANGE = 'TRIGGER_HOST_CHANGE';
const STATE_CHECK_CHANGE = 'STATE_CHECK_CHANGE';
const STORAGE_SELECTION_CHANGE = 'STORAGE_SELECTION_CHANGE';

let _discoverRet = {};
var _hosts = [];
let _stateCheck = '';
let _storageSelection = [];
let _host = {};

let payLoadCheck = function (payload) {
  if (!payload.hasOwnProperty('start')) {
    payload.start = 0;
  } else {
    if (payload.start === 'undefined') {
      payload.start = 0;
    }
  }
  if (!payload.hasOwnProperty('limit')) {
    payload.limit = 10;
  } else {
    if (payload.limit === 'undefined') {
      payload.limit = 10;
    }
  }
  if (!payload.hasOwnProperty('name')) {
    payload.name = '';
  } else {
    if (payload.name === 'undefined') {
      payload.name = '';
    }
  }
};
var StoreHost = assign({}, EventEmitter.prototype, {

  discoverHost(payload){
    payLoadCheck(payload);
    ResourceHost.discoverHost(payload).then((result)=> {
      if (result.collection) {
        _discoverRet = result.collection[0];
        this.emit(DISCOVER_HOST_SUCCESS);
      } else {
        this.emit(DISCOVER_HOST_FAIL);
      }
    });
  },
  addHost(payload){
    payLoadCheck(payload);
    ResourceHost.addHost(payload).then(()=> {
      this.emit(ADD_HOST_SUCCESS);
      this.emit(TRIGGER_HOSTS_CHANGE);
    }, ()=> {
      this.emit(ADD_HOST_FAIL);
    });
  },
  fetchHosts(payload){
    payLoadCheck(payload);
    ResourceHost.searchHosts(payload).then((results)=> {
      if (results.collection) {
        _hosts = [];
        results = results.collection;
        for (let i = 0; i < results.length; i++) {
          _hosts.push({
            id: results[i].id,
            name: results[i].name,
            ip: results[i].ip,
            state: results[i].state,
            data: results[i]
          });
        }
        this.emit(FETCH_HOSTS_SUCCESS);
      } else {
        this.emit(FETCH_HOSTS_FAIL);
      }
    });
  },
  editHost(payload){
    payLoadCheck(payload);
    ResourceHost.editHost(payload).then(()=> {
      this.emit(EDIT_HOST_SUCCESS);
      this.emit(TRIGGER_HOSTS_CHANGE);
    }, ()=> {
      this.emit(EDIT_HOST_FAIL);
    });
  },
  deleteHost(payload){
    payLoadCheck(payload);
    ResourceHost.deleteHost(payload).then(()=> {
      this.emit(DEL_HOST_SUCCESS);
      this.emit(TRIGGER_HOSTS_CHANGE);
    }, ()=> {
      this.emit(DEL_HOST_FAIL);
    });
  },
  stateCheckHost(payload){
    ResourceHost.stateCheckHost(payload).then((result) => {
      if (result.state !== 'undefined') {
        console.log(result);
        _stateCheck = result.state;
        this.emit(STATE_CHECK_CHANGE);
      }
    });
  },

  storageSelectionUpdate(selection){
    _storageSelection = selection;
    this.emit(STORAGE_SELECTION_CHANGE);
  },
  triggerHostChange(host){
    _host = host;
    this.emit(TRIGGER_HOST_CHANGE);
  },
  getHosts(){
    return _hosts;
  },
  getHost(){
    return _host;
  },
  getCheckState(){
    return _stateCheck;
  },
  getStorageSelection(){
    return _storageSelection;
  },
  getDiscoverRet(){
    return _discoverRet;
  },
  addDiscoverHostSuccessListener(callback)
  {
    this.on(DISCOVER_HOST_SUCCESS, callback);
  },
  removeDiscoverHostSuccessListener(callback)
  {
    this.on(DISCOVER_HOST_SUCCESS, callback);
  },
  addAddHostSuccessListener(callback)
  {
    this.on(ADD_HOST_SUCCESS, callback);
  },
  removeAddHostSuccessListener(callback)
  {
    this.on(ADD_HOST_SUCCESS, callback);
  },
  addFetchHostsSuccessListener(callback)
  {
    this.on(FETCH_HOSTS_SUCCESS, callback);
  },
  removeFetchHostsSuccessListener(callback)
  {
    this.on(FETCH_HOSTS_SUCCESS, callback);
  },
  addEditHostsSuccessListener(callback)
  {
    this.on(EDIT_HOST_SUCCESS, callback);
  },
  removeEditHostsSuccessListener(callback)
  {
    this.on(EDIT_HOST_FAIL, callback);
  },
  addDeleteHostsSuccessListener(callback)
  {
    this.on(DEL_HOST_SUCCESS, callback);
  },
  removeDeleteHostsSuccessListener(callback)
  {
    this.on(DEL_HOST_FAIL, callback);
  },
  addTriggerHostsChange(callback){
    this.on(TRIGGER_HOSTS_CHANGE, callback);
  },
  removeTriggerHostsChange(callback){
    this.on(TRIGGER_HOSTS_CHANGE, callback);
  },
  addTriggerHostChange(callback){
    this.on(TRIGGER_HOST_CHANGE, callback);
  },
  removeTriggerHostChange(callback){
    this.on(TRIGGER_HOST_CHANGE, callback);
  },
  addStateCheckChange(callback){
    this.on(STATE_CHECK_CHANGE, callback);
  },
  removeStateCheckChange(callback){
    this.on(STATE_CHECK_CHANGE, callback);
  },
  addStorageSelectionChange(callback){
    this.on(STORAGE_SELECTION_CHANGE, callback);
  },
  removeStorageSelectionChange(callback){
    this.on(STORAGE_SELECTION_CHANGE, callback);
  }
});


DispatcherHost.register(function (action) {
  switch (action.type) {
    case ActionTypes.DISCOVER_HOST:
      StoreHost.discoverHost(action.payload);
      break;
    case ActionTypes.ADD_HOST:
      StoreHost.addHost(action.payload);
      break;
    case ActionTypes.LIST_HOSTS:
      StoreHost.fetchHosts(action.payload);
      break;
    case ActionTypes.EDIT_HOST:
      StoreHost.editHost(action.payload);
      break;
    case ActionTypes.DELETE_HOST:
      StoreHost.deleteHost(action.payload);
      break;
    case ActionTypes.STATE_CHECK_HOST:
      StoreHost.stateCheckHost(action.payload);
      break;
    case ActionTypes.STORAGE_SELECTION:
      StoreHost.storageSelectionUpdate(action.selection);
      break;
    case ActionTypes.TRIGGER_HOST_CHANGE:
      StoreHost.triggerHostChange(action.host);
      break;
    default:
      break;
  }
});

module.exports = StoreHost;
