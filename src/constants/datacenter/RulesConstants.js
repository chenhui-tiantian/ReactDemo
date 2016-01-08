/**
 * Created by chenh on 2015/12/2.
 * Rules management
 */
var keyMirror = require('keymirror');

module.exports = {

  ActionTypes: keyMirror({
    SEARCH_GLOABLERULE: null,
    SEARCH_DATACENTERRULE: null,
    SEARCH_ALLENTERPRISES: null,

    DELETE_POLICYRULE: null,
    DELETE_MACHINELOADLEVEL: null,
    DELETE_ENTERPRISEEXCLUSIONS: null,

    MODIFY_ENTERPRISEEXCLUSIONS: null,

    ADD_ENTERPRISEEXCLUSIONS: null,
    ADD_POLICYRULE: null,
    ADD_MACHINELOADLEVEL: null
  })

};

