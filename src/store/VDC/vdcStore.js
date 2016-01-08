/**
 * Created by gtkrab on 15-11-24.
 */
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var vdcSource = require('../../resources/VDC/vdcResource');
var vdcDispatcher = require('../../dispatcher/VDC/vdcDispatcher');
var vdcConstants = require('../../constants/VDC/vdcConstants');

const ActionTypes = vdcConstants.ActionTypes;
const FETCHED_VDCS = 'FETCHED_VDCS';
const FETCH_VDCS_FAIL = 'FETCH_VDCS_FAIL';
const FETCH_VAPPS_SUCCESS = 'FETCH_VAPPS_SUCCESS';
const FETCH_VAPPS_FAIL = 'FETCH_VAPPS_FAIL';
const GOT_NETWORK_PRIVATE_SUCCESS = 'fetch_network_private_success';
const GOT_NETWORK_PRIVATE_FAIL = 'fetch_network_private_fail';
const UPDATE_VDCID = 'update_vdcid';

let _vdcs = [];
let _totalSize = 0;
let _vdcID = 0;
let _networkPrivate = [];
let _vApps = [];
var vdcStore = assign({}, EventEmitter.prototype, {

  fetchVDCs: function (payload) {
    vdcSource.getVDCs(payload).then(result => {
      if (result.collection) {
        _vdcs = result.collection;
        _totalSize = result.totalSize;
        console.log('gotAllVDCS');
        this.emit(FETCHED_VDCS);
      } else {
        this.emit(FETCH_VDCS_FAIL);
      }
    });
  },
  fetchPrivateNetworks: function (vdcID) {
    vdcSource.getPrivateNetworks(vdcID).then(result => {
      if (result.collection) {
        _networkPrivate = [];
        result.collection.map(function (d) {
          _networkPrivate.push({key: d.id, text: d.name});
        });
        this.emit(GOT_NETWORK_PRIVATE_SUCCESS);
      } else {
        this.emit(GOT_NETWORK_PRIVATE_FAIL);
      }
    });
  },
  fetchVApps: function (payload) {
    vdcSource.getVApps(payload).then(result => {
      if (result.collection) {
        _vApps = result.collection;
        this.emit(FETCH_VAPPS_SUCCESS);
      } else {
        this.emit(FETCH_VAPPS_FAIL);
      }
    }, ()=> {
      this.emit(FETCH_VAPPS_FAIL);
    });
  },
  getVDCs: function () {
    return _vdcs;
  },
  getNetworkPrivate: function () {
    return _networkPrivate;
  },
  getVDCID: function () {
    return _vdcID;
  },
  getVApps(){
    return _vApps;
  },
  triggerVDCIDUpdate: function (id) {
    _vdcID = id;
    console.log('triggerVDCIDUpdate: ' + id);
    this.emit(UPDATE_VDCID);
  },
  addChangedListener(callback){
    console.log('callback');
    this.on(FETCHED_VDCS, callback);
  },
  addFetchedVAppsListener(callback){
    this.on(FETCH_VAPPS_SUCCESS, callback);
  },
  removeFetchedVAppsListener(callback){
    this.on(FETCH_VAPPS_SUCCESS, callback);
  },
  addNetworkPrivateListener(callback){
    this.on(GOT_NETWORK_PRIVATE_SUCCESS, callback);
  },
  addUpdateVDCIDListener(callback){
    this.on(UPDATE_VDCID, callback);
  },
  removeChangedListener(callback){
    console.log('remove');
    this.removeListener(FETCHED_VDCS, callback);
  },
  removeNetworkPrivateListener(callback){
    this.removeListener(GOT_NETWORK_PRIVATE_SUCCESS, callback);
  },
  removeUpdateVDCIDListener(callback){
    this.removeListener(UPDATE_VDCID, callback);
  }
});

vdcStore.dispatchToken = vdcDispatcher.register(function (action) {
  switch (action.type) {
    case ActionTypes.GET_VDCS:
      vdcStore.fetchVDCs();
      break;
    case ActionTypes.GET_NETWORK_PRIVATE:
      vdcStore.fetchPrivateNetworks(action.vdcID);
      break;
    case ActionTypes.DELETE_ORGANIZATION:
      vdcStore.deleteOrganize(action.id);
      break;
    case ActionTypes.UPDATE_VDCID:
      vdcStore.triggerVDCIDUpdate(action.vdcID);
      break;
    default:
      break;
  }
});

module.exports = vdcStore;
