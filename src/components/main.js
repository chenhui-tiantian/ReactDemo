'use strict';

var ReactUcenterWebpackApp = require('./ReactUcenterWebpackApp');
var Login = require('./login');
var React = require('react');
var ReactDom = require('react-dom');
var Router = require('react-router');
var Route = Router.Route;

//chen start 2015-11-19
var accountManage = require('./account/AccountManage');
// controllers
var dashboard = require('./Dashboard/dashboard');
var datacenter = require('./Datacenter/datacenter');
var appstore = require('./Appstore/appstore');
var Configurations = require('./configuration/Configurations');
var vdc = require('./Vdc/vdc');

require('../styles/main.css');
var content = document.getElementById('content');

var Routes = (
  <Route handler={ReactUcenterWebpackApp}>
    <Route name="/" handler={dashboard}/>
    <Route path="/datacenter" handler={datacenter} />
    <Route name="/virtualdatacenter" handler={vdc}/>
    <Route name="/appstore" handler={appstore}/>
    <Route name="login" path="login" handler={Login}/>
    <Route name="/accountManage" handler={accountManage}/>
    <Route name="/Configurations" handler={Configurations}/>
  </Route>
);


Router.run(Routes, function (Handler) {
  ReactDom.render(<Handler router={Route}/>, content);
});


