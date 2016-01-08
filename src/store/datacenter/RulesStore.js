/**
 * Created by chenh on 2015/12/2.
 */
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var RuleResource = require('../../resources/datacenter/RuleResource');
var EnterpriseResource = require('../../resources/datacenter/EnterpriseResource');
var DataCenterDispatcher = require('../../dispatcher/datacenter/DataCenterDispatcher');
var RulesConstants = require('../../constants/datacenter/RulesConstants');

var StatusDialogStore = require('../common/StatusDialogStore');

var ActionTypes = RulesConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _currentdataCenterid = 0;
var _globalRules = {
  fitPolicyRules: {},
  enterpriseExclusionRules: []
};
var _allEnterprises = [];

var _dataCenterRules = {};

var RulesStore = assign({}, EventEmitter.prototype, {

  getGlobalRules(){
    return _globalRules;
  },

  getDataCenterRules(){
    return _dataCenterRules;
  },

  getAllEnterprise(){
    return _allEnterprises;
  },

  searchGlobalRules() {

    RuleResource.getGlobalRules().then((result) => {
      _globalRules.enterpriseExclusionRules = [];
      var globalrules = result.enterpriseExclusionRules.collection;
      var globallength = globalrules.length;

      console.log('fitPolicyRules ');
      console.log(result.fitPolicyRules);

      //globalrule's fitPolicyRules,include id fitPolicyRules
      var policyruleid = result.fitPolicyRules.collection[0].id;
      var policyrule = result.fitPolicyRules.collection[0].fitPolicy;

      console.log('policyruleid : ' + policyruleid);
      console.log('policyrule : ' + policyrule);

      //_globalRules.fitPolicyRules = {id:policyruleid, fitPolicy:policyrule};
      _globalRules.fitPolicyRules['id'] = policyruleid;
      _globalRules.fitPolicyRules['fitPolicy'] = policyrule;

      console.log('_globalRules id = ' + _globalRules.fitPolicyRules.id);
      var count = 0;
      for (let index = 0; index < globallength; index++) {
        var globalrule = globalrules[index];
        // the links include the rules' the firstenterprise's url  the secondenterprise's url
        var links = globalrule.links;
        var globalruleurl = links[0].href;
        var globalruleid = globalrule.id;
        var globalruletype = links[0].type;


        //the rules' link,include firstenterprise' id, url, type
        var firstenterpriseurl = links[1].href;
        var firstenterprisetype = links[1].type;

        //the rules' link,include rules' id, url, type
        var secondenterpriseurl = links[2].href;
        var secondenterprisetype = links[2].type;

        _globalRules.enterpriseExclusionRules.push({
          id: globalruleid,
          url: globalruleurl,
          type: globalruletype,
          firstenterpriseurl: firstenterpriseurl,
          secondenterpriseurl: secondenterpriseurl
        });

        EnterpriseResource.getEnterpriseByUrl(firstenterpriseurl, firstenterprisetype).then((enterprise) => {
          var firstenterprisenid = enterprise.id;
          var firstenterprisename = enterprise.name;
          _globalRules.enterpriseExclusionRules[index]['firstenterprisenid'] = firstenterprisenid;
          _globalRules.enterpriseExclusionRules[index]['firstenterprisename'] = firstenterprisename;

          count++;
          if (count >= globallength * 2) {
            this.emit(CHANGE_EVENT);
          }
        });

        EnterpriseResource.getEnterpriseByUrl(secondenterpriseurl, secondenterprisetype).then((enterprise) => {
          var secondenterpriseid = enterprise.id;
          var secondenterprisename = enterprise.name;

          _globalRules.enterpriseExclusionRules[index]['secondenterpriseid'] = secondenterpriseid;
          _globalRules.enterpriseExclusionRules[index]['secondenterprisename'] = secondenterprisename;

          count++;
          if (count >= globallength * 2) {
            this.emit(CHANGE_EVENT);
          }
        });
      }
    });
  },

  searchAllEnterprises(){
    EnterpriseResource.getEnterprises().then(result => {
      if (result.collection) {
        _allEnterprises = result.collection;
      }
      this.emit(CHANGE_EVENT);
    });
  },


  searchDataCenterRules(id) {

    _currentdataCenterid = id;
    RuleResource.getRulesByid(id).then(result => {
      if (result) {
        _dataCenterRules = result;
      }
      this.emit(CHANGE_EVENT);
    });
  },

  /*delete global rule by ruleID*/
  deleteEnterpriseExclusions(id){
    RuleResource.deleteEnterpriseExclusions(id).then(()=> {
      StatusDialogStore.pushMessage({title: '删除主机共享策略', body: '删除成功！', isFail: false});
      this.searchGlobalRules();
    }, (e)=> {
      StatusDialogStore.pushMessage({title: '删除主机共享策略', body: e.message, isFail: true});
    });
  },

  /*change global balance level by fitPolicy*/
  modifyEnterpriseExclusions(fitPolicy){
    RuleResource.modifyEnterpriseExclusions(fitPolicy).then(()=> {
      this.searchGlobalRules();
    });
  },

  //delete datacenter's balance level by ruleid
  deleteMachineLoadLevel(id){
    RuleResource.deleteMachineLoadLevel(id).then(()=> {
      this.searchDataCenterRules(_currentdataCenterid);
    });
  },

  //delete datacenter's Policy level by ruleid
  deletePolicyRule(id){
    RuleResource.deletePolicyRule(id).then(()=> {
      this.searchDataCenterRules(_currentdataCenterid);
    });
  },

  //add global rule EnterpriserExclusion
  addEnterpriserExclusion(enterpriser1, enterpriser2){
    RuleResource.insertEnterpriseExclusions(enterpriser1, enterpriser2).then(()=> {
      StatusDialogStore.pushMessage({title: '添加主机共享策略', body: '添加成功！', isFail: false});
      this.searchGlobalRules();
    }, (e)=>{
      StatusDialogStore.pushMessage({title: '添加主机共享策略', body: e.message, isFail: true});
    });
  },
  addChangedListener(callback)
  {
    this.on(CHANGE_EVENT, callback);
  },
  removeChangedListener(callback){
    this.removeListener(CHANGE_EVENT, callback);
  }
});


DataCenterDispatcher.register(function (action) {
  switch (action.type) {
    case ActionTypes.SEARCH_GLOABLERULE:
      RulesStore.searchGlobalRules();
      break;

    case ActionTypes.SEARCH_DATACENTERRULE:
      RulesStore.searchDataCenterRules(action.dataCenterID);
      break;

    case ActionTypes.DELETE_ENTERPRISEEXCLUSIONS:
      RulesStore.deleteEnterpriseExclusions(action.id);
      break;

    case ActionTypes.MODIFY_ENTERPRISEEXCLUSIONS:
      RulesStore.modifyEnterpriseExclusions(action.fitPolicy);
      break;

    case ActionTypes.SEARCH_ALLENTERPRISES:
      RulesStore.searchAllEnterprises();
      break;

    case ActionTypes.ADD_ENTERPRISEEXCLUSIONS:
      RulesStore.addEnterpriserExclusion(action.enterpriser1, action.enterpriser2);
      break;

    default:
      break;
  }
});

module.exports = RulesStore;
