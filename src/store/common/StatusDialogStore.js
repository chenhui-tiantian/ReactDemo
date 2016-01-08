/**
 * Created by gtkrab on 15-11-27.
 */
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var statusDialogDispatcher = require('../../dispatcher/common/StatusDialogDispatcher');
var statusDialogConstants = require('../../constants/common/StatusDialogConstants');

const ActionTypes = statusDialogConstants.ActionTypes;
const NEW_MSG = 'new_msg';

let _msg = {title: '', body: '', isFail: true};
var statusDialogStore = assign({}, EventEmitter.prototype, {

  pushMessage(data){
    _msg = data;
    this.emit(NEW_MSG);
  },
  getMessage(){
    let ret = _msg;
    ret.state = 1;
    if (ret.isFail) {
      return {data: ret, timer: 10 * 1000};
    } else {
      return {data: ret, timer: 5 * 1000};
    }
  },
  addMsgListener(callback){
    this.on(NEW_MSG, callback);
  },
  removeMsgListener(callback){
    this.removeListener(NEW_MSG, callback);
  }
});

statusDialogDispatcher.register(function (action) {
  switch (action.type) {
    case ActionTypes.NEW_MSG:
      statusDialogStore.pushMessage(action.msg);
      break;
    default:
      break;
  }
});

module.exports = statusDialogStore;
