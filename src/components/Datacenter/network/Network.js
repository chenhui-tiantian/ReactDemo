'use strict';

var React = require('react');
let Private = require('./private/Private');
const DropDownMenu = require('material-ui/lib/drop-down-menu');

const UniCloud = require('../../../themes/unicloud');
const ThemeManager = require('material-ui/lib/styles/theme-manager');
require('./network.css');
let menuItems = [
  {payload: 0, text: '私有网络'},
  {payload: 1, text: '外部网络'},
  {payload: 2, text: '公有网络'},
  {payload: 3, text: '防火墙'}
];
var Network = React.createClass({
  getInitialState(){
    return {
      vdcID: 6
    };
  },
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext() {
    return {
      muiTheme: ThemeManager.getMuiTheme(UniCloud)
    };
  },
  render () {
    return (
      <div className='networkPage'>
            <div className='dropDownMenu'>
                <DropDownMenu menuItems={menuItems} />
            </div>
            <div className='networkContent'>
                <Private />
            </div>
      </div>
    );
  }
});


module.exports = Network;
