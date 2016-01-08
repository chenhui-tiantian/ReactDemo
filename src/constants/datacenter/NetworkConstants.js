/**
 * Created by jiangrx on 2015/11/26.
 */
var keyMirror = require('keymirror');

module.exports = {

  ActionTypes: keyMirror({
    GET_PRIVATEIPS: null,
    GET_ALL_NETWORK_PRIVATE: null,
    GET_NETWORK_PRIVATE: null,
    GET_PRIVATE_NETWORK_IP: null,
    GET_NETWORK_EXTERNAL: null,
    GET_EXTERNAL_IPS: null,
    GET_NETWORK_PUBLIC: null,
    GET_PUBLIC_IPS: null,
    UPDATE_DCID: null,
    UPDATE_NETINFO: null
  })

};
