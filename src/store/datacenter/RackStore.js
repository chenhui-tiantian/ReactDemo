/**
 * Created by Administrator on 2015/12/4 0004.
 */
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var RackResource = require('../../resources/datacenter/RackResource');
var DataCenterDispatcher = require('../../dispatcher/datacenter/DataCenterDispatcher');
var RackConstants = require('../../constants/datacenter/RackConstants');


var ActionTypes = RackConstants.ActionTypes;
var CHANGE_EVENT = 'RACK_CHANGE_EVENT';
const RACKID_CHANGED = 'RACKID_CHANGED';
//const FETCH_RACKS_SUCCESS = 'FETCH_RACKS_SUCCESS';
//const FETCH_RACKS_FAIL = 'FETCH_RACKS_FAIL';
//const EDIT_RACK_SUCCESS = 'EDIT_RACK_SUCCESS';
//const EDIT_RACK_FAIL = 'EDIT_RACK_FAIL';
//const DEL_RACK_SUCCESS = 'DEL_RACK_SUCCESS';
//const DEL_RACK_FAIL = 'DEL_RACK_FAIL';
//const TRIGGER_RACKS_CHANGE = 'TRIGGER_RACK_CHANGE';
//const STATE_CHECK_CHANGE = 'STATE_CHECK_CHANGE';
//const STORAGE_SELECTION_CHANGE = 'STORAGE_SELECTION_CHANGE';
var _racks = [];
var _CurrentRack = {};
let _rackID = 0;

var RackStore = assign({}, EventEmitter.prototype, {
  getRacks(){
    return _racks;
  },
  searchRack(payload){
    RackResource.getRack(payload).then(result => {
      if (result.collection) {
        _racks = result.collection;
      }
      if (_racks.length > 0) {
        _rackID = _racks[0].id;
      }else{
        _rackID = 0;
      }
      this.emit(CHANGE_EVENT);
      this.emit(RACKID_CHANGED);
    });
  },

  searchRackByName: function (payload) {
    //_prename = name;

    RackResource.getRackByName(payload).then(result => {
      if (result.collection) {
        _racks = result.collection;
      }
      if (_racks.length > 0) {
        _rackID = _racks[0].id;
      }else{
        _rackID = 0;
      }
      this.emit(CHANGE_EVENT);
      this.emit(RACKID_CHANGED);
    });
  },

  addRack(datacenterID, data){
    RackResource.addRack(datacenterID, data).then(()=> {
      this.searchRack();
      this.emit(CHANGE_EVENT);
    });
  },

  deleteRackByID(dcID, rackID) {
    console.log('delete rack store id >>>>', dcID, rackID);
    RackResource.deleteRackByID(dcID, rackID);
    this.searchRack();
    this.emit(CHANGE_EVENT);

  },
  getRackID(){
    return _rackID;
  },
  triggerRackIDUpdate(rackID){
    _rackID = rackID;
    this.emit(RACKID_CHANGED);
  },
  addChangedListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  removeChangedListener(callback){
    this.removeListener(CHANGE_EVENT, callback);
  },
  addRackIDChangedListener(callback){
    this.on(RACKID_CHANGED, callback);
  },
  removeRackIDChangedListener(callback){
    this.removeListener(RACKID_CHANGED, callback);
  }

});

DataCenterDispatcher.register(function (action) {
  switch (action.type) {
    case ActionTypes.SEARCH_RACKNAME:
      RackStore.searchRackByName(action.payload);
      break;
    case ActionTypes.SEARCH_RACK:
      RackStore.searchRack(action.payload);
      break;
    case ActionTypes.DELETE_RACK:
      RackStore.deleteRackByID(action.dcID, action.rackID);
      break;
    case ActionTypes.ADD_RACK:
      RackStore.addRack(action.datacenterID, action.data);
      break;
    case ActionTypes.UPDATE_RACKID:
      RackStore.triggerRackIDUpdate(action.rackID);
      break;
    default:
      break;
  }
});
module.exports = RackStore;

