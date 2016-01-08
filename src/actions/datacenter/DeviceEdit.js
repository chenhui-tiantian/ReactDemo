/**
 * Created by jiangrx on 15-12-7.
 */
var datacenterDispatcher = require('../../dispatcher/datacenter/DataCenterDispatcher');
var DeviceConstants = require('../../constants/datacenter/DeviceConstants');

var ActionTypes = DeviceConstants.ActionTypes;

module.exports = {

  getData: function () {
    datacenterDispatcher.dispatch({
      type: ActionTypes.GET_DATA
    });
  }
}
