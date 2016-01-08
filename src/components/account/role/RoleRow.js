/**
 * Created by chenh on 2015/12/28.
 */

var React = require('react');
const ListItem = require('material-ui/lib/lists/list-item');
const IconButton = require('material-ui/lib/icon-button');
const IconMenu = require('material-ui/lib/menus/icon-menu');
const MenuItem = require('material-ui/lib/menus/menu-item');
const MoreVertIcon = require('material-ui/lib/svg-icons/navigation/more-vert');
const Colors = require('material-ui/lib/styles/colors');
let injectTapEventPlugin = require('react-tap-event-plugin');
injectTapEventPlugin();

let RolesAction = require('../../../actions/account/RolesAction');
var RoleRow = React.createClass({

  deleteItem(item, value)
  {
    RolesAction.deleteRoleByID(this.props.role.id);
  },
  selectRole(){
    RolesAction.selectRole(this.props.role);
  },

  render: function () {
    let iconButtonElement = (
      <IconButton
        touch={true}
        tooltip="more"
        tooltipPosition="bottom-left">
      </IconButton>
    );

    let rightIconMenu = (
      <IconMenu iconButtonElement={iconButtonElement} onItemTouchTap={this.deleteItem}>
        <MenuItem>删除</MenuItem>
      </IconMenu>
    );

    return (

      < ListItem primaryText={this.props.role.name}
                 rightIconButton={rightIconMenu} onTouchTap={this.selectRole}
        />
    );
  }
});

module.exports = RoleRow;
