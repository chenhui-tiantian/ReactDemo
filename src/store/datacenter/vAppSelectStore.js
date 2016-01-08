/**
 * Created by jiangrx on 15-12-15.
 */
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var DispatcherVAppSelect = require('../../dispatcher/datacenter/DataCenterDispatcher');
var ConstantsVAppSelect = require('../../constants/datacenter/vAppSelectConstants');
let StoreVDC = require('../../store/VDC/vdcStore');
let ResourceVDC = require('../../resources/VDC/vdcResource');
const ActionTypesVAppSelect = ConstantsVAppSelect.ActionTypes;

const LIST_VAPPS_SUCCESS = 'LIST_VAPPS_SUCCESS';
const LIST_VAPPS_FAIL = 'LIST_VAPPS_FAIL';

let _vdcs = [];
let _vApps = [];


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
var StoreVAppSelect = assign({}, EventEmitter.prototype, {

  listVApps(payload){
    payLoadCheck(payload);
    _vApps = [];
    let k = 0;
    let l = _vdcs.length;
    for (let i = 0; i < _vdcs.length; i++) {
      if (payload.hypervisorType !== _vdcs[i].hypervisorType) {
        console.log('i:', i);
        l--;
      } else {
        payload.vdcID = _vdcs[i].id;
        ResourceVDC.getVApps(payload).then((result)=> {
          if (result.collection) {
            Array.prototype.push.apply(_vApps, result.collection);
            k++;
            console.log(i, k, l);
            if (k === l) {
              this.emit(LIST_VAPPS_SUCCESS);
            }
          } else {
            this.emit(LIST_VAPPS_FAIL);
          }
        }, ()=> {
          this.emit(LIST_VAPPS_FAIL);
        });
      }
    }
  },

  getVApps(){
    return _vApps;
  },
  addListVAppsSuccessListener(callback)
  {
    this.on(LIST_VAPPS_SUCCESS, callback);
  },
  removeListVAppsSuccessListener(callback)
  {
    this.removeListener(LIST_VAPPS_SUCCESS, callback);
  }
});


StoreVAppSelect.dispatchToken = DispatcherVAppSelect.register(function (action) {
  switch (action.type) {
    case ActionTypesVAppSelect.LIST_VAPPS_ON_HYPERVISOR:
      console.log('vapp');
      _vdcs = StoreVDC.getVDCs();
      StoreVAppSelect.listVApps(action.payload);
      break;
    default:
      break;
  }
});

module.exports = StoreVAppSelect;
