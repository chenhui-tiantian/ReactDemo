'use strict';

var React = require('react');
let ThemeManager = require('material-ui/lib/styles/theme-manager');
let unicloudTheme = require('../../themes/unicloud');
const Tabs = require('material-ui/lib/tabs/tabs');
const Tab = require('material-ui/lib/tabs/tab');
var OverView = require('./OverView');
var Network = require('./Network');
var Storage = require('./Storage');
var Template = require('./Template');
let MenuBar = require('../common/MenuBar');

require('./common/vdc.css');

var VDC = React.createClass({
  getInitialState() {
    return {
      muiTheme: ThemeManager.getMuiTheme(unicloudTheme),
      menuItems: [],
      tabsValue: 'a',
      slideIndex: 0,
      vdcID: 6
    };
  },
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getChildContext() {
    return {
      muiTheme: ThemeManager.getMuiTheme(unicloudTheme)
    };
  },

  render: function () {
    return (
      <div className="row">
        <div className="col-2">
          <MenuBar />
        </div>
        <div className="col-10 ">
          <div className='row'>
            <div className='col-12'>
              <Tabs tabItemContainerStyle={{height: 30}}>
                <Tab label="总览" value="0" style={{height: 30}}>
                  <OverView/>
                </Tab>
                <Tab label="vApp" value="1" style={{height: 30}}>vApp</Tab>
                <Tab label="网络" value="2" style={{height: 30}}>
                  <Network />
                </Tab>
                <Tab label="存储" value="3" style={{height: 30}}>
                  <Storage />
                </Tab>
                <Tab label="模板" value="4" style={{height: 30}}>
                  <Template />
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = VDC;
