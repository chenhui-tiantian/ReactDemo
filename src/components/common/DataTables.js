/**
 * Created by gtkrab on 15-11-17.
 */
const Table = require('material-ui/lib/table/table');
const TableBody = require('material-ui/lib/table/table-body');
const TableHeader = require('material-ui/lib/table/table-header');
const TableHeaderColumn = require('material-ui/lib/table/table-header-column');
const TableRow = require('material-ui/lib/table/table-row');
const TableRowColumn = require('material-ui/lib/table/table-row-column');

let React = require('react');

let DataTables = React.createClass({
  getDefaultProps() {
    return {
      headers: [],
      data: [],
      fixedHeader: true,
      fixedFooter: false,
      stripedRows: false,
      showRowHover: false,
      selectable: true,
      multiSelectable: false,
      enableSelectAll: false,
      deselectOnClickaway: true,
      onRowSelect: null
    };
  },
  getInitialState(){
    return {
      headers: [{key: 'ID'}, {key: 'Data'}, {key: 'LOC'}],
      data: [{
        'row': [
          {'data': 1},
          {'data': 'Western'},
          {'data': 'Rack1'}
        ],
        'key': 1
      }]
    };
  },
  componentWillMount(){
    this.setState({
      headers: this.props.headers,
      data: this.props.data
    });
  },
  render(){
    return (
      <div>
        <Table
          fixedHeader={this.props.fixedHeader}
          fixedFooter={this.props.fixedFooter}
          selectable={this.props.selectable}
          multiSelectable={this.props.multiSelectable}
          onRowSelection={this.props.onRowSelecn}>
          <TableHeader enableSelectAll={this.props.enableSelectAll}>
            <TableRow>
              {this.state.headers.map(function (header) {
                return (<TableHeaderColumn key={header.key}>{header.key}</TableHeaderColumn>);
              })}
            </TableRow>
          </TableHeader>
          <TableBody
            deselectOnClickaway={this.props.deselectOnClickaway}
            showRowHover={this.props.showRowHover}
            stripedRows={this.props.stripedRows}>
            {this.state.data.map(function (row) {
              return (<TableRow key={row.key}>{row.row.map(function (col, index) {
                return (<TableRowColumn key={index}>{col.data}</TableRowColumn>);
              })}</TableRow>);
            })}
          </TableBody>
        </Table>
      </div>
    );
  }
});

module.exports = DataTables;
