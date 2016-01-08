/**
 * Created by chenh on 2016/1/8.
 */
'use strict';

var React = require('react');
var mui = require('material-ui');
const FlatButton  = mui.FlatButton ;
var BackupList = require('./BackupList');
var BackupUpdateStore = require('../../store/configuration/BackupUpdateStore');
var ConfiguartionAction = require('../../actions/configuration/ConfiguartionAction');

var ControlButtons = require('../common/ControlButtons');
var AddLicense = require('./AddLicense');

require('./configuration.css');

function getBackupUpdate() {
  return {
    backups: BackupUpdateStore.getBackups() || null
  };
}

var Backup = React.createClass({
  getInitialState() {
    return {
      backups: BackupUpdateStore.getBackups() || null
    };
  },

  componentDidMount(){
    BackupUpdateStore.addBackupsChangedListener(this._onChange);
    ConfiguartionAction.fetchBackups();
  },

  componentWillUnmount(){
    BackupUpdateStore.removeBackupsChangedListener(this._onChange);
  },
  _onChange(){
    this.setState(getBackupUpdate());
  },

  _onCreateBackup(){
    ConfiguartionAction.createBackup({platform:'Server'});
  },
  render: function () {
    return (
      <div >
        <div  className="createBackup">
          <FlatButton label='创建平台备份' onTouchTap= {this._onCreateBackup}/>
        </div>
        <div className="backupList">
          <BackupList backups={this.state.backups}/>
        </div>
     </div>
    );
  }
});

module.exports = Backup;
