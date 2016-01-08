/**
 * Created by Administrator on 2015/12/4 0004.
 */
//  资源池constants
var keyMirror = require('keymirror');

module.exports = {

  //DataCenter management
  ActionTypes: keyMirror({
    SEARCH_RACK: null,
    DELETE_RACK: null,
    ADD_RACK: null,
    SEARCH_RACKNAME: null,
    UPDATE_RACKID: null
  })
};
