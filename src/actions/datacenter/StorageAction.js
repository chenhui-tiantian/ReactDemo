/**
 * Created by jiangrx on 2015/12/03.
 */
var datacenterDispatcher = require('../../dispatcher/datacenter/DataCenterDispatcher');
var StorageConstants = require('../../constants/datacenter/StorageConstants');

var ActionTypes = StorageConstants.ActionTypes;

module.exports = {

  fetchStorageSupportedTypes: function (payload) {
    datacenterDispatcher.dispatch({
      type: ActionTypes.GET_STORAGE_SUPPORT_TYPES,
      dcID: payload.dcID
    });
  },
  fetchAllStorage: function (payload) {
    datacenterDispatcher.dispatch({
      type: ActionTypes.GET_ALL_STORAGE,
      dcID: payload.dcID
    });
  },
  fetchVolumes: function(payload){
    datacenterDispatcher.dispatch({
      type: ActionTypes.GET_VOLUMES,
      payload: payload
    });
  },
  editVolume: function(payload){
    datacenterDispatcher.dispatch({
      type: ActionTypes.EDIT_VOLUME,
      editURL: payload.editURL,
      data: payload.data
    });
  },
  deleteVolume: function (payload) {
    datacenterDispatcher.dispatch({
      type: ActionTypes.DEL_VOLUME,
      deleteURL: payload.deleteURL
    });
  },
  addDevice: function (payload) {
    datacenterDispatcher.dispatch({
      type: ActionTypes.ADD_DEVICE,
      dcID: payload.dcID,
      data: payload.data
    });
  },
  updateDevice: function (payload) {
    datacenterDispatcher.dispatch({
      type: ActionTypes.UPDATE_DEVICE,
      dcID: payload.dcID,
      data: payload.data,
      storageDeviceID: payload.storageDeviceID
    });
  },
  deleteDevice: function (payload) {
    datacenterDispatcher.dispatch({
      type: ActionTypes.DEL_DEVICE,
      dcID: payload.dcID,
      storageDeviceID: payload.storageDeviceID
    });
  },
  syncPool: function (payload) {
    datacenterDispatcher.dispatch({
      type: ActionTypes.SYNC_POOL,
      dcID: payload.dcID,
      storageDeviceID: payload.storageDeviceID
    });
  },
  addPool: function (payload) {
    datacenterDispatcher.dispatch({
      type: ActionTypes.ADD_POOL,
      dcID: payload.dcID,
      storageDeviceID: payload.storageDeviceID,
      data: payload.data
    });
  },
  editPool: function (payload) {
    datacenterDispatcher.dispatch({
      type: ActionTypes.EDIT_POOL,
      dcID: payload.dcID,
      storageDeviceID: payload.storageDeviceID,
      poolID: payload.poolID,
      data: payload.data
    });
  },
  deletePool: function (payload) {
    datacenterDispatcher.dispatch({
      type: ActionTypes.DEL_POOL,
      dcID: payload.dcID,
      storageDeviceID: payload.storageDeviceID,
      poolID: payload.poolID
    });
  },

  updateDeviceID: function (payload) {
    datacenterDispatcher.dispatch({
      type: ActionTypes.UPDATE_DEVICEID,
      dcID: payload.dcID,
      storageDeviceID: payload.storageDeviceID
    });
  },
  updatePoolID: function (poolID) {
    datacenterDispatcher.dispatch({
      type: ActionTypes.UPDATE_POOLID,
      poolID: poolID
    });
  },
  updateDCID: function (dcID) {
    datacenterDispatcher.dispatch({
      type: ActionTypes.UPDATE_DCID,
      dcID: dcID
    });
  },
  updateBundle: function (payload) {
    datacenterDispatcher.dispatch({
      type: ActionTypes.UPDATE_BUNDLE,
      dcID: payload.dcID,
      storageDeviceID: payload.storageDeviceID,
      poolID: payload.poolID
    });
  }
};
