/**
 * Created by lenovo on 2015/12/4.
 */
/**
 * Created by chenh on 2015/12/3.
 */
const TableRow = require('material-ui/lib/table/table-row');
const TableRowColumn = require('material-ui/lib/table/table-row-column');

var React = require('react');

var DataCenterRuleRow = React.createClass({
    render: function(){
        return <TableRow>
                    <TableRowColumn>1</TableRowColumn>
                    <TableRowColumn>Employed</TableRowColumn>
                </TableRow>;
    }
});

module.exports = DataCenterRuleRow;