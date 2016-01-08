/**
 * Created by Administrator on 2015/12/17 0017.
 */
let React = require('react');
const Dialog = require('material-ui/lib/dialog');
let deleteDialog = React.createClass({
  render() {

    return (
        <Dialog
          modal = {true}
          actions={[<FlatButton
          label="取消"
          secondary={true}
          onTouchTap={this.props.onRequestClose}/>,
          <FlatButton
            label="确定"
            primary={true}
            onTouchTap={this.onFinish.bind(this)}/>]}
          onRequestClose={this.props.onRequestClose}>
        </Dialog>
    );
  }
});

module.exports = deleteDialog;
