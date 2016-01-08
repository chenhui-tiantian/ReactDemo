/**
 * Created by gtkrab on 12/22/15.
 */
var DispatcherAppStore = require('../../../dispatcher/appstore/AppStoreDispatcher');
var ConstantsAppStore = require('../../../constants/appstore/vmtemplate/VMTemplateConstants');

var ActionTypes = ConstantsAppStore.ActionTypes;

module.exports = {

  fetchTemplates: function (payload) {
    DispatcherAppStore.dispatch({
      type: ActionTypes.FETCH_TEMPLATES,
      payload: payload
    });
  },
  downloadTemplate: function(payload){
    DispatcherAppStore.dispatch({
      type: ActionTypes.DOWNLOAD_TEMPLATE,
      payload: payload
    });
  },

  fetchConversions: function(payload){
    DispatcherAppStore.dispatch({
      type: ActionTypes.FETCH_TEMPLATE_CONVERSIONS,
      payload: payload
    });
  },
  convertTemplate: function(payload){
    DispatcherAppStore.dispatch({
      type: ActionTypes.CONVERT_TEMPLATE,
      payload: payload
    });
  },
  reconvertTemplate: function(payload){
    DispatcherAppStore.dispatch({
      type: ActionTypes.RECONVERT_TEMPLATE,
      payload: payload
    });
  },
  editTemplate: function(payload){
    DispatcherAppStore.dispatch({
      type: ActionTypes.EDIT_TEMPLATE,
      payload: payload
    });
  },
  getvmTlib: function(payload){
    DispatcherAppStore.dispatch({
      type: ActionTypes.GETVM_TEMPLATE,
      payload: payload
    });
  },
  deleteVMTItem: function(payload){
    DispatcherAppStore.dispatch({
      type: ActionTypes.DEL_VM_TEMPLATE,
      payload: payload
    });
  }
};
