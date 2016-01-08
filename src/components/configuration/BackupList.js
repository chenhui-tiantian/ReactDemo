/**
 * Created by chenh on 2015/11/30.
 */
var React = require('react');
const ListItem = require('material-ui/lib/lists/list-item');
const List = require('material-ui/lib/lists/list');
const IconButton = require('material-ui/lib/icon-button');
const IconMenu = require('material-ui/lib/menus/icon-menu');
const MenuItem = require('material-ui/lib/menus/menu-item');
const MoreVertIcon = require('material-ui/lib/svg-icons/navigation/more-vert');
const Colors = require('material-ui/lib/styles/colors');
let injectTapEventPlugin = require('react-tap-event-plugin');
injectTapEventPlugin();

var ConfiguartionAction = require('../../actions/configuration/ConfiguartionAction');

var BackupRow = React.createClass({
  deleteItem(e, item){
    console.log('item = ');
  console.log(e);
    console.log(item);
    if(item.key==='0'){
      ConfiguartionAction.deleteBackupByID(this.props.backup.id);
    }
    if(item.key==='1'){
      ConfiguartionAction.recoverBackup(this.props.backup);
    }
  },

  render: function () {
    let iconButtonElement = (
      <IconButton
        touch={true}
        tooltip="more"
        tooltipPosition="bottom-left">
        <MoreVertIcon color={Colors.grey400}/>
      </IconButton>
    );

    let rightIconMenu = (
      <IconMenu iconButtonElement={iconButtonElement} onItemTouchTap={this.deleteItem}>
        <MenuItem key='0'>删除</MenuItem>
        <MenuItem key='1'>恢复备份</MenuItem>
      </IconMenu>
    );
    return (<ListItem  primaryText={
              <label>备份平台 : {this.props.backup.platform}  备份文件 :  {this.props.backup.fileName}</label>
            }
                       rightIconButton={rightIconMenu}/>);
  }

});


var BackupList = React.createClass({

  render: function () {
    var rows = [];
    if (this.props.backups != null) {
      this.props.backups.forEach((backup)=> {
        rows.push(< BackupRow key={backup.id}
                               backup={backup}
          />);
      });
    }

    return <List> {rows} </List>;
  }
});

module.exports = BackupList;
