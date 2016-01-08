/**
 * Created by chenh on 2015/12/2.
 */
var DataCenterDispatcher = require('../../dispatcher/datacenter/DataCenterDispatcher');
var RulesConstants = require('../../constants/datacenter/RulesConstants');


var ActionTypes = RulesConstants.ActionTypes;

module.exports = {
  getAllEnterprises: function () {
    DataCenterDispatcher.dispatch({
      type: ActionTypes.SEARCH_ALLENTERPRISES
    });
  },

  getRulesByid: function (dataCenterID) {
    DataCenterDispatcher.dispatch({
      type: ActionTypes.SEARCH_DATACENTERRULE,
      dataCenterID: dataCenterID
    });
  },

  getGlobalRules: function () {
    DataCenterDispatcher.dispatch({
      type: ActionTypes.SEARCH_GLOABLERULE
    });
  },

  deleteEnterpriseExclusions: function (id) {
    DataCenterDispatcher.dispatch({
      type: ActionTypes.DELETE_ENTERPRISEEXCLUSIONS,
      id: id
    });
  },

  deleteMachineLoadLevel: function (id) {
    DataCenterDispatcher.dispatch({
      type: ActionTypes.DELETE_MACHINELOADLEVEL,
      id: id
    });
  },

  deletePolicyRule: function (id) {
    DataCenterDispatcher.dispatch({
      type: ActionTypes.DELETE_POLICYRULE,
      id: id
    });
  },

  modifyEnterpriseExclusions: function (fitPolicy) {
    DataCenterDispatcher.dispatch({
      type: ActionTypes.MODIFY_ENTERPRISEEXCLUSIONS,
      fitPolicy: fitPolicy
    });
  },

  addEnterpriseExclusions: function (enterpriser1, enterpriser2) {
    DataCenterDispatcher.dispatch({
      type: ActionTypes.ADD_ENTERPRISEEXCLUSIONS,
      enterpriser1: enterpriser1,
      enterpriser2: enterpriser2
    });
  }
};
