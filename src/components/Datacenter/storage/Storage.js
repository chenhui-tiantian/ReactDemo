'use strict';

var React = require('react');
let DeviceNav = require('./deviceNav');
let DataDisplay = require('./dataDisplay');

//const ActionStorage = require('../../../actions/datacenter/StorageAction');
const StoreStorage = require('../../../store/datacenter/StorageStore');
let StoreDataCenter = require('../../../store/datacenter/DataCenterStore');
require('./storage.css');
var Storage = React.createClass({
  getInitialState(){
    return {
      dcID: 0,
      deviceID: 0,
      poolID: 0
    };
  },
  componentWillMount(){
    StoreStorage.addUpdateBundleListener(this.onBundleUpdate);
    StoreDataCenter.addDataCenterListListener(this.onDCChange);
    this.setState({dcID: StoreDataCenter.getSelectedDataCenterID()});
  },
  componentWillUnmount(){
    StoreStorage.removeUpdateBundleListener(this.onBundleUpdate);
    StoreDataCenter.addDataCenterListListener(this.onDCChange);
  },
  onDCChange(){
    this.setState({dcID: StoreDataCenter.getSelectedDataCenterID(), deviceID: 0, poolID: 0});
  },
  onBundleUpdate(){
    console.log('update');
    this.setState({
      dcID: StoreStorage.getDCID(),
      deviceID: StoreStorage.getDeviceID(),
      poolID: StoreStorage.getPoolID()
    });
  },
  render () {
    console.log('pooID storage: ', this.state.poolID);
    return (
      <div className='storagePage'>
        <DeviceNav />
        <DataDisplay dcID={this.state.dcID} deviceID={this.state.deviceID} poolID={this.state.poolID}/>
      </div>
    );
  }
});

module.exports = Storage;
