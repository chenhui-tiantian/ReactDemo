'use strict';

var React = require('react');
var UsedChart = require('../common/UsedChart');

var DataCenterUsageStore = require('../../store/datacenter/DataCenterUsageStore');
var DataCenterStore = require('../../store/datacenter/DataCenterStore');
var DataCenterAction = require('../../actions/datacenter/DataCenterAction');

require('./datacenter.css')
function getDataCenterUsage() {

  var dataCenterUsage = DataCenterUsageStore.getDataCenterUsage() || null;

  return {
    host: {
      title: '主机（台）',
      totalTxt: '共',
      totalValue: dataCenterUsage.serversTotal || 0,
      useTxt: '已占用',
      useValue: dataCenterUsage.serversRunning || 0
    },
    storageReserved: {
      title: '外部存储 (T)',
      totalTxt: '共',
      totalValue: parseFloat((dataCenterUsage.storageReservedInMb / (1024 * 1024)).toFixed(1)) || 0,
      useTxt: '已占用',
      useValue: parseFloat((dataCenterUsage.storageUsed / (1024 * 1024)).toFixed(1)) || 0
    },
    publicIPs: {
      title: '公有IP',
      totalTxt: '共',
      totalValue: dataCenterUsage.publicIPsTotal || 0,
      useTxt: '已占用',
      useValue: dataCenterUsage.publicIPsUsed || 0
    },
    repositoryUsed: {
      title: '模板',
      totalTxt: '共',
      totalValue: dataCenterUsage.repositoryReservedInMb || 0,
      useTxt: '已占用',
      useValue: dataCenterUsage.repositoryUsedInMb || 0
    },
    virtualMachines: {
      title: '虚拟机（台）',
      totalTxt: '共',
      totalValue: dataCenterUsage.virtualMachinesTotal || 0,
      useTxt: '已运行',
      useValue: dataCenterUsage.virtualMachinesRunning || 0
    },
    virtualCpu: {
      title: '虚拟CPU（核）',
      totalTxt: '共',
      totalValue: dataCenterUsage.virtualCpuTotal || 0,
      useTxt: '已占用',
      useValue: dataCenterUsage.virtualCpuUsed || 0
    },
    virtualStorage: {
      title: '虚拟存储（T）',
      totalTxt: '共',
      totalValue: parseFloat((dataCenterUsage.virtualStorageTotal / (1024 * 1024)).toFixed(1)) || 0,
      useTxt: '已占用',
      useValue: parseFloat((dataCenterUsage.virtualStorageUsed / (1024 * 1024)).toFixed(1)) || 0
    },
    virtualMemory: {
      title: '虚拟内存（G）',
      totalTxt: '共',
      totalValue: parseFloat((dataCenterUsage.virtualMemoryTotal / 1024).toFixed(1)) || 0,
      useTxt: '已占用',
      useValue: parseFloat((dataCenterUsage.virtualMemoryUsed / 1024).toFixed(1)) || 0
    }
  };
}


let Overview = React.createClass({
  getInitialState: function () {
    return getDataCenterUsage();
  },

  componentDidMount(){
    DataCenterStore.addDataCenterListListener(this._onChangeDataCenter);
    DataCenterUsageStore.addDataCenterUsageListener(this._onChangeUsage);
    DataCenterAction.searchDataCenterUsageByID(DataCenterStore.getSelectedDataCenterID());
  },

  componentWillUnmount(){
    DataCenterStore.removeDataCenterListListener(this._onChangeDataCenter);
    DataCenterUsageStore.removeDataCenterUsageListener(this._onChangeUsage);
  },
  _onChangeDataCenter(){
    DataCenterAction.searchDataCenterUsageByID(DataCenterStore.getSelectedDataCenterID());
  },
  _onChangeUsage(){
    this.setState(getDataCenterUsage());
  },
  render() {
    return (
      <div className= "overview">
        <UsedChart dataCenterUsage={this.state.host}/>
        <UsedChart dataCenterUsage={this.state.storageReserved}/>
        <UsedChart dataCenterUsage={this.state.publicIPs}/>
        <UsedChart dataCenterUsage={this.state.repositoryUsed}/>
        <UsedChart dataCenterUsage={this.state.virtualMachines}/>
        <UsedChart dataCenterUsage={this.state.virtualCpu}/>
        <UsedChart dataCenterUsage={this.state.virtualStorage}/>
        <UsedChart dataCenterUsage={this.state.virtualMemory}/>
      </div>
    );
  }
});
module.exports = Overview;
