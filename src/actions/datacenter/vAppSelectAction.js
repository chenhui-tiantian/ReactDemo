/**
 * Created by jiangrx on 15-12-15.
 */
var datacenterDispatcher = require('../../dispatcher/datacenter/DataCenterDispatcher');
var vAppSelectConstants = require('../../constants/datacenter/vAppSelectConstants');

var ActionTypes = vAppSelectConstants.ActionTypes;

module.exports = {

  listVApps: function (payload) {
    console.log('actions types:', ActionTypes);
    datacenterDispatcher.dispatch({
      type: ActionTypes.LIST_VAPPS_ON_HYPERVISOR,
      payload: payload
    });
  }
};
