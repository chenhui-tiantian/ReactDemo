/**
 * Created by gtkrab on 15-11-25.
 */
'use strict';
let React = require('react');
const ListItem = require('material-ui/lib/lists/list-item');

let ListRow = React.createClass({
  getDefaultProps: function () {
    return {
      item: {},
      onTouchEvent: null
    };
  },
  onTouch: function (event) {
    if (this.props.onTouchEvent != null) {
      return this.props.onTouchEvent(event, this.props.item);
    }
  },
  render: function () {
    return (
      <ListItem {...this.props} {...this.state} onTouchTap={this.onTouch}/>
    );
  }
});
module.exports = ListRow;
