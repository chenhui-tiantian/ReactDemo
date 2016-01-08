/**
 * Created by jiangrx on 15-12-15.
 */
var keyMirror = require('keymirror');

module.exports = {
  ActionTypes: keyMirror({
    LIST_VMS: null,
    IMPORT_VM: null,
    DISCOVER_VMS: null,
    HIDE_VMS: null,
    VM_INFO: null
  })

};
