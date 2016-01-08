/**
 * Created by gtkrab on 15-11-24.
 */
var keyMirror = require('keymirror');

module.exports = {

  ActionTypes: keyMirror({
    GET_VDCS: null,
    GET_VAPP: null,
    GET_PRIVATEIPS: null,
    GET_NETWORK_PRIVATE: null,
    CREATE_MESSAGE: null,
    RECEIVE_RAW_CREATED_MESSAGE: null,
    RECEIVE_RAW_MESSAGES: null,
    UPDATE_VDCID: null,
    LIST_VAPPS_ON_HYPERVISOR: null
  })

};
