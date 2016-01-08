/**
 * Created by jiangrx on 2015/12/03.
 */
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var storageSource = require('../../resources/datacenter/StorageResource');
var storageDispatcher = require('../../dispatcher/datacenter/DataCenterDispatcher');
var storageConstants = require('../../constants/datacenter/StorageConstants');

const ActionTypes = storageConstants.ActionTypes;
const GET_SUPPORTED_TYPES_SUCCESS = 'GET_SUPPORTED_TYPES_SUCCESS';
const GET_SUPPORTED_TYPES_FAIL = 'GET_SUPPORTED_TYPES_FAIL';
const GET_STORAGE_SUCCESS = 'GET_STORAGE_SUCCESS';
const GET_STORAGE_FAIL = 'GET_STORAGE_FAIL';
const GET_VOLUMES_SUCCESS = 'GET_VOLUMES_SUCCESS';
const GET_VOLUMES_FAIL = 'GET_VOLUMES_FAIL';
const ADD_DEVICE_SUCCESS = 'ADD_DEVICE_SUCCESS';
const ADD_DEVICE_FAIL = 'ADD_DEVICE_FAIL';
const UPDATE_DEVICE_SUCCESS = 'UPDATE_DEVICE_SUCCESS';
const UPDATE_DEVICE_FAIL = 'UPDATE_DEVICE_FAIL';
const DEL_DEVICE_SUCCESS = 'DEL_DEVICE_SUCCESS';
const DEL_DEVICE_FAIL = 'DEL_DEVICE_FAIL';
const SYNC_POOL_SUCCESS = 'SYNC_POOL_SUCCESS';
const SYNC_POOL_FAIL = 'SYNC_POOL_FAIL';
const ADD_POOL_SUCCESS = 'ADD_POOL_SUCCESS';
const ADD_POOL_FAIL = 'ADD_POOL_FAIL';
const EDIT_POOL_SUCCESS = 'EDIT_POOL_SUCCESS';
const EDIT_POOL_FAIL = 'EDIT_POOL_FAIL';
const DEL_POOL_SUCCESS = 'DEL_POOL_SUCCESS';
const DEL_POOL_FAIL = 'DEL_POOL_FAIL';
const EDIT_VOLUME_SUCCESS = 'EDIT_VOLUME_SUCCESS';
const EDIT_VOLUME_FAIL = 'EDIT_VOLUME_FAIL';
const DEL_VOLUME_SUCCESS = 'DEL_VOLUME_SUCCESS';
const DEL_VOLUME_FAIL = 'DEL_VOLUME_FAIL';
const UPDATE_DCID = 'update_dcid';
const UPDATE_STORAGEDEVICEID = 'update_storage_device_id';
const UPDATE_POOLID = 'update_poolid';
const UPDATE_BUNDLE = 'UPDATE_BUNDLE';
const indexMask = 1023;
const indexShift = 10;

