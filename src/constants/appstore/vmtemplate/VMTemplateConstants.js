/**
 * Created by jiangrx on 12/21/15.
 */
var keyMirror = require('keymirror');
module.exports = {
  ActionTypes: keyMirror({
    FETCH_TEMPLATES: null,
    EDIT_TEMPLATE: null,
    DELETE_TEMPLATE: null,
    DOWNLOAD_TEMPLATE: null,
    FETCH_TEMPLATE_CONVERSIONS: null,
    CONVERT_TEMPLATE: null,
    RECONVERT_TEMPLATE: null,
    VM_TLIB: null,
    GETVM_TEMPLATE: null,
    DEL_VM_TEMPLATE: null
  })
};
