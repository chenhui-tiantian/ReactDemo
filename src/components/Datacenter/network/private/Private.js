/**
 * Created by gtkrab on 15-11-23.
 */
'use strict';

let React = require('react');

let SearchBar = require('../../../common/SearchBar');
const ListDivider = require('material-ui/lib/lists/list-divider');
const Table = require('material-ui/lib/table/table');
const TableBody = require('material-ui/lib/table/table-body');
const TableHeader = require('material-ui/lib/table/table-header');
const TableHeaderColumn = require('material-ui/lib/table/table-header-column');
const TableRow = require('material-ui/lib/table/table-row');
const TableRowColumn = require('material-ui/lib/table/table-row-column');
let DisplayPrivateIPs = require('./DisplayPrivateIPs');
let DisplayInfo = require('../../../common/DisplayInfo');
const UniCloud = require('../../../../themes/unicloud');
const ThemeManager = require('material-ui/lib/styles/theme-manager');

const ActionNetwork = require('../../../../actions/datacenter/NetworkAction');
const StoreNetwork = require('../../../../store/datacenter/NetworkStore');
let StoreDataCenter = require('../../../../store/datacenter/DataCenterStore');
let injectTapEventPlugin = require('react-tap-event-plugin');
injectTapEventPlugin();
require('./private.css');

let Private = React.createClass({
  getInitialState() {
    return {
      networks: [],
      netInfo: {title: '网络详情', data: []},
      vdcID: 0,
      netID: 0,
      dcID: 0
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
  componentWillMount(){
    StoreNetwork.addNetworkPrivateListener(this.onNetworkFetched);
    StoreNetwork.addUpdateDCIDListener(this.onDCIDChanged);
    StoreNetwork.addUpdateNetInfoListener(this.onNetInfoFetched);
    StoreDataCenter.addDataCenterListListener(this.onDCChange);
  },
  componentDidMount(){
    this.setState({dcID: StoreDataCenter.getSelectedDataCenterID()});
  },
  componentWillUnmount(){
    StoreNetwork.removeUpdateDCIDListener(this.onDCIDChanged);
    StoreNetwork.removeNetworkPrivateListener(this.onNetworkFetched);
    StoreNetwork.removeUpdateNetInfoListener(this.onNetInfoFetched);
    StoreDataCenter.removeDataCenterListListener(this.onDCChange);
  },
  componentWillUpdate(nextProps, nextState){
    if (nextState.dcID !== this.state.dcID) {
      this.setState({
        networks: [],
        netInfo: {title: '网络详情', data: []},
        vdcID: 0,
        netID: 0
      });
      this.fetchNetworks(nextState.dcID);
    }
  },
  onDCChange(){
    this.setState({dcID: StoreDataCenter.getSelectedDataCenterID()});
  },
  onSubnetSelect(item){
    this.setState({vdcID: this.state.networks[item[0]].vdcID, netID: this.state.networks[item[0]].netID});
    ActionNetwork.updateNetInfo(this.state.networks[item[0]]);
  },
  onNetworkFetched(){
    this.setState({networks: StoreNetwork.getPrivateNetworks()});
  },
  onNetInfoFetched(){
    let netInfo = StoreNetwork.getNetInfo();
    console.log(netInfo);
    this.setState({
      netInfo: {
        title: '网络详情',
        data: [{
          label: '名称',
          text: netInfo.name
        }, {
          label: '网络掩码',
          text: netInfo.mask
        }, {
          label: '网关',
          text: netInfo.gateway
        }, {
          label: 'Tag',
          text: netInfo.tag
        }, {
          label: '首要DNS',
          text: netInfo.primaryDNS
        }, {
          label: '次要DNS',
          text: netInfo.secondaryDNS
        }, {
          label: 'DNS后缀',
          text: netInfo.sufixDNS
        }, {
          label: 'IPv6',
          text: netInfo.ipv6 ? '是' : '否'
        }]
      }
    });
  },

  onDCIDChanged(){
    StoreNetwork.getDCID();
    //this.setState({dcID: this.state.dcID}, this.fetchNetworks);
  },
  fetchNetworks(dcID){
    ActionNetwork.getAllPrivateNetworks(dcID);
  },
  onNetSearch(name){
    ActionNetwork.getPrivateNetworks({dcID: this.state.dcID, name: name});
  },
  renderNets(){
    return <Table
      fixedHeader={true}
      fixedFooter={false}
      selectable={true}
      multiSelectable={false}
      onRowSelection={this.onSubnetSelect}>
      <TableHeader enableSelectAll={false}
                   displaySelectAll={false}>
        <TableRow>
          <TableHeaderColumn key={0}>VDC</TableHeaderColumn>
          <TableHeaderColumn key={1}>Network</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody
        deselectOnClickaway={false}
        displayRowCheckbox={false}
        showRowHover={true}
        stripedRows={false}>
        {this.state.networks.map(function (net) {
          return (<TableRow key={net.key}>{net.row.map(function (col, index) {
            return (<TableRowColumn key={index}>{col.data}</TableRowColumn>);
          })}</TableRow>);
        })}
      </TableBody>
    </Table>;
  },

  render() {
    //TODO: Need to remake subnet table to show netsted list with vdcs->subnet
    //let netInfoRows = this._renderNetInfo();
    //console.log('state: ', this.state);
    return (
      <div className='networkPrivate'>
        <div className='vlan'>
          <div className='search'>
            <SearchBar searchHandler={this.onNetSearch}/>
          </div>
          <div className='data'>
            {this.renderNets()}
          </div>
          <DisplayInfo title={this.state.netInfo.title} data={this.state.netInfo.data}/>
        </div>
        <DisplayPrivateIPs dcID={this.state.dcID} vdcID={this.state.vdcID} netID={this.state.netID}/>
      </div>
    );
  }
});

module.exports = Private;
