/**
 * Created by jiangrx on 15-12-4.
 */
const React = require('react');
const DropDownMenu = require('material-ui/lib/drop-down-menu');

class DevicePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuItems: [],
      servicePort: 0,
      managementPort: 0
    };
  }

  componentDidMount() {
    //TODO: remove hardcoded to NFS
    if (this.props.isEdit) {
      this.setState({
        menuItems: [{
          payload: this.props.defaultValues[0].storageTechnology,
          text: this.props.defaultValues[0].storageTechnology
        }]
      });
      this._managementPort.value = this.props.defaultValues[0].managementPort;
      this._servicePort.value = this.props.defaultValues[0].servicePort;
      this._name.value = this.props.defaultValues[0].name;
      this._managementIp.value = this.props.defaultValues[0].managementIp;
      this._serviceIp.value = this.props.defaultValues[0].serviceIp;
    } else {
      this.setState({
        menuItems: [{payload: this.props.defaultValues[2].type, text: this.props.defaultValues[2].type}],
        servicePort: this.props.defaultValues[2].defaultServicePort,
        managementPort: this.props.defaultValues[2].defaultManagementPort
      });
      this._managementPort.value = this.props.defaultValues[2].defaultManagementPort;
      this._servicePort.value = this.props.defaultValues[2].defaultServicePort;
    }

  }

  _getData() {
    let data = null;
    if (this.props.isEdit) {
      data = {
        id: this.props.defaultValues[0].id,
        name: this._name.value,
        storageTechnology: this.props.defaultValues[0].storageTechnology,
        managementIp: this._managementIp.value,
        managementPort: this._managementPort.value,
        serviceIp: this._serviceIp.value,
        servicePort: this._servicePort.value
      };
    } else {
      data = {
        name: this._name.value,
        storageTechnology: this.state.menuItems[this._storageTechnology.state.selectedIndex].payload,
        managementIp: this._managementIp.value,
        managementPort: this._managementPort.value,
        serviceIp: this._serviceIp.value,
        servicePort: this._servicePort.value
      };
    }

    return {data: data, allSet: true};
  }

  render() {
    return (
      <div className='row col-12'>
        <div className='row'>
          <label>Name *</label>
          <input type="text" ref={(ref)=>this._name = ref}/>
        </div>
        <div className='row'>
          <label>Type *</label>
          <DropDownMenu ref={(ref)=>this._storageTechnology = ref} menuItems={this.state.menuItems}
                        disabled={this.props.isEdit}/>
        </div>
        <div className='row'>
          <label>Manager IP *</label>
          <input type='text' ref={(ref)=>this._managementIp = ref}/>
        </div>
        <div className='row'>
          <label>Port *</label>
          <input type='number' min='0' ref={(ref)=>this._managementPort = ref}/>
        </div>
        <div className='row'>
          <label>Service IP *</label>
          <input type='text' ref={(ref)=>this._serviceIp = ref}/>
        </div>
        <div className='row'>
          <label>Port *</label>
          <input type='number' ref={(ref)=>this._servicePort = ref}/>
        </div>
      </div>
    );
  }
}

DevicePage.defaultProps = {
  defaultValues: [{payload: 'NFS', text: 'NFS'}],
  isEdit: false
};
module.exports = DevicePage;
