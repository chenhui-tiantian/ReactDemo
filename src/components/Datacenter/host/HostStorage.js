/**
 * Created by jiangrx on 15-12-11.
 */
const React = require('react');
const Table = require('material-ui/lib/table/table');
const TableBody = require('material-ui/lib/table/table-body');
const TableHeader = require('material-ui/lib/table/table-header');
const TableHeaderColumn = require('material-ui/lib/table/table-header-column');
const TableRow = require('material-ui/lib/table/table-row');
const TableRowColumn = require('material-ui/lib/table/table-row-column');
let ActionHost = require('../../../actions/datacenter/HostAction');
let StoreHost = require('../../../store/datacenter/HostStore');
let injectTapEventPlugin = require('react-tap-event-plugin');
injectTapEventPlugin();

class HostStorage extends React.Component {
  constructor(props) {
    super(props);
  }

  onStorageSelect(selectedRows) {
    ActionHost.storageSelectionChange(selectedRows);
  }

  _getData() {
    let data = this.props.host;
    let selections = StoreHost.getStorageSelection();
    if (selections === 'all') {
      for (let i = 0; i < data.collection.length; i++) {
        data.collection[i].enabled = true;
      }
    } else {
      for (let i = 0; i < data.collection.length; i++) {
        data.collection[i].enabled = false;
      }
      selections.map(function (select) {
        data.collection[select].enabled = true;
      });
    }
    return {data: data, allSet: true};
  }


  renderStorage() {
    let ret = [];
    let storages = this.props.host.collection;
    for (let i = 0; i < storages.length; i++) {
      let size = '';
      if (storages[i].size <= 1024) {
        size = storages[i].size + ' B';
      } else if (storages[i].size <= (1024 * 1024)) {
        size = storages[i].size / 1024 + ' KB';
      } else if (storages[i].size <= (1024 * 1024 * 1024)) {
        size = storages[i].size / 1024 / 1024 + ' MB';
      } else {
        size = storages[i].size / 1024 / 1024 / 1024 + ' GB';
      }
      let usedSize = '';
      if (storages[i].usedSize <= 1024) {
        usedSize = storages[i].usedSize + ' B';
      } else if (storages[i].usedSize <= (1024 * 1024)) {
        usedSize = storages[i].usedSize / 1024 + ' KB';
      } else if (storages[i].usedSize <= (1024 * 1024 * 1024)) {
        usedSize = storages[i].usedSize / 1024 / 1024 + ' MB';
      } else {
        usedSize = storages[i].usedSize / 1024 / 1024 / 1024 + ' GB';
      }
      let maintenanceMode = '';
      if (storages[i].isShare && (!storages[i].maintenance)) {
        maintenanceMode = 'Enter Maintenance Mode';
      }
      ret.push(<TableRow selected={storages[i].enabled}>
        <TableRowColumn>{storages[i].rootPath}</TableRowColumn>
        <TableRowColumn>{storages[i].directory}</TableRowColumn>
        <TableRowColumn>{size}</TableRowColumn>
        <TableRowColumn>{usedSize}</TableRowColumn>
        <TableRowColumn>{maintenanceMode}</TableRowColumn>
      </TableRow>);
    }
    return <Table selectable={true} multiSelectable={true}
                  onRowSelection={this.onStorageSelect.bind(this)}>
      <TableHeader displaySelectAll={false}>
        <TableRow>
          <TableHeaderColumn>Enabled</TableHeaderColumn>
          <TableHeaderColumn>Root</TableHeaderColumn>
          <TableHeaderColumn>Dir</TableHeaderColumn>
          <TableHeaderColumn>Capacity</TableHeaderColumn>
          <TableHeaderColumn>Used</TableHeaderColumn>
          <TableHeaderColumn>Maintenance</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody deselectOnClickaway={false}>
        {ret}
      </TableBody>
    </Table>;
  }

  render() {
    return this.renderStorage();
  }
}
HostStorage.defaultProps = {
  dcID: 1,
  rackID: 0,
  host: {}
};

module.exports = HostStorage;
