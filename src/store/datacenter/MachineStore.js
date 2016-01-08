/**
 * Created by jiangrx on 15-12-15.
 */
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var DispatcherMachine = require('../../dispatcher/datacenter/DataCenterDispatcher');
var ConstantsMachine = require('../../constants/datacenter/MachineConstants');

const ActionTypes = ConstantsMachine.ActionTypes;
const HOST_PAGE_TOGGLE = 'HOST_PAGE_TOGGLE';

//let payLoadCheck = function (payload) {
//  if (!payload.hasOwnProperty('start')) {
//    payload.start = 0;
//  } else {
//    if (payload.start === 'undefined') {
//      payload.start = 0;
//    }
//  }
//  if (!payload.hasOwnProperty('limit')) {
//    payload.limit = 10;
//  } else {
//    if (payload.limit === 'undefined') {
//      payload.limit = 10;
//    }
//  }
//  if (!payload.hasOwnProperty('name')) {
//    payload.name = '';
//  } else {
//    if (payload.name === 'undefined') {
//      payload.name = '';
//    }
//  }
//};
var StoreMachine = assign({}, EventEmitter.prototype, {

  triggerHostPageToggle(){
    this.emit(HOST_PAGE_TOGGLE);
  },
  addHostPageToggleListener(callback)
  {
    this.on(HOST_PAGE_TOGGLE, callback);
  },
  removeHostPageToggleListener(callback)
  {
    this.removeListener(HOST_PAGE_TOGGLE, callback);
  }
});


DispatcherMachine.register(function (action) {
  switch (action.type) {
    case ActionTypes.TOGGLE_HOST_PAGE:
      StoreMachine.triggerHostPageToggle();
      break;
    default:
      break;
  }
});

module.exports = StoreMachine;
