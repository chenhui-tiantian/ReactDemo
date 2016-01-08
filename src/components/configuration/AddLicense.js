/**
 * Created by chenh on 2016/1/7.
 */


let React = require('react');
var mui = require('material-ui');
const TextField = mui.TextField;
const Checkbox = mui.Checkbox;
const FlatButton = mui.FlatButton;
const Dialog = mui.Dialog;

var ConfiguartionAction = require('../../actions/configuration/ConfiguartionAction');
require('./configuration.css');

let AddLicense = React.createClass({
  getInitialState(){
    return {
      state: null
    };
  },
  onDialogSubmit(event){
    ConfiguartionAction.addLicense(this.refs.licenseCode.value);
    this.props.onRequestClose();
  },
  render(){
    return <Dialog
      title="添加许可证密钥"
      open={this.props.open}
      mode={true}
      actions={
      [<FlatButton label='取消'  onTouchTap={this.props.onRequestClose}/>,
      <FlatButton label='提交'  onTouchTap={this.onDialogSubmit}/>]
      }
      actionFocus="submit"
      onRequestClose={this.props.onRequestClose}>
      <div>
        <label >许可证密钥：</label>
        <textarea  ref='licenseCode' rows='9'/>
      </div>
    </Dialog>;
  }
});
module.exports = AddLicense;
