/**
 * Created by jiangrx on 15-12-15.
 */
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var ResourceVM = require('../../resources/datacenter/VMResource');
var DispatcherVM = require('../../dispatcher/datacenter/DataCenterDispatcher');
var ConstantsVM = require('../../constants/datacenter/VMConstants');

const ActionTypes = ConstantsVM.ActionTypes;
const LIST_VMS_SUCCESS = 'LIST_VMS_SUCCESS';
const LIST_VMS_FAIL = 'LIST_VMS_FAIL';
const LOAD_VM_INFO_SUCCESS = 'LOAD_VM_INFO_SUCCESS';
const LOAD_VM_INFO_FAIL = 'LOAD_VM_INFO_FAIL';
const IMPORT_VM_SUCCESS = 'IMPORT_VM_SUCCESS';
const IMPORT_VM_FAIL = 'IMPORT_VM_FAIL';

let _vms = [];
let _vm = {};


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
var StoreVM = assign({}, EventEmitter.prototype, {

  listVMs(payload){
    payLoadCheck(payload);
    ResourceVM.listVMs(payload).then((result)=> {
      if (result.collection) {
        _vms = result.collection;
        for (let i = 0; i < _vms.length; i++) {
          _vms[i].hostID = payload.hostID;
        }
        this.emit(LIST_VMS_SUCCESS);
      } else {
        this.emit(LIST_VMS_FAIL);
      }
    });
  },
  loadVMInfo(payload){
    payLoadCheck(payload);
    ResourceVM.loadVMInfo(payload).then((result)=> {
      _vm = result;
      this.emit(LOAD_VM_INFO_SUCCESS);
    }, ()=> {
      this.emit(LOAD_VM_INFO_FAIL);
    });
  },
  importVM(payload){
    payLoadCheck(payload);
    ResourceVM.importVM(payload).then((result)=> {
      _vm = result;
      this.emit(IMPORT_VM_SUCCESS);
    }, ()=> {
      this.emit(IMPORT_VM_FAIL);
    });
  },

  getVMs(){
    return _vms;
  },
  getVMInfo(){
    return _vm;
  },
  addListVMsSuccessListener(callback)
  {
    this.on(LIST_VMS_SUCCESS, callback);
  },
  removeListVMsSuccessListener(callback)
  {
    this.removeListener(LIST_VMS_SUCCESS, callback);
  },
  addLoadVMInfoSuccessListener(callback)
  {
    this.on(LOAD_VM_INFO_SUCCESS, callback);
  },
  removeLoadVMInfoSuccessListener(callback)
  {
    this.removeListener(LOAD_VM_INFO_SUCCESS, callback);
  },
  addImportVMSuccessListener(callback)
  {
    this.on(IMPORT_VM_SUCCESS, callback);
  },
  removeImportVMSuccessListener(callback)
  {
    this.removeListener(IMPORT_VM_SUCCESS, callback);
  }
});


DispatcherVM.register(function (action) {
  switch (action.type) {
    case ActionTypes.LIST_VMS:
      StoreVM.listVMs(action.payload);
      break;
    case ActionTypes.VM_INFO:
      StoreVM.loadVMInfo(action.payload);
      break;
    case ActionTypes.IMPORT_VM:
      StoreVM.importVM(action.payload);
      break;
    default:
      break;
  }
});

module.exports = StoreVM;
