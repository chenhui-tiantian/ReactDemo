/**
 * Created by chenh on 2016/1/5.
 */

var keyMirror = require('keymirror');

module.exports = {

  //configuration management
  ActionTypes: keyMirror({
    FETCH_CONFIG: null,
    UPDATE_CONFIG: null,

    FETCH_LICENSE: null,
    DELETE_LICENSE: null,
    ADD_LICENSE: null,
    FETCH_CUSTOMERCODE: null,

    FETCH_BACKUPS: null,
    FETCH_UPDATES: null,
    DELETE_BACKUP: null,
    RECOVER_BACKUP: null,
    CREATE_BACKUP: null
  })

};
