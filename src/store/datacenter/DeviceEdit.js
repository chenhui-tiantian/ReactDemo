/**
 * Created by jiangrx on 15-12-7.
 */
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var DeviceEditDispatcher = require('../../dispatcher/datacenter/StepPageDispatcher');
var StepPageConstants = require('../../constants/datacenter/DeviceEditConstants');

const ActionTypes = StepPageConstants.ActionTypes;
const INIT_DATA = 'INIT_DATA';
const CHANGE_DATA = 'UPDATE_DATA';

let _data = [];
var DeviceEditStore = assign({}, EventEmitter.prototype, {

  initData(len){
    for (let i = 0; i < len; i++) {
      _data.push(null);
    }
    this.emit(INIT_DATA);
  },
  updateData(payload){
    _data[payload.index] = {data: payload.data, allSet: payload.allSet};
    this.emit(CHANGE_DATA);
  },
  getData(){
    return _data;
  },
  addInitDataListener(callback){
    this.on(INIT_DATA, callback);
  },
  removeInitDataListener(callback){
    this.removeListener(INIT_DATA, callback);
  },
  addChangeDataListener(callback){
    this.on(CHANGE_DATA, callback);
  },
  removeChangeDataListener(callback){
    this.removeListener(CHANGE_DATA, callback);
  }
});

DeviceEditDispatcher.register(function (action) {
  switch (action.type) {
    case ActionTypes.INIT_DATA:
      DeviceEditStore.initData(action.dataLength);
      break;
    case ActionTypes.UPDATE_DATA:
      DeviceEditStore.updateData(action);
      break;
    default:
      break;
  }
});

module.exports = DeviceEditStore;
