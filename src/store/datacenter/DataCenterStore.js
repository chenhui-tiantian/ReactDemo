/**
 * Created by chenh on 2015/11/20.
 */
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var DataCenterResource = require('../../resources/datacenter/DataCenterResource');
var DataCenterDispatcher = require('../../dispatcher/datacenter/DataCenterDispatcher');
var DataCenterConstants = require('../../constants/datacenter/DataCenterConstants');

var StatusDialogStore = require('../common/StatusDialogStore');

var ActionTypes = DataCenterConstants.ActionTypes;
var DATACHANGE_EVENT = 'DATACHANGE_EVENT';

var _datacenters = [];
var _selectDataCenterID = 0;
let _selectedDCIndex = 0;


var DataCenterStore = assign({}, EventEmitter.prototype, {

  getDataCenters(){
    return _datacenters;
  },
  getSelectedDataCenterID(){
    return _selectDataCenterID;
  },

  setSelectedDataCenterID(id){
    _selectDataCenterID = id;
    window.setTimeout(()=> {
      this.emit(DATACHANGE_EVENT);
    });
  },
  setSelectedDataCenterIndex(index){
    _selectedDCIndex = index;
  },
  getSelectedDCIndex(){
    return _selectedDCIndex;
  },
  searchDataCenterByName: function (name) {
    DataCenterResource.getDataCenterByName(name).then(result => {
      if (result.collection) {
        _datacenters = result.collection;
        if (_selectDataCenterID < 1) {
          _selectDataCenterID = _datacenters[0].id;
        }
      }
      this.emit(DATACHANGE_EVENT);
    });
  },


  deleteDataCenterByID: function (id) {
    DataCenterResource.deleteDataCenterByID(id).then(() => {
      StatusDialogStore.pushMessage({title: '删除数据中心', body: '删除成功！', isFail: false});
      this.searchDataCenterByName();
    }, (e)=> {
      StatusDialogStore.pushMessage({title: '删除数据中心', body: e.message, isFail: true});
    });
  },

  addDataCenter: function (datacenter) {
    DataCenterResource.insertDataCenter(datacenter).then(() => {
      StatusDialogStore.pushMessage({title: '添加数据中心', body: '添加成功！', isFail: false});
      this.searchDataCenterByName();
    }, (e)=> {
      StatusDialogStore.pushMessage({title: '添加数据中心', body: e.message, isFail: true});
    });
  },


  addDataCenterListListener(callback)
  {
    this.on(DATACHANGE_EVENT, callback);
  },
  removeDataCenterListListener(callback){
    this.removeListener(DATACHANGE_EVENT, callback);
  }
});

DataCenterStore.dispatchToken = DataCenterDispatcher.register(function (action) {
  switch (action.type) {
    case ActionTypes.SEARCH_DATACENTER:
      DataCenterStore.searchDataCenterByName(action.name);
      break;

    case ActionTypes.DELETE_DATACENTER:
      DataCenterStore.deleteDataCenterByID(action.id);
      break;

    case ActionTypes.ADD_DATACENTER:
      DataCenterStore.addDataCenter(action.datacenter);
      break;

    case ActionTypes.SELECT_DATACENTER:
      DataCenterStore.setSelectedDataCenterID(action.id);
      break;

    default:
      break;
  }
});

module.exports = DataCenterStore;
