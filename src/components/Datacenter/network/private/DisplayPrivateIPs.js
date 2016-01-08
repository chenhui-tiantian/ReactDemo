/**
 * Created by jiangrx on 12/17/15.
 */

const React = require('react');
let SearchBar = require('../../../common/SearchBar');
const Table = require('material-ui/lib/table/table');
const TableBody = require('material-ui/lib/table/table-body');
const TableHeader = require('material-ui/lib/table/table-header');
const TableHeaderColumn = require('material-ui/lib/table/table-header-column');
const TableRow = require('material-ui/lib/table/table-row');
const TableRowColumn = require('material-ui/lib/table/table-row-column');
const ActionNetwork = require('../../../../actions/datacenter/NetworkAction');
const StoreNetwork = require('../../../../store/datacenter/NetworkStore');
let Pager = require('../../../common/CustomPage');
const UniCloud = require('../../../../themes/unicloud');
const ThemeManager = require('material-ui/lib/styles/theme-manager');


let DisplayIPs = React.createClass({
  getInitialState(){
    return {
      currentPage: 1,
      totalSize: 1,
      ips: []
    };
  },

  getDefaultProps(){
    return {
      dcID: 0,
      vdcID: 0,
      netID: 0,
      pagerMaxSize: 5,
      itemsPerPage: 10
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

  componentWillMount() {
    StoreNetwork.addNetworkPrivateIPSListener(this.onIPsFetched);
  },

  componentWillReceiveProps(nextProps) {
    if (((nextProps.vdcID !== this.props.vdcID) ||
      (nextProps.netID !== this.props.netID))) {
      this.setState({
        currentPage: 1,
        totalSize: 1,
        ips: []
      });
      if ((nextProps.vdcID !== 0) && (nextProps.netID !== 0)) {
        ActionNetwork.getPrivateIPs({vdcID: nextProps.vdcID, netID: nextProps.netID});
      }
    }
  },

  componentWillUnmount() {
    StoreNetwork.removeNetworkPrivateIPSListener(this.onIPsFetched);
  },

  onIPsFetched() {
    this._search.clearSearch();
    this.setState({ips: StoreNetwork.getIPs(), totalSize: StoreNetwork.getPrivateIPsTotalSize()});
  },

  onIPSearch(name) {
    ActionNetwork.getPrivateIPs({vdcID: this.props.vdcID, netID: this.props.netID, name: name});
    this.setState({currentPage: 1});
  },

  onPageClick(maxSize, currentPage, limit, startwith, totalSize) {
    ActionNetwork.getPrivateIPs({
      vdcID: this.props.vdcID,
      netID: this.props.netID,
      start: startwith,
      limit: limit,
      name: this._search.state.searchText
    });
    this.setState({currentPage: currentPage});
  },
  renderIPs(){
    return <Table
      height='100%'
      fixedHeader={true}
      fixedFooter={false}
      selectable={true}
      multiSelectable={false}>
      <TableHeader enableSelectAll={false}
                   displaySelectAll={false}>
        <TableRow>
          <TableHeaderColumn key={0}>IP</TableHeaderColumn>
          <TableHeaderColumn key={1}>Mac</TableHeaderColumn>
          <TableHeaderColumn key={2}>VLAN</TableHeaderColumn>
          <TableHeaderColumn key={3}>vApp</TableHeaderColumn>
          <TableHeaderColumn key={4}>VM</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody
        deselectOnClickaway={true}
        displayRowCheckbox={false}
        showRowHover={true}
        stripedRows={false}>
        {this.state.ips.map(function (ip) {
          return (<TableRow key={ip.key}>{ip.row.map(function (col, index) {
            return (<TableRowColumn key={index}>{col.data}</TableRowColumn>);
          })}</TableRow>);
        })}
      </TableBody>
    </Table>;
  },

  render() {
    return <div className='ips'>
      <h5>ip</h5>
      <div className='search'>
        <SearchBar ref={(ref) => this._search = ref} searchHandler={this.onIPSearch}/>
      </div>
      <div className='data'>
        {this.renderIPs()}
      </div>
      <div className='pagination'>
        <div className='center'>
          <Pager maxSize={this.props.pagerMaxSize}
                 currentPage={this.state.currentPage}
                 limit={this.props.itemsPerPage}
                 totalSize={this.state.totalSize}
                 searchClick={this.onPageClick}/>
        </div>
      </div>
    </div>;
  }
});
module.exports = DisplayIPs;
