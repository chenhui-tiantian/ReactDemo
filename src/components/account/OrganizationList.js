/**
 * Created by chenhui on 2015/11/24.
 */
var React = require('react');
const List = require('material-ui/lib/lists/list');
var OrganizationRow = require('./OrganizationRow');

var OrganizationList = React.createClass({
  render: function () {
    var rows = [];
    this.props.organizes.forEach(
      function (organize) {
        rows.push( <OrganizationRow organize = {organize} key= {organize.id} />);
  });
  return (<List>{rows}</List>);
}
});
module.exports = OrganizationList;
