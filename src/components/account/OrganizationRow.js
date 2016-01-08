/**
 * Created by chenh on 2015/11/24.
 */
var React = require('react');
const ListItem = require('material-ui/lib/lists/list-item');
var AccountAction = require('../../actions/account/AccountAction');

var OrganizeRow = React.createClass({

  _deleteAccountByID: function () {
    AccountAction.deleteAccountByID(this.props.organize.id);
  },
  render: function () {
    return (
      < ListItem primaryText={this.props.organize.name} />
    );
  }
});

module.exports = OrganizeRow;
