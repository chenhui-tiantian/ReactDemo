'use strict';

var React = require('react');
var EnterpriseStore = require('../../store/EnterpriseStore');
var TotalUsageStore = require('../../store/datacenter/TotalUsageStore');
var DataCenterAction = require('../../actions/datacenter/DataCenterAction');
var UsedChart = require('../common/UsedChart');
//
require('../../styles/main.css');

function getTotalUsage() {
  var dataCenterUsage = TotalUsageStore.getTotalUsage() || null;
  return {
    total: {
      numEnterprise: dataCenterUsage.numEnterprisesCreated,
      numUser: dataCenterUsage.numUsersCreated,
      numVdc: dataCenterUsage.numVdcCreated
    },
    hostDis: {
      title: '主机（台）',
      totalTxt: '共',
      totalValue: dataCenterUsage.serversTotal,
      useTxt: '已占用',
      useValue: dataCenterUsage.serversRunning
    },
    storageReserved: {
      title: '外部存储 (T)',
      totalTxt: '共',
      totalValue: parseFloat((dataCenterUsage.storageReservedInMb / (1024 * 1024)).toFixed(1)),
      useTxt: '已占用',
      useValue: parseFloat((dataCenterUsage.storageUsed / (1024 * 1024)).toFixed(1))
    },
    publicIPs: {
      title: '公有IP',
      totalTxt: '共',
      totalValue: dataCenterUsage.publicIPsTotal,
      useTxt: '已占用',
      useValue: dataCenterUsage.publicIPsUsed
    },
    repositoryUsed: {
      title: '模板',
      totalTxt: '共',
      totalValue: dataCenterUsage.repositoryReservedInMb,
      useTxt: '已占用',
      useValue: dataCenterUsage.repositoryUsedInMb
    },
    virtualMachines: {
      title: '虚拟机（台）',
      totalTxt: '共',
      totalValue: dataCenterUsage.virtualMachinesTotal,
      useTxt: '已运行',
      useValue: dataCenterUsage.virtualMachinesRunning
    },
    virtualCpu: {
      title: '虚拟CPU（核）',
      totalTxt: '共',
      totalValue: dataCenterUsage.virtualCpuTotal,
      useTxt: '已占用',
      useValue: dataCenterUsage.virtualCpuUsed
    },
    virtualStorage: {
      title: '虚拟存储（G）',
      totalTxt: '共',
      totalValue: parseFloat((dataCenterUsage.virtualStorageTotal / (1024 * 1024)).toFixed(1)),
      useTxt: '已占用',
      useValue: parseFloat((dataCenterUsage.virtualStorageUsed / (1024 * 1024)).toFixed(1))
    },
    virtualMemory: {
      title: '虚拟内存（G）',
      totalTxt: '共',
      totalValue: parseFloat((dataCenterUsage.virtualMemoryTotal / 1024).toFixed(1)),
      useTxt: '已占用',
      useValue: parseFloat((dataCenterUsage.virtualMemoryUsed / 1024).toFixed(1))
    }
  };
}
var Dashboard = React.createClass({
  getInitialState: function () {
    return getTotalUsage();
  },
  componentDidMount(){
    TotalUsageStore.addTotalUsageListener(this._onChange);
    DataCenterAction.searchTotalUsage();
  },

  componentWillUnmount(){
    TotalUsageStore.removeTotalUsageListener(this._onChange);
  },

  _onChange()
  {
    this.setState(getTotalUsage());
  },

  render: function () {
    return (
      <div className="dashboardChart">
        <div className="totalDiscribe">总资源</div>
        <div>
          <div className="totalNum">
            <div className="totalViewDetail">
              <div className="discribe">
                虚拟组织数量:  {this.state.total.numEnterprise}
              </div>

            </div>
            <div className="totalViewDetail">
              <div className="discribe">
                用户数量:  {this.state.total.numUser}
              </div>

            </div>
            <div className="totalViewDetail">
              <div className="discribe">
                虚拟数据中心数量:  {this.state.total.numVdc}
              </div>

            </div>

          </div>
          <div className="chart">
          <UsedChart dataCenterUsage={this.state.hostDis}/>
          <UsedChart dataCenterUsage={this.state.storageReserved}/>
          <UsedChart dataCenterUsage={this.state.publicIPs}/>
          <UsedChart dataCenterUsage={this.state.repositoryUsed}/>
          <UsedChart dataCenterUsage={this.state.virtualMachines}/>
          <UsedChart dataCenterUsage={this.state.virtualCpu}/>
          <UsedChart dataCenterUsage={this.state.virtualStorage}/>
          <UsedChart dataCenterUsage={this.state.virtualMemory}/>
        </div>
        </div>
      </div>
    );
  }
});

module.exports = Dashboard;
