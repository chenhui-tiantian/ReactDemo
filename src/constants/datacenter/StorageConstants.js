/**
 * Created by lenovo on 2015/11/26.
 */
var keyMirror = require('keymirror');

module.exports = {

  ActionTypes: keyMirror({
    GET_STORAGE_SUPPORT_TYPES: null,
    GET_ALL_STORAGE: null,
    GET_VOLUMES: null,
    GET_INITIATORMAPPINGS: null,
    ADD_DEVICE: null,
    UPDATE_DEVICE: null,
    DEL_DEVICE: null,
    SYNC_POOL: null,
    ADD_POOL: null,
    EDIT_POOL: null,
    DEL_POOL: null,
    DEL_VOLUME: null,
    EDIT_VOLUME: null,
    UPDATE_DCID: null,
    UPDATE_DEVICEID: null,
    UPDATE_POOLID: null,
    UPDATE_BUNDLE: null
  })

};
