/**
 * Created by Administrator on 2015/12/4 0004.
 */
var DataCenterDispatcher = require('../../dispatcher/datacenter/DataCenterDispatcher');
var RackConstants = require('../../constants/datacenter/RackConstants');


var ActionTypes = RackConstants.ActionTypes;

module.exports = {
  searchRackByName: function(payload){
    DataCenterDispatcher.dispatch({
      type: ActionTypes.SEARCH_RACKNAME,
      payload: {
        name: payload.name,
        dcID: payload.dcID
      }
    });
  },
  getRack: function(payload){
    DataCenterDispatcher.dispatch({
      type: ActionTypes.SEARCH_RACK,
      payload: payload
    });
  },
  addRack: function(datacenterID,data){
    DataCenterDispatcher.dispatch({
      type: ActionTypes.ADD_RACK,
      dataCenterID: datacenterID,
      data: data
    });
  },
  updateRackID: function(rackID){
    DataCenterDispatcher.dispatch({
      type: ActionTypes.UPDATE_RACKID,
      rackID: rackID
    });
  },
  deleteRackByID: function(datacenterID,rackID){
    DataCenterDispatcher.dispatch({
      type: ActionTypes.DELETE_RACK,
      rackID: rackID,
      dcID: datacenterID
    });
  }

};
