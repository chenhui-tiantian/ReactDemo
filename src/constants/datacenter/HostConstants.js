/**
 * Created by jiangr on 2015/12/10.
 */
var keyMirror = require('keymirror');

module.exports = {
  ActionTypes: keyMirror({
    DISCOVER_HOST: null,
    ADD_HOST: null,
    EDIT_HOST: null,
    LIST_HOSTS: null,
    SEARCH_HOSTS: null,
    DELETE_HOST: null,
    SELECT_HOST: null,
    STATE_CHECK_HOST: null,
    STORAGE_SELECTION: null,
    TRIGGER_HOST_CHANGE: null
  })

};
