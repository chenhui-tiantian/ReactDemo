/**
 * Created by chenh on 2016/1/8.
 */
/**
 * Created by chenh on 2016/1/5.
 */

var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var PlatformBackupResource = require('../../resources/configuration/PlatformBackupResource');
var PlatformUpdateResource = require('../../resources/configuration/PlatformUpdateResource');
var ConfigurationDispatcher = require('../../dispatcher/configuration/ConfigurationDispatcher');
var ConfigurationConstants = require('../../constants/configuration/ConfigurationConstants');
var StatusDialogStore = require('../common/StatusDialogStore');
var ActionTypes = ConfigurationConstants.ActionTypes;

var BACKUP_CHANGE = 'backup_change';
var CUSTOMERCODE_CHANGE = 'update_change';

var _backups = [];
var _updates = {};

var BackupUpdateStore = assign({}, EventEmitter.prototype, {

  fetchPlatformBackup: function () {
    console.log('backup store');
    PlatformBackupResource.getPlatformBackups().then(result => {
      if (result) {
        console.log(result);
        _backups = result;
      }
      this.emit(BACKUP_CHANGE);
    });
  },

  recoverBackup: function(backup){
    PlatformBackupResource.recoverBackup(backup).then(() => {
      StatusDialogStore.pushMessage({title: '恢复备份', body: '恢复成功！', isFail: false});
      this.fetchPlatformBackup();
    }, (e)=> {
      StatusDialogStore.pushMessage({title: '恢复备份', body: e.message, isFail: true});
    });
  },

  createBackup: function(server){
    console.log('store');
    console.log(server);

    PlatformBackupResource.createBackup(server).then(() => {
      StatusDialogStore.pushMessage({title: '创建本平台备份', body: '创建成功！', isFail: false});
      this.fetchPlatformBackup();
    }, (e)=> {
      StatusDialogStore.pushMessage({title: '创建本平台备份', body: e.message, isFail: true});
    });
  },

  deleteBackupByID: function (id) {

    PlatformBackupResource.deletedBackupByID(id).then(() => {
      StatusDialogStore.pushMessage({title: '删除备份', body: '删除成功！', isFail: false});
      this.fetchPlatformBackup();
    }, (e)=> {
      StatusDialogStore.pushMessage({title: '删除备份', body: e.message, isFail: true});
    });
  },

  getBackups(){
    return _backups;
  },


  addBackupsChangedListener(callback)
  {
    this.on(BACKUP_CHANGE, callback);
  },
  removeBackupsChangedListener(callback){
    this.removeListener(BACKUP_CHANGE, callback);
  }
});

ConfigurationDispatcher.register(function (action) {
  switch (action.type) {
    case ActionTypes.FETCH_BACKUPS:
      BackupUpdateStore.fetchPlatformBackup();
      break;

    case ActionTypes.DELETE_BACKUP:
      BackupUpdateStore.deleteBackupByID(action.id);
      break;

    case ActionTypes.RECOVER_BACKUP:
      BackupUpdateStore.recoverBackup(action.backup);
      break;

    case ActionTypes.CREATE_BACKUP:
      BackupUpdateStore.createBackup(action.server);
      break;

    default:
      break;
  }
});

module.exports = BackupUpdateStore;
