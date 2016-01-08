/**
 * Created by chenh on 2016/1/5.
 */

var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var ConfigurationResource = require('../../resources/configuration/ConfigurationResource');
var ConfigurationDispatcher = require('../../dispatcher/configuration/ConfigurationDispatcher');
var ConfigurationConstants = require('../../constants/configuration/ConfigurationConstants');
var StatusDialogStore = require('../common/StatusDialogStore');
var ActionTypes = ConfigurationConstants.ActionTypes;
var CONFIG_CHANGE = 'config_change';

var _configs = [];

var ConfigurationStore = assign({}, EventEmitter.prototype, {

   fetchConfigs: function () {
     ConfigurationResource.getConfigs().then(result => {
      if (result.collection) {
        _configs = result.collection;
      }
      this.emit(CONFIG_CHANGE);
    });
  },

  updateConfigs: function (config) {
    ConfigurationResource.updateConfigs(config).then(() => {
      this.fetchConfigs();
    }).then(() => {
      StatusDialogStore.pushMessage({title: '更新配置', body: '更新配置成功！', isFail: false});
      this.searchDataCenterByName();
    }, (e)=> {
      StatusDialogStore.pushMessage({title: '更新配置', body: e.message, isFail: true});
    });
  },


  getConfigs()
  {
    return _configs;
  },
  addConfigChangedListener(callback)
  {
    this.on(CONFIG_CHANGE, callback);
  },
  removeConfigChangedListener(callback){
    this.removeListener(CONFIG_CHANGE, callback);
  }
});

ConfigurationDispatcher.register(function (action) {
  switch (action.type) {
    case ActionTypes.FETCH_CONFIG:
      ConfigurationStore.fetchConfigs();
      break;

    case ActionTypes.UPDATE_CONFIG:
      ConfigurationStore.updateConfigs(action.config);
      break;

    default:
      break;
  }
});

module.exports = ConfigurationStore;
