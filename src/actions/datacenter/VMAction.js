/**
 * Created by jiangrx on 15-12-15.
 */
var datacenterDispatcher = require('../../dispatcher/datacenter/DataCenterDispatcher');
var VMConstants = require('../../constants/datacenter/VMConstants');

var ActionTypes = VMConstants.ActionTypes;

module.exports = {

  listVMS: function (payload) {
    datacenterDispatcher.dispatch({
      type: ActionTypes.LIST_VMS,
      payload: payload
    });
  },
  grabVMInfo: function(payload){
    datacenterDispatcher.dispatch({
      type: ActionTypes.VM_INFO,
      payload: payload
    });
  },
  importVM: function(payload){
    datacenterDispatcher.dispatch({
      type: ActionTypes.IMPORT_VM,
      payload: payload
    });
  }
};
