/**
 * Created by chenhui on 2015/11/24.
 */
var AccountDispatcher = require('../../dispatcher/account/AccountDispatcher');
var AccountConstants = require('../../constants/account/AccountConstants');

var ActionTypes = AccountConstants.ActionTypes;

module.exports = {

  deleteAccountByID: function(id) {
    AccountDispatcher.dispatch({
      type: ActionTypes.DELETE_ORGANIZATION,
      id: id
    });
  },

  selectAccountByName: function(name){
    AccountDispatcher.dispatch({
      type: ActionTypes.SEARCH_ORGANIZATION,
      organizename: name
    });
  },

  addAccountByName: function(name){
    AccountDispatcher.dispatch({
      type: ActionTypes.ADD_ORGANIZATION,
      organizename: name
    });
  },

  searchPage: function(currentPage)
  {
    AccountDispatcher.dispatch({
      type: ActionTypes.CURRENT,
      currentPage: currentPage
    });
  }
};
