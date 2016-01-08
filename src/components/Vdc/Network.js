'use strict';

var React = require('react');
let Private = require('./Network/Private');
const DropDownMenu = require('material-ui/lib/drop-down-menu');
let ControlButtons = require('../common/ControlButtons');
let SearchBar = require('../common/SearchBar');

let menuItems = [
  {payload: 0, text: 'LAN IP'},
  {payload: 1, text: 'WAN IP'},
  {payload: 2, text: 'Public IP'},
  {payload: 3, text: 'Firewall'}
];
var Network = React.createClass({
  getInitialState(){
    return {
      vdcID: 6
    };
  },
  render () {
    return (
      <div className='row'>
        <div className='col-12'>
          <div className='row'>
            <div className='col-3'>
              <DropDownMenu menuItems={menuItems}></DropDownMenu>
            </div>
            <div className='col-9'>
              <div className='row'>
                <div className='col-5'>
                  <ControlButtons
                    addButtonHandler={this.addHandler}
                    editButtonHandler={this.editHandler}
                    delButtonHandler={this.delHandler}
                  />
                </div>
                <div className='col-7'>
                  <SearchBar />
                </div>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-12'>
              <Private />
            </div>
          </div>
        </div>
      </div>
    );
  }
});


module.exports = Network;
