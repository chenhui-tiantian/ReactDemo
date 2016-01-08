/**
 * Created by chenh on 2015/12/23.
 */

var keyMirror = require('keymirror');
module.exports = {
  ActionTypes: keyMirror({
    FETCH_DISKFORMATTYPES: null,
    FETCH_CATEGORIES: null,
    DELETE_CATEGORY: null,
    ADD_CATEGORY: null,
    SEARCH_CATEGORIESNAME: null,
    SELECT_CATEGORY: null,

    UPLOAD_ISO: null,
    UPLOAD_TEMPLATE: null
  })
};
