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

var LicenseRow = React.createClass({
  deleteItem(item, value){
    ConfiguartionAction.deleteLicenseByID(this.props.license.id);
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
        <MenuItem >删除</MenuItem>
      </IconMenu>
    );
    return (<ListItem  primaryText={
            <p>
              <label>到期时间 : </label>
              <label>{this.props.license.expiration}</label>
              <br />
              <label>可用核数 : </label>
              <label>{this.props.license.numcores}</label>
              <br/>
              <label> {this.props.license.code} </label>
            </p>
            }
                      rightIconButton={rightIconMenu}/>);
  }

});


var LicenseList = React.createClass({

  render: function () {
    var rows = [];
    if (this.props.licenses != null) {
      this.props.licenses.forEach((license)=> {
        rows.push(< LicenseRow key={license.id}
                               license={license}
          />);
      });
    }

    return <List> {rows} </List>;
  }
});

module.exports = LicenseList;
