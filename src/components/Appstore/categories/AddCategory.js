/**
 * Created by jiangrx on 12/30/15.
 */

let React = require('react');
const Dialog = require('material-ui/lib/dialog');
import RaisedButton from 'material-ui/lib/raised-button';
var mui = require('material-ui');
const TextField = mui.TextField;
const Checkbox = mui.Checkbox;
var CategoryAction = require('../../../actions/appstore/categories/CategoryAction');
require('./AddCategory.css');
let AddCategory = React.createClass({
  getInitialState(){
    return {
      state: null
    };
  },
  onDialogSubmit(event){
    event.preventDefault();
    CategoryAction.addCategory({
      name: this.refs.categoryName.value,
      isGlobal: this.refs.isGlobal.isChecked(),
      erasable: true
    });
    this.props.onRequestClose();
  },

  render(){
    return <Dialog
      title="添加类别"
      open={this.props.open}
      actions={[<RaisedButton label='取消' secondary={true} onTouchTap={this.props.onRequestClose} />,
      <RaisedButton label='提交' primary={true} type='submit' form='addCategory'/>]}
      actionFocus="submit"
      autoDetectWindowHeight={true}
      autoScrollBodyContent={true}
      onRequestClose={this.props.onRequestClose}>
      <form className='addCategory' onSubmit={this.onDialogSubmit} id='addCategory'>
        <div className='entry'>
          <label className='entryLabel'>名称：</label>
          <input className='entryInput' ref='categoryName' required pattern='\w{3,}' />
        </div>
        <div className='entry'>
          <label className='entryLabel'>全局类:</label>
          <div className='entryInput'><Checkbox ref='isGlobal'/></div>
        </div>
      </form>
    </Dialog>;
  }
});
module.exports = AddCategory;
