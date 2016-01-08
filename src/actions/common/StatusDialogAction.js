/**
 * Created by jiangrx on 15-11-27.
 */
var statusDialogDispatcher = require('../../dispatcher/common/StatusDialogDispatcher');
var statusDialogConstants = require('../../constants/common/StatusDialogConstants');

var ActionTypes = statusDialogConstants.ActionTypes;

module.exports = {

  newMSG: function (msg) {
    statusDialogDispatcher.dispatch({
      type: ActionTypes.NEW_MSG,
      msg: msg
    });
  }

};
