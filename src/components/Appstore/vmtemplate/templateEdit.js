/**
 * Created by Administrator on 2015/12/22 0022.
 */
let React = require('react');
const templateAction = require('../../../actions/appstore/vmtemplate/VMTemplateAction');
const templateStore = require('../../../store/appstore/vmtemplate/VMTemplateStore');
import DropDownMenu from 'material-ui/lib/drop-down-menu';
const Toggle = require('material-ui/lib/toggle');
const Dialog = require('material-ui/lib/dialog');
import RaisedButton from 'material-ui/lib/raised-button';
require('./templateEdit.css');

const diskController = [{text: 'SCIS', payload: 'SCIS'}, {text: 'IDE', payload: 'IDE'}];
const unit = [{text: 'MB', payload: 1024 * 1024},
  {text: 'GB', payload: 1024 * 1024 * 1024},
  {text: 'TB', payload: (1024 * 1024 * 1024 * 1024)}];

class templateEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuItems: [],
      defaultValues: {
        name: '',
        description: '',
        diskFormatType: '',
        cpuRequired: '',
        ramRequired: '',
        hdRequired: '',
        diskControllerType: '',
        path: '',
        shared: false,
        chefEnabled: false

      }
    };
  }

  componentWillMount() {
    if (this.props.defaultValues !== null) {
      this.setState({defaultValues: this.props.defaultValues});
    }
    templateStore.editTemplateSuccessListener(this.onPoolSynced.bind(this));
    //if (!this.props.isEdit) {
    //  console.log('this.props.defaultValues',this.props.defaultValues);
    //  templateAction.editTemplate(this.props.defaultValues);
    //}
    //
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.defaultValues !== null) {
      this.setState({defaultValues: nextProps.defaultValues});
    }
  }

  componentDidMount() {
    //if (this.props.isEdit) {
    //  console.log('componentDidMount ', this.props.defaultValues);
    //  this._name.value = this.props.defaultValues[0].name;
    //  this._description.value = this.props.defaultValues[0].description;
    //  this._diskFormatType.value = this.props.defaultValues[0].diskFormatType;
    //  this._cpuRequired.value = this.props.defaultValues[0].cpuRequired;
    //  this._ramRequired.value = this.props.defaultValues[0].ramRequired;
    //  this._hdRequired.value = this.props.defaultValues[0].hdRequired;
    //  this._diskControllerType.value = this.props.defaultValues[0].diskControllerType;
    //  this._path.value = this.props.defaultValues[0].path;
    //  this._shared.value = this.props.defaultValues[0].shared;
    //  this._chefEnabled.value = this.props.defaultValues[0].chefEnabled;
    //} else {
    //  console.log('componentDidMount 22 ', this.props.defaultValues);
    //  this._name.value = this.props.defaultValues[0].name;
    //  this._description.value = this.props.defaultValues[0].description;
    //  this._diskFormatType.value = this.props.defaultValues[0].diskFormatType;
    //  this._cpuRequired.value = this.props.defaultValues[0].cpuRequired;
    //  this._ramRequired.value = this.props.defaultValues[0].ramRequired;
    //  this._hdRequired.value = this.props.defaultValues[0].hdRequired;
    //  this._diskControllerType.value = this.props.defaultValues[0].diskControllerType;
    //  this._path.value = this.props.defaultValues[0].path;
    //  this._shared.value = this.props.defaultValues[0].shared;
    //  this._chefEnabled.value = this.props.defaultValues[0].chefEnabled;
    //}
  }


  componentWillUnmount() {
    templateStore.removeEditTemplateSuccessListener(this.onPoolSynced);
  }

  onPoolSynced() {
    console.log('store eidt onpoolsynced', templateStore.getTemplates()[0]);
    this.setState({defaultValues: templateStore.getTemplates()[0]});
  }

  getData(event) {
    event.preventDefault();
    let data = null;
    data = this.props.defaultValues;
    data.name = this._name.value;
    data.description = this._description.value;
    data.cpuRequired = this._cpuRequired.value;
    data.ramRequired = parseInt(this._ramRequired.value) * unit[this._memUnit.state.selectedIndex].payload;
    data.hdRequired = parseInt(this._hdRequired.value) * unit[this._diskUnit.state.selectedIndex].payload;
    data.diskControllerType = diskController[this._controller.state.selectedIndex].payload;
    data.shared = this._shared.value;
    data.chefEnabled = this._chefEnabled.value;
    this.props.onSubmit(data);
  }

  render() {
    return (<Dialog
        width="50%"
        title="编辑模板"
        open={this.props.open}
        actions={[<RaisedButton label='取消' secondary={true} onTouchTap={this.props.onRequestClose} />,
      <RaisedButton label='提交' primary={true} type='submit' form='editTemplate'/>]}
        actionFocus="submit"
        autoDetectWindowHeight={false}
        autoScrollBodyContent={true}
        onRequestClose={this.props.onRequestClose}>
        <form id='editTemplate' onSubmit={this.getData} className='editTemplate'>
          <div className='entry'>
            <label className='entryLabel'>名称：</label>
            <input className='entryInput' type="text" ref={(ref)=>this._name = ref}
                   required
                   defaultValue={this.state.defaultValues.name}/>
          </div>
          <div className='entry'>
            <label className='entryLabel'>描述： *</label>
            <input className='entryInput' type='number' min='0' ref={(ref)=>this._description = ref}
                   defaultValue={this.state.defaultValues.description}
                   required/>
          </div>
          <div className='entry'>
            <label className='entryLabel'>类型： *</label>
            <input className='entryInput' type='number' ref={(ref)=>this._diskFormatType = ref}
                   defaultValue={this.state.defaultValues.diskFormatType}
                   readonly required/>
          </div>
          <div className='entry'>
            <label className='entryLabel'>类别： *</label>
            <input className='entryInput' type='number' ref={(ref)=>this._limit = ref}
                   defaultValue={this.state.defaultValues.maxVolumes}
                   required/>
          </div>
          <div className='entry'>
            <label className='entryLabel'>CPU： *</label>
            <input className='entryInput' type='number' ref={(ref)=>this._cpuRequired = ref}
                   defaultValue={this.state.defaultValues.cpuRequired} min='0' step='1' required/>
          </div>
          <div className='entry'>
            <label className='entryLabel'>内存： *</label>
            <div className='entryInput'>
              <input type='number' ref={(ref)=>this._ramRequired = ref}
                     defaultValue={this.state.defaultValues.ramRequired}
                     min='1' step='1' required/>
              <DropDownMenu menuItems={unit}
                            onChange={this.onMemChange}
                            ref={(ref) => this._memUnit = ref}/>
            </div>
          </div>
          <div className='entry'>
            <label className='entryLabel'>磁盘：</label>
            <div className='entryInput'>
              <input type='number' ref={(ref)=>this._hdRequired = ref}
                     defaultValue={parseInt(this.state.defaultValues.hdRequired / (1024 * 1024))}
                     min='1' step='1' required/>
              <DropDownMenu menuItems={unit}
                            onChange={this.onDiskChange}
                            ref={(ref) => this._diskUnit = ref}/>
            </div>
          </div>
          <div className='entry'>
            <label className='entryLabel'>磁盘控制器：</label>
            <div className='entryInput'>
              <DropDownMenu menuItems={diskController} ref={(ref) => this._controller = ref}
                            selectedIndex={this.state.defaultValues.diskControllerType === 'IDE' ? 1 : 0}/>
            </div>
          </div>
          <div className='entry'>
            <label className='entryLabel'>共享模板：</label>
            <div className='entryInput'><Toggle
              style={{width: '30%', paddingTop: '10px '}}
              name="drsEnabled"
              value="drsEnabled"
              ref={(ref)=>this._shared = ref}
              defaultValue={this.state.defaultValues.shared}
              label=" "/></div>
          </div>
          <div className='entry'>
            <label className='entryLabel'>启用chef：</label>
            <div className='entryInput'><Toggle
              style={{width: '30%', paddingTop: '10px '}}
              name="drsEnabled"
              value="drsEnabled"
              ref={(ref)=>this._chefEnabled = ref}
              defaultValue={this.state.defaultValues.chefEnabled}
              label=" "/></div>
          </div>
        </form>
      </Dialog>
    );
  }
}
templateEdit.defaultProps = {
  isEdit: false,
  defaultValues: []
};
module.exports = templateEdit;