let _supportedTypes = [];
let _storage = [];
let _dcID = 0;
let _poolID = 0;
let _storageDeviceID = 0;
let _syncedPool = [];
let _storageVolumes = [];
let _volumeID = 0;

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
var StorageStore = assign({}, EventEmitter.prototype, {
  indexMask: indexMask,
  indexShift: indexShift,
  fetchStorageSupportedTypes: function (payload) {
    payLoadCheck(payload);
    storageSource.getStorageSupportedTypes(payload).then(supportedTypes => {
      if (supportedTypes.collection) {
        _supportedTypes = supportedTypes.collection;
        this.emit(GET_SUPPORTED_TYPES_SUCCESS);
      } else {
        this.emit(GET_SUPPORTED_TYPES_FAIL);
      }
    });
  },
  fetchAllStorage: function (payload) {
    payLoadCheck(payload);
    storageSource.getStorageDevices(payload).then(res => {
      if (res.collection) {
        _storage = [];
        let devices = res.collection;
        let icounter = 0;
        for (let i = 0; i < devices.length; i++) {
          payload.storageDeviceID = devices[i].id;
          storageSource.getStoragePools(payload).then(result => {
            if (result.collection) {
              let pools = result.collection;
              let nest = [];
              for (let k = 0; k < pools.length; k++) {
                nest.push({
                  text: pools[k].name,
                  key: pools[k].idStorage,
                  index: (i << indexShift) | (k + 1),
                  data: pools[k]
                });
              }
              _storage.push({
                text: devices[i].name,
                key: devices[i].id,
                index: i << indexShift,
                data: devices[i],
                nests: nest
              });
              icounter++;
              if (icounter === devices.length) {
                this.emit(GET_STORAGE_SUCCESS);
              }
            } else {
              this.emit(GET_STORAGE_FAIL);
            }
          });
        }
      } else {
        this.emit(GET_STORAGE_FAIL);
      }
    });
  },
  fetchVolumes: function (payload) {
    payLoadCheck(payload);
    storageSource.getStorageVolumes(payload).then(volumes => {
      if (volumes.collection) {
        _storageVolumes = [];
        volumes = volumes.collection;
        for (let i = 0; i < volumes.length; i++) {
          _storageVolumes.push(volumes[i]);
        }
        this.emit(GET_VOLUMES_SUCCESS);
      } else {
        this.emit(GET_VOLUMES_FAIL);
      }
    });
  },
  addDevice: function (payload) {
    console.log('add device');
    payLoadCheck(payload);
    storageSource.addStorageDevice(payload).then(()=> {
      this.emit(ADD_DEVICE_SUCCESS);

    }, ()=> {
      this.emit(ADD_DEVICE_FAIL);
    });
  },
  updateDevice: function (payload) {
    console.log('add device');
    payLoadCheck(payload);
    storageSource.updateStorageDevice(payload).then(()=> {
      this.emit(UPDATE_DEVICE_SUCCESS);

    }, ()=> {
      this.emit(UPDATE_DEVICE_FAIL);
    });
  },
  deleteDevice: function (payload) {
    payLoadCheck(payload);
    storageSource.deleteStorageDevice(payload).then((result)=> {
      if (result.collection) {
        this.emit(DEL_DEVICE_FAIL);
      } else {
        this.emit(DEL_DEVICE_SUCCESS);
      }
    });
  },
  syncPool: function (payload) {
    payLoadCheck(payload);
    storageSource.syncStoragePool(payload).then((results)=> {
      if (results.collection) {
        _syncedPool = [];
        for (let i = 0; i < results.collection.length; i++) {
          _syncedPool.push(results.collection[i]);
        }
        this.emit(SYNC_POOL_SUCCESS);
      } else {
        this.emit(SYNC_POOL_FAIL);
      }
    });
  },
  addPool: function (payload) {
    payLoadCheck(payload);
    storageSource.addStoragePool(payload).then(()=> {
      this.emit(ADD_POOL_SUCCESS);
    }, ()=> {
      this.emit(ADD_POOL_FAIL);
    });
  },
  editPool: function (payload) {
    console.log('edit pool');
    payLoadCheck(payload);
    storageSource.editStoragePool(payload).then(()=> {
      this.emit(EDIT_POOL_SUCCESS);
    }, ()=> {
      this.emit(EDIT_POOL_FAIL);
    });
  },
  deletePool: function (payload) {
    payLoadCheck(payload);
    storageSource.deleteStoragePool(payload).then((result)=> {
      if (result.collection) {
        this.emit(DEL_POOL_FAIL);
      } else {
        this.emit(DEL_POOL_SUCCESS);
      }
    });
  },
  editVolume: function (payload) {
    console.log('edit volume');
    payLoadCheck(payload);
    storageSource.editStorageVolume(payload).then(()=> {
      this.emit(EDIT_VOLUME_SUCCESS);
    }, ()=> {
      this.emit(EDIT_VOLUME_FAIL);
    });
  },
  delVolume: function (payload) {
    console.log('delete volume');
    payLoadCheck(payload);
    storageSource.delStorageVolume(payload).then(()=> {
      this.emit(DEL_VOLUME_SUCCESS);
    }, ()=> {
      this.emit(DEL_VOLUME_FAIL);
    });
  },
  getDCID: function () {
    return _dcID;
  },
  getDeviceID: function () {
    return _storageDeviceID;
  },
  getPoolID: function () {
    return _poolID;
  },
  getSupportedTypes: function () {
    return _supportedTypes;
  },
  getStorage: function () {
    return _storage;
  },
  getSyncedPool: function () {
    return _syncedPool;
  },
  getVolumes: function () {
    return _storageVolumes;
  },
  triggerDCIDUpdate: function (id) {
    _dcID = id;
    this.emit(UPDATE_DCID);
  },
  triggerDeviceIDUpdate: function (id) {
    _storageDeviceID = id;
    this.emit(UPDATE_STORAGEDEVICEID);
  },
  triggerPoolIDUpdate: function (id) {
    _poolID = id;
    this.emit(UPDATE_POOLID);
  },
  updateBundle(payload){
    _dcID = payload.dcID;
    _storageDeviceID = payload.storageDeviceID;
    _poolID = payload.poolID;
    this.emit(UPDATE_BUNDLE);
  },
  addAddDeviceSuccessListener(callback){
    this.on(ADD_DEVICE_SUCCESS, callback);
  },
  removeAddDeviceSuccessListener(callback){
    this.removeListener(ADD_DEVICE_SUCCESS, callback);
  },

  addUpdateDeviceSuccessListener(callback){
    this.on(UPDATE_DEVICE_SUCCESS, callback);
  },
  removeUpdateDeviceSuccessListener(callback){
    this.removeListener(UPDATE_DEVICE_SUCCESS, callback);
  },

  addDeleteDeviceSuccessListener(callback){
    this.on(DEL_DEVICE_SUCCESS, callback);
  },
  removeDeleteDeviceSuccessListener(callback){
    this.removeListener(DEL_DEVICE_SUCCESS, callback);
  },

  addDeleteDeviceFailListener(callback){
    this.on(DEL_DEVICE_FAIL, callback);
  },
  removeDeleteDeviceFailListener(callback){
    this.removeListener(DEL_DEVICE_FAIL, callback);
  },

  addSyncPoolSuccessListener(callback){
    this.on(SYNC_POOL_SUCCESS, callback);
  },
  removeSyncPoolSuccessListener(callback){
    this.removeListener(SYNC_POOL_SUCCESS, callback);
  },

  addAddPoolSuccessListener(callback){
    this.on(ADD_POOL_SUCCESS, callback);
  },
  removeAddPoolSuccessListener(callback){
    this.removeListener(ADD_POOL_SUCCESS, callback);
  },

  addEditPoolSuccessListener(callback){
    this.on(EDIT_POOL_SUCCESS, callback);
  },
  removeEditPoolSuccessListener(callback){
    this.removeListener(EDIT_POOL_SUCCESS, callback);
  },

  addDeletePoolSuccessListener(callback){
    this.on(DEL_POOL_SUCCESS, callback);
  },
  removeDeletePoolSuccessListener(callback){
    this.removeListener(DEL_POOL_SUCCESS, callback);
  },

  addDeletePoolFailListener(callback){
    this.on(DEL_POOL_FAIL, callback);
  },
  removeDeletePoolFailListener(callback){
    this.removeListener(DEL_POOL_FAIL, callback);
  },

  addFetchVolumesSuccessListener(callback){
    this.on(GET_VOLUMES_SUCCESS, callback);
  },
  removeFetchVolumesSuccessListener(callback){
    this.removeListener(GET_VOLUMES_SUCCESS, callback);
  },

  addEditVolumesSuccessListener(callback){
    this.on(EDIT_VOLUME_SUCCESS, callback);
  },
  removeEditVolumesSuccessListener(callback){
    this.removeListener(EDIT_VOLUME_SUCCESS, callback);
  },

  addDeleteVolumesSuccessListener(callback){
    this.on(DEL_VOLUME_SUCCESS, callback);
  },
  removeDeleteVolumesSuccessListener(callback){
    this.removeListener(DEL_VOLUME_SUCCESS, callback);
  },

  addUpdateDCIDListener(callback){
    this.on(UPDATE_DCID, callback);
  },
  removeUpdateDCIDListener(callback){
    this.removeListener(UPDATE_DCID, callback);
  },

  addUpdateStorageIDListener(callback){
    this.on(UPDATE_STORAGEDEVICEID, callback);
  },
  removeUpdateStorageIDListener(callback){
    this.removeListener(UPDATE_STORAGEDEVICEID, callback);
  },

  addUpdatePoolIDListener(callback){
    this.on(UPDATE_POOLID, callback);
  },
  removeUpdatePoolIDListener(callback){
    this.removeListener(UPDATE_POOLID, callback);
  },

  addGetStorageSupportedTypesListener(callback){
    this.on(GET_SUPPORTED_TYPES_SUCCESS, callback);
  },
  removeGetStorageSupportedTypesListener(callback){
    this.removeListener(GET_SUPPORTED_TYPES_SUCCESS, callback);
  },

  addFetchStorageListener(callback){
    this.on(GET_STORAGE_SUCCESS, callback);
  },
  removeFetchStorageListener(callback){
    this.on(GET_STORAGE_SUCCESS, callback);
  },

  addUpdateBundleListener(callback){
    this.on(UPDATE_BUNDLE, callback);
  },
  removeUpdateBundleListener(callback){
    this.on(UPDATE_BUNDLE, callback);
  }
});

