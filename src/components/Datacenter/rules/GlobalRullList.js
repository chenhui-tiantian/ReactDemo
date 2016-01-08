/**
 * Created by chenh on 2015/12/4.
 */

var React = require('react');
const List = require('material-ui/lib/lists/list');
var GlobalRuleRow = require('./GlobalRuleRow');


var GlobalRullList = React.createClass({
  render: function () {
    var rows = [];
    if (this.props.globalrules !== null) {
      this.props.globalrules.forEach(
        function (globalrule) {

          rows.push(< GlobalRuleRow
            globalrule={globalrule}
            key={globalrule.id}/>);
        }
      );
    }
    return (
      <List>
        {rows}
      </List>
    );
  }
});
module.exports = GlobalRullList;
