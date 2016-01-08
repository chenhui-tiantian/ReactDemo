/**
 * Created by jiangrx on 15-12-4.
 */
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var StepPageDispatcher = require('../../dispatcher/common/StepPageDispatcher');
var StepPageConstants = require('../../constants/common/StepPageConstants');

const ActionTypes = StepPageConstants.ActionTypes;
const INIT_DATA = 'INIT_DATA';
const CHANGE_DATA = 'UPDATE_DATA';

let _data = [];
var StepPageStore = assign({}, EventEmitter.prototype, {

  initData(len){
    _data = [];
    for (let i = 0; i < len; i++) {
      _data.push({data: {}, allSet: true});
    }
    this.emit(INIT_DATA);
  },
  updateData(payload){
    if (!Array.isArray(payload)) {
      console.log('not array');
      _data[payload.index] = {data: payload.data, allSet: payload.allSet};
      console.log(_data);
      this.emit(CHANGE_DATA);
    } else {
      for (let i = 0; i < payload.length; i++) {
        _data[i] = {data: payload[i].data, allSet: payload[i].allSet};
      }
    }
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

StepPageDispatcher.register(function (action) {
  switch (action.type) {
    case ActionTypes.INIT_DATA:
      StepPageStore.initData(action.dataLength);
      break;
    case ActionTypes.UPDATE_DATA:
      StepPageStore.updateData(action.payload);
      break;
    default:
      break;
  }
});

module.exports = StepPageStore;
