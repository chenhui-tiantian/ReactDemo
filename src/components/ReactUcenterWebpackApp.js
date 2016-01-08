'use strict';

var React = require('react');
var ReactTransitionGroup = require('react-addons-transition-group');
var ReactRouter = require('react-router');
var UserStore = require('../store/UserStore');
var Navigation = ReactRouter.Navigation;
var RouteHandler = ReactRouter.RouteHandler;
var mui = require('material-ui');
var LeftNav = mui.LeftNav;
var MenuItem = mui.MenuItem;
var Nav = require('./Nav');
let StatusDialog = require('./common/StatusDialog');


const UniCloud = require('../themes/unicloud');
const ThemeManager = require('material-ui/lib/styles/theme-manager');


var menuItems = [
  { route: 'get-started', text: 'Get Started' },
  { route: 'customization', text: 'Customization' },
  { route: 'components', text: 'Components' },
  { type: MenuItem.Types.SUBHEADER, text: 'Resources' },
  {
    type: MenuItem.Types.LINK,
    payload: 'https://github.com/callemall/material-ui',
    text: 'GitHub'
  },
  {
    text: 'Disabled',
    disabled: true
  },
  {
    type: MenuItem.Types.LINK,
    payload: 'https://www.google.com',
    text: 'Disabled Link',
    disabled: true
  }
];

// CSS
require('normalize.css');

var ReactUcenterWebpackApp = React.createClass({
  mixins: [ Navigation ],
  _onChange() {
    this.transitionTo('/');
  },
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext() {
    return {
      muiTheme: ThemeManager.getMuiTheme(UniCloud)
    };
  },
  componentDidMount() {
    UserStore.addAuthoredListener(this._onChange);
    var currentUser = UserStore.getCurrentUser();
    if (!currentUser) {//TODO: change back when in production
      this.transitionTo('/login');
    }
  },
  render: function() {
    var currentRouteName = this.context.router.getCurrentPathname();
    return (
      <div className="main">
        <ReactTransitionGroup transitionName="fade">
        </ReactTransitionGroup>
        <Nav router={currentRouteName}>
          <LeftNav ref="leftNav" menuItems={menuItems} />
        </Nav>
        <div className="container">
          <RouteHandler />
          <StatusDialog />
        </div>
      </div>
    );
  }
});

module.exports = ReactUcenterWebpackApp;
