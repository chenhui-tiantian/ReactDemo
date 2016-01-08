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
var DATACENTERUSAGE_EVENT = 'dataCenterUsage';
var _dataCenterUsage = {};


var DataCenterUsageStore = assign({}, EventEmitter.prototype, {
  getDataCenterUsage(){
    return _dataCenterUsage;
  },

  searchDataCenterUsageByID(id){
    if (id > 0) {
      DataCenterResource.getDataCenterUsageByID(id).then(result => {
        if (result) {
          _dataCenterUsage = result;
        }
        this.emit(DATACENTERUSAGE_EVENT);
      });
    }
  },

  addDataCenterUsageListener(callback){
    this.on(DATACENTERUSAGE_EVENT, callback);
  },

  removeDataCenterUsageListener(callback){
    this.removeListener(DATACENTERUSAGE_EVENT, callback);
  }
});

DataCenterUsageStore.dispatchToken = DataCenterDispatcher.register(function (action) {

  if (action.type === ActionTypes.SEARCH_DATACENTERUSAGE) {
    DataCenterUsageStore.searchDataCenterUsageByID(action.dataCenterID);
  }


});

module.exports = DataCenterUsageStore;
