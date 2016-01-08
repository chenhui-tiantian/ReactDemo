/**
 * Created by lenovo on 2015/11/20.
 */
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var AccountSource = require('../../resources/account/AccountResource');
var AccountDispatcher = require('../../dispatcher/account/AccountDispatcher');
var AccountConstants = require('../../constants/account/AccountConstants');

var ActionTypes = AccountConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _organizes = [];
var prename = '';


var _currentPage = 78;
var _total = 2260;
var AccountStore = assign({}, EventEmitter.prototype, {

  getcurrentPage(){
    return _currentPage;
  },
  setcurrentPage(page){
    _currentPage = page;
    _total = _total - 9;

    console.log('store currentpage ' + _currentPage);
    console.log('store _total ' + _total);

    this.emit(CHANGE_EVENT);
  },
  getTotalPage(){
    return _total;
  },
  searchOrganizeByName: function (name) {
    prename = name;

    AccountSource.getOrganizeByName(name).then(result => {
      if (result.collection) {
        _organizes = result.collection;
      }
      this.emit(CHANGE_EVENT);
    });
  },

  deleteOrganizeByID: function (id) {
    AccountSource.deleteOrganizeByID(id).then(() => {
      this.searchOrganizeByName(prename);
    });
  },

  addOrganize: function (name) {
    AccountSource.addOrganize(name).then(() => {
      this.searchOrganizeByName(prename);
    });
  },

  getAllOrganizes()
  {
    return _organizes;
  },
  addChangedListener(callback)
  {
    this.on(CHANGE_EVENT, callback);
  },
  removeChangedListener(callback){
    this.removeListener(CHANGE_EVENT, callback);
  }
});

AccountDispatcher.register(function (action) {
  switch (action.type) {
    case ActionTypes.SEARCH_ORGANIZATION:
      AccountStore.searchOrganizeByName(action.organizename);
      break;

    case ActionTypes.DELETE_ORGANIZATION:
      AccountStore.deleteOrganizeByID(action.id);
      break;

    case ActionTypes.ADD_ORGANIZATION:
      AccountStore.addOrganize(action.organizename);
      break;

    case ActionTypes.CURRENT:
      AccountStore.setcurrentPage(action.currentPage);
      break;

    default:
      break;
  }
});

module.exports = AccountStore;
