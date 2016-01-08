/**
 * Created by jiangrx on 2015/11/24.
 */
var vdcDispatcher = require('../../dispatcher/VDC/vdcDispatcher');
var vdcConstants = require('../../constants/VDC/vdcConstants');

var ActionTypes = vdcConstants.ActionTypes;

module.exports = {

  getVDCs: function (payload) {
    vdcDispatcher.dispatch({
      type: ActionTypes.GET_VDCS,
      payload: payload
    });
  },
  getPrivateIPs: function (vdcID) {
    vdcDispatcher.dispatch({
      type: ActionTypes.GET_PRIVATEIPS,
      vdcID: vdcID
    });
  },
  getNetworkPrivate: function (vdcID) {
    vdcDispatcher.dispatch({
      type: ActionTypes.GET_NETWORK_PRIVATE,
      vdcID: vdcID
    });
  },
  getExternalIPs: function (payload) {
    vdcDispatcher.dispatch({
      type: ActionTypes.GET_EXTERNAL_IPS,
      payload: payload
    });
  },
  getNetworkExternal: function (payload) {
    vdcDispatcher.dispatch({
      type: ActionTypes.GET_NETWORK_EXTERNAL,
      payload: payload
    });
  },
  getPublicIPs: function (payload) {
    vdcDispatcher.dispatch({
      type: ActionTypes.GET_PUBLIC_IPS,
      payload: payload
    });
  },
  getNetworkPublic: function (payload) {
    vdcDispatcher.dispatch({
      type: ActionTypes.GET_NETWORK_PUBLIC,
      payload: payload
    });
  },
  updateNetworkVDCID: function (vdcID) {
    vdcDispatcher.dispatch({
      type: ActionTypes.UPDATE_VDCID,
      vdcID: vdcID
    });
  }

};