storageDispatcher.register(function (action) {
  switch (action.type) {
    case ActionTypes.GET_STORAGE_SUPPORT_TYPES:
      StorageStore.fetchStorageSupportedTypes(action);
      break;
    case ActionTypes.GET_ALL_STORAGE:
      StorageStore.fetchAllStorage(action);
      break;
    case ActionTypes.GET_VOLUMES:
      StorageStore.fetchVolumes(action.payload);
      break;
    case ActionTypes.EDIT_VOLUME:
      StorageStore.editVolume(action);
      break;
    case ActionTypes.DEL_VOLUME:
      StorageStore.delVolume(action);
      break;
    case ActionTypes.UPDATE_DCID:
      StorageStore.triggerDCIDUpdate(action.dcID);
      break;
    case ActionTypes.UPDATE_DEVICEID:
      StorageStore.triggerDeviceIDUpdate(action.storageDeviceID);
      break;
    case ActionTypes.UPDATE_POOLID:
      StorageStore.triggerPoolIDUpdate(action.poolID);
      break;
    case ActionTypes.ADD_DEVICE:
      StorageStore.addDevice(action);
      break;
    case ActionTypes.UPDATE_DEVICE:
      StorageStore.updateDevice(action);
      break;
    case ActionTypes.DEL_DEVICE:
      StorageStore.deleteDevice(action);
      break;
    case ActionTypes.SYNC_POOL:
      StorageStore.syncPool(action);
      break;
    case ActionTypes.ADD_POOL:
      StorageStore.addPool(action);
      break;
    case ActionTypes.EDIT_POOL:
      StorageStore.editPool(action);
      break;
    case ActionTypes.DEL_POOL:
      StorageStore.deletePool(action);
      break;
    case ActionTypes.UPDATE_BUNDLE:
      StorageStore.updateBundle(action);
      break;
    default:
      break;
  }
});

module.exports = StorageStore;
