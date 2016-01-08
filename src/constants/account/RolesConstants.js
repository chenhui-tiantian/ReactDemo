/**
 * Created by jiangrx on 12/25/15.
 */
var keyMirror = require('keymirror');

module.exports = {

  //organization management
  ActionTypes: keyMirror({
    FETCH_ROLES: null,
    ADD_ROLE: null,
    EDIT_ROLE: null,
    DELETE_ROLE: null,
    SAVE_PRIVILEGE: null,
    GET_ENTERPRISE_ROLES: null,
    GET_SCOPES: null,
    FETCH_SCOPE_ENTERPRISE: null,
    GET_ROLE_PRIVILIEGE: null,
    GET_CURRENT_ROLE_PRIVILIEGE : null,
    SELECT_ROLE_CHANGE:null
  })

};
