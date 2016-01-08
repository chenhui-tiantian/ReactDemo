/**
 * Created by chenhui on 2015/11/24.
 */
var DataCenterDispatcher = require('../../dispatcher/datacenter/DataCenterDispatcher');
var DataCenterConstants = require('../../constants/datacenter/DataCenterConstants');
var DataCenterStore = require('../../store/datacenter/DataCenterStore');

var ActionTypes = DataCenterConstants.ActionTypes;

module.exports = {

  searchDataCenterByName: function (name) {
    DataCenterDispatcher.dispatch({
      type: ActionTypes.SEARCH_DATACENTER,
      name: name
    });
  },

  selectDataCenter: function (id) {
    DataCenterDispatcher.dispatch({
      type: ActionTypes.SELECT_DATACENTER,
      id: id
    });
  },

  deleteDataCenter: function (id) {
    DataCenterDispatcher.dispatch({
      type: ActionTypes.DELETE_DATACENTER,
      id: id
    });
  },

  addDataCenter: function (datacenter) {

    DataCenterDispatcher.dispatch({
      type: ActionTypes.ADD_DATACENTER,
      datacenter: datacenter
    });
  },

  searchDataCenterUsageByID: function (dataCenterID) {
    DataCenterDispatcher.dispatch({
      type: ActionTypes.SEARCH_DATACENTERUSAGE,
      dataCenterID: dataCenterID
    });
  },

  searchTotalUsage: function () {
    DataCenterDispatcher.dispatch({
      type: ActionTypes.SEARCH_TOTALUSAGE
    });
  }

};
