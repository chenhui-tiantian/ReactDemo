/**
 * Created by lenovo on 2015/12/24.
 */
let React = require('react');

let CategoryAction = require('../../../actions/appstore/categories/CategoryAction');
import DropDownWithSearch from '../../common/DropDownWithSearch';
import DropDownMenu from 'material-ui/lib/drop-down-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
const Dialog = require('material-ui/lib/dialog');
import RaisedButton from 'material-ui/lib/raised-button';
let ActionSelf = require('../../../actions/appstore/categories/UploadTemplateAction');
let StoreSelf = require('../../../store/appstore/category/UploadTemplateStore');

var mui = require('material-ui');
const TextField = mui.TextField;
const diskController = [{text: 'SCIS', payload: 'SCIS'}, {text: 'IDE', payload: 'IDE'}];
const unit = [{text: 'MB', payload: 1},
  {text: 'GB', payload: 1024},
  {text: 'TB', payload: (1024 * 1024)}];

require('./UploadTemplate.css');
var UploadTemplate = React.createClass({
  getInitialState() {
    return {
      diskInfo: {
        name: '',
        description: '',
        categoryName: 'Iso'
      },
      parsedDiskTypes: [],
      memUnit: 1,
      diskUnit: 1
    };
  },
  componentWillMount(){
    StoreSelf.addParsedDiskTypesListener(this.onParsed);
  },
  componentWillReceiveProps(nextProps){
    if (nextProps.diskFormatTypes.length > 0) {
      ActionSelf.parseDiskTypes();
    }
  },
  componentWillUnmount(){
    StoreSelf.removeParsedDiskTypesListener(this.onParsed);
  },
  onParsed(){
    this.setState({parsedDiskTypes: StoreSelf.getParsedDiskTypes()});
  },
  upload(event){
    event.preventDefault();
    let diskFileFormat = this.props.diskFormatTypes[this._type.state.selectedValue].links[0].title;
    console.log(this._memUnit);
    var metaData = {
      name: this._name.getValue(),
      description: this._desc.value,
      diskFileFormat: diskFileFormat,
      requiredCpu: parseInt(this._cpu.getValue()),
      requiredRamInMB: parseInt(this._mem.getValue()) * unit[this._memUnit.state.selectedIndex].payload,
      requiredHDInMB: parseInt(this._disk.getValue()) * unit[this._diskUnit.state.selectedIndex].payload,
      categoryName: this.props.category.name,
      diskControllerType: diskController[this._controller.state.selectedIndex].payload
    };
    let files = this._file.files;
    if (files.length > 0) {
      console.log('out ' + files.length);
      console.log(files[0].size);

      //CategoryAction.uploadTemplate({metaData: metaData, dcID: 1, file: files});
    }
    this.props.onRequestClose();
  },
  onMemChange(event, selectedIndex){
    this.setState({memUnit: unit[selectedIndex]});
  },
  onDiskChange(event, selectedIndex){
    this.setState({diskUnit: unit[selectedIndex]});
  },
  handleChangeFile: function (e) {
    files = e.target.files;
  },
  renderForm(){
    return (
      <form className='templateUploadForm' id='uploadTemplate' onSubmit={this.upload}>
        <div className='entry'>
          <label className='entryLabel'>名称：</label>
          <div className='entryInput'>
            <TextField ref={(ref)=> this._name = ref} required/>
          </div>
        </div>
        <div className='entry'>
          <label className='entryLabel'>描述：</label>
          <textarea className='entryInput' ref={(ref)=> this._desc = ref} required/>
        </div>
        <div className='entry'>
          <label className='entryLabel'>类型：</label>
          <div className='entryInput'>
            <DropDownWithSearch ref={(ref)=> this._type = ref} contents={this.state.parsedDiskTypes}/>
          </div>
        </div>
        <div className='entry'>
          <label className='entryLabel'>CPU：</label>
          <div className='entryInput'>
            <TextField type='number' min='1' ref={(ref)=> this._cpu = ref}/>
          </div>
        </div>
        <div className='entry'>
          <label className='entryLabel'>内存：</label>
          <div className='entryInput'>
            <TextField type='number' min='1' ref={(ref)=> this._mem = ref}/>
            <DropDownMenu menuItems={unit}
                          onChange={this.onMemChange}
                          ref={(ref) => this._memUnit = ref}/>
          </div>
        </div>
        <div className='entry'>
          <label className='entryLabel'>磁盘：</label>
          <div className='entryInput'>
            <TextField type='number' min='1' ref={(ref)=> this._disk = ref}/>
            <DropDownMenu menuItems={unit}
                          onChange={this.onDiskChange}
                          ref={(ref) => this._diskUnit = ref}/>
          </div>
        </div>
        <div className='entry'>
          <label className='entryLabel'>磁盘控制器：</label>
          <div className='entryInput'>
            <DropDownMenu menuItems={diskController} ref={(ref) => this._controller = ref}/>
          </div>
        </div>
        <div className='entry'>
          <label className='entryLabel'>模板文件：</label>
          <input className='entryInput' type='file' ref={(ref)=>this._file = ref} label='选择模板文件'
                 onChange={this.handleChangeFile}/>
        </div>
      </form>);
  },
  render(){
    return <Dialog
      title='上传模板文件'
      open={this.props.open}
      onRequestClose={this.props.onRequestClose}
      actions={[<RaisedButton label='取消' onTouchTap={this.props.onRequestClose} />,
      <RaisedButton label='提交' ref='submit' type='submit' form='uploadTemplate'/>
    ]}
      actionFocus="submit"
      autoDetectWindowHeight={false}
      autoScrollBodyContent={false}>
      {this.renderForm()}
    </Dialog>;
  }
});
module.exports = UploadTemplate;
