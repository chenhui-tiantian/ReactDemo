/**
 * Created by chenh on 2015/12/28.
 */
var React = require('react');
const List = require('material-ui/lib/lists/list');
var RoleRow = require('./RoleRow');

var RoleList = React.createClass({
  render: function () {
    var rows = [];
    this.props.roles.forEach(
      function (role) {
        rows.push( <RoleRow role = {role} key= {role.id} />);
      });
    return (<List>{rows}</List>);
  }
});
module.exports = RoleList;
