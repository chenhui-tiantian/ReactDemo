/**
 * Created by chenh on 2015/11/30.
 */
var keyMirror = require('keymirror');

module.exports = {

  //DataCenter management
  ActionTypes: keyMirror({
    SEARCH_DATACENTER: null,
    DELETE_DATACENTER: null,
    ADD_DATACENTER: null,

    SELECT_DATACENTER: null,
    SEARCH_DATACENTERUSAGE: null,
    SEARCH_TOTALUSAGE: null
  })

};
