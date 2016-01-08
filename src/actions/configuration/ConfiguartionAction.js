/**
 * Created by chenh on 2016/1/5.
 */

var ConfigurationDispatcher = require('../../dispatcher/configuration/ConfigurationDispatcher');
var ConfigurationConstants = require('../../constants/configuration/ConfigurationConstants');

var ActionTypes = ConfigurationConstants.ActionTypes;

module.exports = {

  fetchConfigs: function() {
    ConfigurationDispatcher.dispatch({
      type: ActionTypes.FETCH_CONFIG
    });
  },

  updateConfig: function(config){
    ConfigurationDispatcher.dispatch({
      type: ActionTypes.UPDATE_CONFIG,
      config: config
    });
  },

  fetchLicenses: function(){
    ConfigurationDispatcher.dispatch({
      type: ActionTypes.FETCH_LICENSE
    });
  },

  deleteLicenseByID: function(id){
    ConfigurationDispatcher.dispatch({
      type: ActionTypes.DELETE_LICENSE,
      id: id
    });
  },

  addLicense: function(code){
    ConfigurationDispatcher.dispatch({
      type: ActionTypes.ADD_LICENSE,
      code: code
    });
  },

  fetchCustomerCode: function(){
    ConfigurationDispatcher.dispatch({
      type: ActionTypes.FETCH_CUSTOMERCODE
    });
  },

  fetchBackups: function(){
    ConfigurationDispatcher.dispatch({
      type: ActionTypes.FETCH_BACKUPS
    });
  },

  deleteBackupByID: function(id){
    ConfigurationDispatcher.dispatch({
      type: ActionTypes.DELETE_BACKUP,
      id: id
    });
  },

  recoverBackup: function(backup){
    ConfigurationDispatcher.dispatch({
      type: ActionTypes.RECOVER_BACKUP,
      backup: backup
    });
  },

  createBackup: function(server){
    ConfigurationDispatcher.dispatch({
      type: ActionTypes.CREATE_BACKUP,
      server: server
    });
  }
};
