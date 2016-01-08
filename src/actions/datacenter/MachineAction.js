/**
 * Created by jiangrx on 15-12-15.
 */
var datacenterDispatcher = require('../../dispatcher/datacenter/DataCenterDispatcher');
var MachineConstants = require('../../constants/datacenter/MachineConstants');

var ActionTypes = MachineConstants.ActionTypes;

module.exports = {
  toggleHostPage: function (payload) {
    datacenterDispatcher.dispatch({
      type: ActionTypes.TOGGLE_HOST_PAGE,
      payload: payload
    });
  }
};
