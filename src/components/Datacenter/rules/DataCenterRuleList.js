/**
 * Created by chenh on 2015/12/4.
 */
const Table = require('material-ui/lib/table/table');
const TableBody = require('material-ui/lib/table/table-body');
const TableHeader = require('material-ui/lib/table/table-header');
const TableHeaderColumn = require('material-ui/lib/table/table-header-column');
const TableRow = require('material-ui/lib/table/table-row');

var React = require('react');
var DataCenterRuleRow = require('./DataCenterRuleRow');


var DataCenterRuleList = React.createClass({
    render: function () {
        var tables = [];
        this.props.datacenterrules.forEach(
            function (dataCenterRule) {
                tables.push( <DataCenterRuleRow  globalrule = {dataCenterRule} key= {dataCenterRule.id} />);
    });
return (
    <div>
    <Table>
    <TableHeader>
    <TableRow>
    <TableHeaderColumn >ID</TableHeaderColumn>
    <TableHeaderColumn >Status</TableHeaderColumn>
    </TableRow>
    </TableHeader>

    <TableBody>{tables}</TableBody>
    </Table>
    </div>
);
}
});
module.exports = DataCenterRuleList;
