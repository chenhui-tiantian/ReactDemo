/**
 * Created by jiangrx on 12/24/15.
 */
var keyMirror = require('keymirror');

module.exports = {

  //organization management
  ActionTypes: keyMirror({
    FETCH_ALL_USERS: null,
    FETCH_LOGGED_IN_USERS: null,
    ADD_USER: null,
    EDIT_USER: null,
    DELETE_USER: null,
    FETCH_ROLES: null,
    FETCH_VDCS: null,
    SET_DISPLAY_FILTER: null
  })

};
