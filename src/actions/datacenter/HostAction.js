/**
 * Created by lenovo on 2015/11/26.
 */
var datacenterDispatcher = require('../../dispatcher/datacenter/DataCenterDispatcher');
var HostConstants = require('../../constants/datacenter/HostConstants');

var ActionTypes = HostConstants.ActionTypes;

module.exports = {
  discoverHost: function(payload){
    datacenterDispatcher.dispatch({
      type: ActionTypes.DISCOVER_HOST,
      payload: payload
    });
  },

  addHost: function (payload) {
    datacenterDispatcher.dispatch({
      type: ActionTypes.ADD_HOST,
      payload: payload
    });
  },

  editHost: function (payload) {
    datacenterDispatcher.dispatch({
      type: ActionTypes.EDIT_HOST,
      payload: payload
    });
  },

  fetchHosts: function (payload) {
    datacenterDispatcher.dispatch({
      type: ActionTypes.LIST_HOSTS,
      payload: payload
    });
  },
  searchHosts: function (payload) {
    datacenterDispatcher.dispatch({
      type: ActionTypes.SEARCH_HOSTS,
      payload: payload
    });
  },
  deleteHost: function (payload) {
    datacenterDispatcher.dispatch({
      type: ActionTypes.DELETE_HOST,
      payload: payload
    });
  },
  stateCheckHost: function(payload){
    datacenterDispatcher.dispatch({
      type: ActionTypes.STATE_CHECK_HOST,
      payload: payload
    });
  },
  storageSelectionChange: function(selection){
    datacenterDispatcher.dispatch({
      type: ActionTypes.STORAGE_SELECTION,
      selection: selection
    });
  },
  triggerHostChange: function(host){
    datacenterDispatcher.dispatch({
      type: ActionTypes.TRIGGER_HOST_CHANGE,
      host: host
    });
  }

};
