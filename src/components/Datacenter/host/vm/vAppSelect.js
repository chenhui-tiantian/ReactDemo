/**
 * Created by jiangrx on 15-12-15.
 */

const React = require('react');
const Table = require('material-ui/lib/table/table');
const TableBody = require('material-ui/lib/table/table-body');
const TableHeader = require('material-ui/lib/table/table-header');
const TableHeaderColumn = require('material-ui/lib/table/table-header-column');
const TableRow = require('material-ui/lib/table/table-row');
const TableRowColumn = require('material-ui/lib/table/table-row-column');
let ActionVAppSelect = require('../../../../actions/datacenter/vAppSelectAction');
let StoreVAppSelect = require('../../../../store/datacenter/vAppSelectStore');
let ActionVDC = require('../../../../actions/VDC/vdcAction');
let StoreVDC = require('../../../../store/VDC/vdcStore');

let vAppSelect = React.createClass({
  _selectedRow: 0,
  getInitialState(){
    return {
      vApps: []
    };
  },
  getDefaultProps(){
    return {
      enterpriseID: 1,
      dcID: 1,
      rackID: 0,
      hostID: 0,
      host: {},
      vm: {}
    };
  },

  componentWillMount() {
    StoreVAppSelect.addListVAppsSuccessListener(this.onVAppsFetched);
    StoreVDC.addChangedListener(this.onVDCFetched);
    console.log('mounted');
    ActionVDC.getVDCs({enterpriseID: this.props.enterpriseID});//TODO: Hardcoded enterpriseID
  },

  componentWillUnmount() {
    console.log('unmount');
    StoreVAppSelect.removeListVAppsSuccessListener(this.onVAppsFetched);
    StoreVDC.removeChangedListener(this.onVDCFetched);
  },

  _getData() {
    let index = this.state.vApps[this._selectedRow].links[1].href.lastIndexOf('/');
    let vdc = this.state.vApps[this._selectedRow].links[1].href.slice(index + 1);
    return {
      data: {vAppID: this.state.vApps[this._selectedRow].id, vdcID: vdc, vmLinks: this.props.vm.links},
      allSet: true
    };
  },

  onVDCFetched() {
    ActionVAppSelect.listVApps({
      dcID: this.props.dcID,
      rackID: this.props.rackID,
      hostID: this.props.hostID,
      hypervisorType: this.props.host.type
    });
    console.log('listvApp');
  },

  onVAppsFetched() {
    console.log(StoreVAppSelect.getVApps());
    this.setState({vApps: StoreVAppSelect.getVApps()});
  },

  onVAppSelect(selectedRow) {
    this._selectedRow = selectedRow[0];
  },

  renderList() {
    return <Table selectable={true} multiSelectable={false}
                  onRowSelection={this.onVAppSelect.bind(this)}>
      <TableHeader displaySelectAll={false}>
        <TableRow>
          <TableHeaderColumn>VDC</TableHeaderColumn>
          <TableHeaderColumn>Name</TableHeaderColumn>
          <TableHeaderColumn>State</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody deselectOnClickaway={false}>
        {this.state.vApps.map(function (vApp) {
          return (<TableRow>
            <TableRowColumn>{vApp.links[1].title}</TableRowColumn>
            <TableRowColumn>{vApp.name}</TableRowColumn>
            <TableRowColumn>{vApp.state}</TableRowColumn>
          </TableRow>);
        })}
      </TableBody>
    </Table>;
  },

  render() {
    return this.renderList();
  }
});
module.exports = vAppSelect;
