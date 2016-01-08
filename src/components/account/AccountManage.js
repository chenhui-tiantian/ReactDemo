/**
 * Created by chenh on 2015/11/19.
 */
var React = require('react');
var Tabs = require('react-simpletabs');

var ThemeManager = require('material-ui/lib/styles/theme-manager');
var unicloudTheme = require('../../themes/unicloud');
var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();


var VirtualOrganization = require('./VirtualOrganization');
let Users = require('./Users');
let RoleManage = require('./role/RoleManage');

var AccountManage = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getChildContext() {
    return {
      muiTheme: ThemeManager.getMuiTheme(unicloudTheme)
    };
  },
  render () {
    return (
      <div className='accounts'>
        <Tabs>
          <Tabs.Panel title='账户'>
            <Users />
          </Tabs.Panel>
          <Tabs.Panel title='角色'>
            <RoleManage />
          </Tabs.Panel>
        </Tabs>

      </div>
    );
  }
});


module.exports = AccountManage;
