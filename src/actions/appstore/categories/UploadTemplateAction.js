/**
 * Created by jiangrx on 12/29/15.
 */
var DispatcherAppStore = require('../../../dispatcher/appstore/AppStoreDispatcher');
var ConstantsUploadTemplate = require('../../../constants/appstore/category/UploadTemplateConstant');


var ActionTypes = ConstantsUploadTemplate.ActionTypes;

module.exports = {
  parseDiskTypes: function(){
    DispatcherAppStore.dispatch({
      type: ActionTypes.PARSE_DISKTYPES
    });
  }
};
