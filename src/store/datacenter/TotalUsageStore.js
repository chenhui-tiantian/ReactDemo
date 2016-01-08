/**
 * Created by chenh on 2015/11/20.
 */
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var DataCenterResource = require('../../resources/datacenter/DataCenterResource');
var DataCenterDispatcher = require('../../dispatcher/datacenter/DataCenterDispatcher');
var DataCenterConstants = require('../../constants/datacenter/DataCenterConstants');

var StatusDialogStore = require('../common/StatusDialogStore');
var DataCenterStore = require('./DataCenterStore');

var ActionTypes = DataCenterConstants.ActionTypes;
var TOTALLUSAGE_EVENT = 'totalUsage';
var _totalUsage = {};


var TotalUsageStore = assign({}, EventEmitter.prototype, {

  getTotalUsage(){
    return _totalUsage;
  },
  searchTotalUsage(){
    DataCenterResource.getTotalCloudUsage().then(result => {
      if (result) {
        _totalUsage = result;
      }
      this.emit(TOTALLUSAGE_EVENT);
    });
  },

  addTotalUsageListener(callback)
  {
    this.on(TOTALLUSAGE_EVENT, callback);
  },
  removeTotalUsageListener(callback){
    this.removeListener(TOTALLUSAGE_EVENT, callback);
  }
});

TotalUsageStore.dispatchToken = DataCenterDispatcher.register(function (action) {

  if(action.type == ActionTypes.SEARCH_TOTALUSAGE){
    TotalUsageStore.searchTotalUsage();
  }
});

module.exports = TotalUsageStore;
