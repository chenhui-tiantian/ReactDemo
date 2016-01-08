'use strict';

var React = require('react');
//var mui = require('material-ui');
var Tabs = require('react-simpletabs');

var OverView = require('./OverView'); // 概览
var Machine = require('./Machine'); // 主机
var Network = require('./network/Network');// 网络
var Storage = require('./storage/Storage');// 存储
var Rules = require('./Rules'); //分配策略
//var Cluster = require('./Cluster'); //集群文件系统
//var Backup = require('./Backup'); //备份配置

const UniCloud = require('../../themes/unicloud');
const ThemeManager = require('material-ui/lib/styles/theme-manager');
var DataCenterManage = require('./datacenter/DataCenterManage');

require('./datacenter.css');
require('../../styles/common.css');
//
//var StoreDataCenter = require('../../store/datacenter/DataCenterStore');
//var DataCenterAction = require('../../actions/datacenter/DataCenterAction');

var Datacenter = React.createClass({
  getInitialState(){
    return {
      tabsValue: null,
      dcID: 0
    };
  },
  //componentWillMount(){
  //  StoreDataCenter.addDataCenterListListener(this.getDCID);
  //},
  //componentWillUnmount(){
  //  StoreDataCenter.removeDataCenterListListener(this.getDCID);
  //},
  //getDCID(){
  //  this.setState({dcID: StoreDataCenter.getSelectedDataCenterID()});
  //},
  render: function() {
    console.log('triggered render');
    return (
      <div className='datacenterOverView'>
        <div className='datacentermanage'>
        <DataCenterManage />
        </div>

        <div className='datacentercontainer'>
          <Tabs>
            <Tabs.Panel title='概览'>
              <OverView />
            </Tabs.Panel>
            <Tabs.Panel title='主机'>
              <Machine dcID={this.state.dcID}/>
            </Tabs.Panel>
            <Tabs.Panel title='网络'>
              <Network />
            </Tabs.Panel>
            <Tabs.Panel title='存储'>
              <Storage />
            </Tabs.Panel>
            <Tabs.Panel title='分配策略'>
              <Rules />
            </Tabs.Panel>
          </Tabs>
        </div>

      </div>
    );
  }
});

module.exports = Datacenter;
