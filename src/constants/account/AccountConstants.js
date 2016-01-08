/**
 * Created by chenhui on 2015/11/24.
 */
var keyMirror = require('keymirror');

module.exports = {

  //organization management
  ActionTypes: keyMirror({
    SEARCH_ORGANIZATION: null,
    DELETE_ORGANIZATION: null,
    MODIFY_ORGANIZATION: null,
    ADD_ORGANIZATION: null,

    CURRENT: null
  })

};
