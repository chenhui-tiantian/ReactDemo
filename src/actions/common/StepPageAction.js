/**
 * Created by jiangrx on 15-12-4.
 */
var StepPageDispatcher = require('../../dispatcher/common/StepPageDispatcher');
var StepPageConstants = require('../../constants/common/StepPageConstants');

var ActionTypes = StepPageConstants.ActionTypes;

module.exports = {
  initData: function (dataLength) {
    StepPageDispatcher.dispatch({
      type: ActionTypes.INIT_DATA,
      dataLength: dataLength
    });
  },
  updateData: function (payload) {
    StepPageDispatcher.dispatch({
      type: ActionTypes.UPDATE_DATA,
      payload: payload
    });
  }

};
