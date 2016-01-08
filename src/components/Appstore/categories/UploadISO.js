/**
 * Created by chenh on 2015/12/24.
 */

var React = require('react');

var CategoryAction = require('../../../actions/appstore/categories/CategoryAction');
const Dialog = require('material-ui/lib/dialog');
import RaisedButton from 'material-ui/lib/raised-button';

require('./UploadISO.css');
//var mui = require('material-ui');
//const TextField = mui.TextField;
var files;

var UploadISO = React.createClass({
  upload(event){
    event.preventDefault();
    var name = this.refs.name.getValue();
    var description = this.refs.description.getValue();
    var metaData = {
      name: name,
      description: description,
      categoryName: 'Iso'
    };
    if (files.length > 0) {
      console.log('out ' + files.length);
      console.log(files[0].size);

      CategoryAction.uploadISO({metaData: metaData, dcID: 1, file: files});
    }
    this.props.onRequestClose();
  },
  handleChangeFile: function (e) {
    files = e.target.files;
  },
  renderForm(){
    return <form id='uploadISO' className='uploadISO' onSubmit={this.upload}>
      <div className='entry' >
        <label className='entryLabel'>名称：</label>
        <input className='entryInput' ref='name' required form='uploadISO'/>
      </div>
      <div className='entry'>
        <label className='entryLabel' >描述：</label>
        <input className='entryInput' ref='description' required form='uploadISO'/>
      </div>
      <div className='entry'>
        <label className='entryLabel'>选择文件:</label>
        <input className='entryInput' type='file' ref='isoFile' label='选择ISO文件' onChange={this.handleChangeFile} required form='uploadISO'/>
      </div>
    </form>;
  },
  render(){
    return <Dialog
      title='上传ISO文件'
      open={this.props.open}
      onRequestClose={this.props.onRequestClose}
      actions={[<RaisedButton secondary={true} label='取消' onTouchTap={this.props.onRequestClose} />,
      <RaisedButton label='提交' primary={true} ref='submit' type='submit' form='uploadISO'/>
    ]}
      actionFocus="submit"
      autoDetectWindowHeight={true}
      autoScrollBodyContent={true}>
        {this.renderForm()}
    </Dialog>;
  }
});
module.exports = UploadISO;
