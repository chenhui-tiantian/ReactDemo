/**
 * Created by chenh on 2015/11/30.
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
var DataCenterAction = require('../../../actions/datacenter/DataCenterAction');

var DataCenterRow = React.createClass({

deleteItem(item, value){
  DataCenterAction.deleteDataCenter(this.props.datacenter.id);
},
  selectItem(item){
    DataCenterAction.selectDataCenter(this.props.datacenter.id);
  },
render: function () {
  let iconButtonElement = (
    <IconButton
      touch={true}
      tooltip="more"
      tooltipPosition="bottom-left">
      <MoreVertIcon color={Colors.grey400} />
    </IconButton>
  );

  let rightIconMenu = (
    <IconMenu iconButtonElement={iconButtonElement} onItemTouchTap={this.deleteItem}>
      <MenuItem onItemTouchTap={this.deleteItem}>删除</MenuItem>
    </IconMenu>
  );

  return (
      < ListItem primaryText={this.props.datacenter.name}
                 rightIconButton= {rightIconMenu}
                 onTouchTap= {this.selectItem}/>
    );
  }
});

module.exports = DataCenterRow;
