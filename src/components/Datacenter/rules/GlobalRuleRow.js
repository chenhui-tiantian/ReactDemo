/**
 * Created by lenovo on 2015/12/3.
 */
const ListItem = require('material-ui/lib/lists/list-item');
const IconButton = require('material-ui/lib/icon-button');
const IconMenu = require('material-ui/lib/menus/icon-menu');
const MenuItem = require('material-ui/lib/menus/menu-item');
const MoreVertIcon = require('material-ui/lib/svg-icons/navigation/more-vert');
const Colors = require('material-ui/lib/styles/colors');
let injectTapEventPlugin = require('react-tap-event-plugin');
injectTapEventPlugin();
var RuleAction = require('../../../actions/datacenter/RuleAction');


var React = require('react');

var GlobalRuleRow = React.createClass({
  deleteItem(item, value)
  {
    RuleAction.deleteEnterpriseExclusions(this.props.globalrule.id);
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
        <MenuItem onItemTouchTap={this.deleteItem}>Delete</MenuItem>
      </IconMenu>
    );

    return (< ListItem primaryText='主机独占策略' secondaryText={
                '虚拟组织：' + this.props.globalrule.firstenterprisename +
                ' 虚拟组织：' + this.props.globalrule.secondenterprisename
                }
                       rightIconButton={rightIconMenu}>
    </ListItem>);
  }

});

module.exports = GlobalRuleRow;
