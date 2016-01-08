
const Table = require('material-ui/lib/table/table');
const TableBody = require('material-ui/lib/table/table-body');
const TableFooter = require('material-ui/lib/table/table-footer');
const TableHeader = require('material-ui/lib/table/table-header');
const TableHeaderColumn = require('material-ui/lib/table/table-header-column');
const TableRow = require('material-ui/lib/table/table-row');
const TableRowColumn = require('material-ui/lib/table/table-row-column');

let React = require('react');

let DataTables = React.createClass({
  getInitialState() {
    return {
      headers: [],
      data: [],
      fixedHeader: true,
      fixedFooter: true,
      stripedRows: false,
      showRowHover: false,
      selectable: true,
      multiSelectable: false,
      enableSelectAll: false,
      deselectOnClickaway: true
    };
  },
  componentWillMount(){
    this.setState({
      'headers': [{key: 'ID'}, {key: 'Data'}, {key: 'LOC'}],
      'data': [
        {
          'row': [
            {'data': 1},
            {'data': 'Western'},
            {'data': 'Rack1'}
          ],
          'key': 1
        },
        {
          'row': [
            {'data': 2},
            {'data': 'Seagate'},
            {'data': 'Rack2'}
          ],
          'key': 2
        },
        {
          'row': [
            {'data': 3},
            {'data': 'EMC'},
            {'data': 'Rack2'}
          ],
          'key': 3
        }
      ]
    });
  },
  render(){
    return (
      <div>
        <Table
          fixedHeader={this.state.fixedHeader}
          fixedFooter={this.state.fixedFooter}
          selectable={this.state.selectable}
          multiSelectable={this.state.multiSelectable}
          onRowSelection={this._onRowSelection}>
          <TableHeader enableSelectAll={this.state.enableSelectAll}>
            <TableRow>
              {this.state.headers.map(function (header) {
                return (<TableHeaderColumn key={header.key}>{header.key}</TableHeaderColumn>);
              })}
            </TableRow>
          </TableHeader>
          <TableBody
            deselectOnClickaway={this.state.deselectOnClickaway}
            showRowHover={this.state.showRowHover}
            stripedRows={this.state.stripedRows}>
            {this.state.data.map(function (row) {
              return (<TableRow key={row.key}>{row.row.map(function (col) {
                return (<TableRowColumn key={col.data}>{col.data}</TableRowColumn>);
              })}</TableRow>);
            })}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableRowColumn>ID</TableRowColumn>
              <TableRowColumn>Name</TableRowColumn>
              <TableRowColumn>Status</TableRowColumn>
            </TableRow>
          </TableFooter>
        </Table>
        <div>bluoblo</div>
      </div>
    );
  }
});

module.exports = DataTables;
