'use strict';

var React = require('react');
//var mui = require('material-ui');
var Router = require('react-router');
var Link = Router.Link;
var PrivilgeStore = require('../store/PrivilegeStore');
var p = PrivilgeStore.p;

require('../styles/nav.css');

var Nav = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getInitialState() {
    return {
      p: p
    };
  },
  componentDidMount() {
    var self = this;
    PrivilgeStore.on('change', function () {
      self.setState({
        p: p
      });
    });
  },
  render: function() {
    var Route = this.props.router;
    return (
      <div className="nav">
        <ul>
          <li className={Route === '/' ? 'active' : ''}>
            <Link to='/'>
              <i className="material-icons">home</i>
            </Link>
          </li>
          {p('PHYS_DC_ENUMERATE') ?
          <li className={Route === '/datacenter' ? 'active' : ''}>
            <Link to='/datacenter'>
              <i className="material-icons">developer_board</i>
            </Link>
          </li>
            : null }
          <li className={Route === '/virtualDatacenter' ? 'active' : ''}>
            <Link to='/'>
            <i className="material-icons">cloud_circle</i>
            </Link>
            </li>
          <li className={Route === '/appstore' ? 'active' : ''}>
            <Link to='/appstore'>
              <i className="material-icons">book</i>
            </Link>
          </li>
          <li className={Route === '/users' ? 'active' : ''}>
            <Link to='/accountManage'>
              <i className="material-icons">account_circle</i>
            </Link>
          </li>
          <li className={Route === '/configs' ? 'active' : ''}>
            <Link to='/configs'>
              <i className="material-icons">settings</i>
            </Link>
          </li>

          <li className={Route === '/configs' ? 'active' : ''}>
            <Link to='/Configurations'>
              <i className="material-icons">lock_open</i>
            </Link>
          </li>


          <li className={Route === '/configs' ? 'active' : ''}>
            <Link to='/accountManage'>
            <i className="material-icons">settings</i>
            </Link>
          </li>


        </ul>
      </div>
    );
  }
});

module.exports = Nav;
