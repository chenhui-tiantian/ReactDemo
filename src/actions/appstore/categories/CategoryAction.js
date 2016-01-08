/**
 * Created by chenh on 2015/12/23.
 */

var AppStoreDispatcher = require('../../../dispatcher/appstore/AppStoreDispatcher');
var CategoryConstants = require('../../../constants/appstore/category/CategoryConstants');


var ActionTypes = CategoryConstants.ActionTypes;

module.exports = {
  fetchDiskFormatTypes: function () {
    AppStoreDispatcher.dispatch({
      type: ActionTypes.FETCH_DISKFORMATTYPES
    });
  },

  fetchCategories: function () {
    AppStoreDispatcher.dispatch({
      type: ActionTypes.FETCH_CATEGORIES
    });
  },

  searchCategoriesByName: function (name) {
    AppStoreDispatcher.dispatch({
      type: ActionTypes.SEARCH_CATEGORIESNAME,
      name: name
    });
  },
  selectCategory: function (category) {
    AppStoreDispatcher.dispatch({
      type: ActionTypes.SELECT_CATEGORY,
      payload: category
    });
  },
  deleteCategory: function (id) {
    AppStoreDispatcher.dispatch({
      type: ActionTypes.DELETE_CATEGORY,
      id: id
    });
  },
  addCategory: function (category) {
    AppStoreDispatcher.dispatch({
      type: ActionTypes.ADD_CATEGORY,
      category: category
    });
  },
  uploadISO: function (payload) {
    let data = payload;
    data.metaData = payload.metaData;
    data.dcID = payload.dcID;
    data.file = payload.file;
    AppStoreDispatcher.dispatch({
      type: ActionTypes.UPLOAD_ISO,
      payload: data
    });
  },
  uploadTemplate: function (payload) {
    let data = payload;
    data.metaData = payload.metaData;
    data.dcID = payload.dcID;
    data.file = payload.file;
    AppStoreDispatcher.dispatch({
      type: ActionTypes.UPLOAD_TEMPLATE,
      payload: data
    });
  }
};
