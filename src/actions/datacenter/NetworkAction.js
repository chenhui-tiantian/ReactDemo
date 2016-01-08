/**
 * Created by jiangrx on 2015/11/26.
 */
var datacenterDispatcher = require('../../dispatcher/datacenter/DataCenterDispatcher');
var NetworkConstants = require('../../constants/datacenter/NetworkConstants');

var ActionTypes = NetworkConstants.ActionTypes;

module.exports = {
  getAllPrivateNetworks: function (dcID) {
    datacenterDispatcher.dispatch({
      type: ActionTypes.GET_ALL_NETWORK_PRIVATE,
      dcID: dcID
    });
  },
  getPrivateNetworks: function (payload) {
    datacenterDispatcher.dispatch({
      type: ActionTypes.GET_NETWORK_PRIVATE,
      payload: payload
    });
  },
  getPrivateIPs: function (payload) {
    datacenterDispatcher.dispatch({
      type: ActionTypes.GET_PRIVATE_NETWORK_IP,
      payload: payload
    });
  },
  getExternalNetworks: function (payload) {
    datacenterDispatcher.dispatch({
      type: ActionTypes.GET_NETWORK_EXTERNAL,
      payload: payload
    });
  },
  getExternalIPs: function (payload) {
    datacenterDispatcher.dispatch({
      type: ActionTypes.GET_EXTERNAL_IPS,
      payload: payload
    });
  },
  getPublicNetworks: function (payload) {
    datacenterDispatcher.dispatch({
      type: ActionTypes.GET_NETWORK_PUBLIC,
      payload: payload
    });
  },
  getPublicIPs: function (payload) {
    datacenterDispatcher.dispatch({
      type: ActionTypes.GET_PUBLIC_IPS,
      payload: payload
    });
  },
  updateDCID: function (dcID) {
    datacenterDispatcher.dispatch({
      type: ActionTypes.UPDATE_DCID,
      dcID: dcID
    });
  },
  updateNetInfo: function (netInfo) {
    datacenterDispatcher.dispatch({
      type: ActionTypes.UPDATE_NETINFO,
      netInfo: netInfo
    });
  }

};
