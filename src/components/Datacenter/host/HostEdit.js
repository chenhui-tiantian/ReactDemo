/**
 * Created by jiangrx on 15-12-10.
 */
const React = require('react');
const Dialog = require('material-ui/lib/dialog');
const FlatButton = require('material-ui/lib/flat-button');
const Tabs = require('material-ui/lib/tabs/tabs');
const Tab = require('material-ui/lib/tabs/tab');
const List = require('material-ui/lib/lists/list');
const ListRow = require('../../common/ListRow');
const Table = require('material-ui/lib/table/table');
const TableBody = require('material-ui/lib/table/table-body');
const TableHeader = require('material-ui/lib/table/table-header');
const TableHeaderColumn = require('material-ui/lib/table/table-header-column');
const TableRow = require('material-ui/lib/table/table-row');
const TableRowColumn = require('material-ui/lib/table/table-row-column');
let ActionHost = require('../../../actions/datacenter/HostAction');
let StoreHost = require('../../../store/datacenter/HostStore');
let injectTapEventPlugin = require('react-tap-event-plugin');
injectTapEventPlugin();

class HostEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stateCheck: ''
    };
  }

  componentWillMount() {
    this.setState({stateCheck: this.props.host.state});
    StoreHost.addStateCheckChange(this.onStateCheckComplete.bind(this));
  }

  componentWillReceiveProps(nextProps) {
    this.setState({stateCheck: nextProps.host.state});
  }

  componentWillUnmount() {
    StoreHost.removeStateCheckChange(this.onStateCheckComplete);
  }


  stateCheck() {
    ActionHost.stateCheckHost({url: this.props.host.links[5].href});
  }

  onStateCheckComplete() {
    console.log('state: ' + StoreHost.getCheckState());
    this.setState({stateCheck: StoreHost.getCheckState()});
  }

  onStorageSelect(selectedRows) {
    ActionHost.storageSelectionChange(selectedRows);
  }

  onSave() {
    let data = this.props.host;
    this.saveInfo(data);
    this.saveNetwork(data);
    this.saveStorage(data);
    ActionHost.editHost({
      data: JSON.stringify(data),
      dcID: this.props.dcID,
      rackID: this.props.rackID,
      hostID: data.id
    });
    this.props.onRequestClose();
  }

  saveInfo(data) {
    if (this._user.value.length > 0) {
      data.user = this._user.value;
    }
    if (this._password.value.length > 0) {
      data.password = this._password.value;
    }
    if (this._port.value.length > 0) {
      data.port = this._port.value;
    }
    data.name = this._name.value;
    data.description = this._description.value;
    data.ipService = this._ipService.value;
  }

  saveNetwork(data) {
    //TODO: SR-IOV, service type.
  }

  saveStorage(data) {
    let selections = StoreHost.getStorageSelection();
    if (selections === 'all') {
      for (let i = 0; i < data.datastores.collection.length; i++) {
        data.datastores.collection[i].enabled = true;
      }
    } else {
      for (let i = 0; i < data.datastores.collection.length; i++) {
        data.datastores.collection[i].enabled = false;
      }
      selections.map(function (select) {
        data.datastores.collection[select].enabled = true;
      });
    }
  }

  renderInfo() {
    return (<div className='row col-12'>
      <div className='row'>
        <label>Name *</label>
        <input type='text' ref={(ref) => this._name = ref } defaultValue={this.props.host.name}/>
      </div>
      <div className='row'>
        <label>Description </label>
        <textarea ref={(ref) => this._description = ref } defaultValue={this.props.host.description}/>
      </div>
      <div className='row'>
        <label>Remote IP *</label>
        <input type='text' ref={(ref) => this._ipService = ref } defaultValue={this.props.host.ipService}/>
      </div>
      <div className='row'>
        <label>User </label>
        <input type='text' ref={(ref) => this._user = ref }/>
      </div>
      <div className='row'>
        <label>Password</label>
        <input type='password' ref={(ref) => this._password = ref }/>
      </div>
      <div className='row'>
        <label>Port</label>
        <input type='number' min='0' ref={(ref) => this._port = ref }/>
      </div>
      <div className='row'>
        <label>State</label>
        <div className='row col-12'>
          <label>{this.state.stateCheck}</label>
          <FlatButton label="Check" onTouchTap={this.stateCheck.bind(this)}/>
        </div>
      </div>
    </div>);
  }

  renderNetwork() {
    let ret = [];
    if (this.props.host.hasOwnProperty('networkInterfaces')) {
      let networks = this.props.host.networkInterfaces.collection;
      for (let i = 0; i < networks.length; i++) {
        let primaryText = 'Interface: ' + networks[i].name;
        let secondaryText = 'SR-IOV: ' + networks[i].enableSriov ? 'Disabled' : 'Enabled';
        ret.push(<ListRow key={i} item={networks[i]}
                          primaryText={primaryText}
                          secondaryText={secondaryText}/>);
      }
    }
    return <List>{ret}</List>;

  }

  renderStorage() {
    let ret = [];
    if (this.props.host.hasOwnProperty('datastores')) {
      let storages = this.props.host.datastores.collection;
      for (let i = 0; i < storages.length; i++) {
        let size = '';
        if (storages[i].size <= 1024) {
          size = storages[i].size + ' KB';
        } else if (storages[i].size <= (1024 * 1024)) {
          size = storages[i].size / 1024 + ' MB';
        } else {
          size = storages[i].size / 1024 / 1024 + ' GB';
        }
        let usedSize = '';
        if (storages[i].usedSize <= 1024) {
          usedSize = storages[i].usedSize + ' KB';
        } else if (storages[i].usedSize <= (1024 * 1024)) {
          usedSize = storages[i].usedSize / 1024 + ' MB';
        } else {
          usedSize = storages[i].usedSize / 1024 / 1024 + ' GB';
        }
        let maintenanceMode = '';
        if (storages[i].isShare && (!storages[i].maintenance)) {
          maintenanceMode = 'Enter Maintenance Mode';
        }
        ret.push(<TableRow selected={storages[i].enabled}>
          <TableRowColumn>{storages[i].rootPath}</TableRowColumn>
          <TableRowColumn>{storages[i].directory}</TableRowColumn>
          <TableRowColumn>{size}</TableRowColumn>
          <TableRowColumn>{usedSize}</TableRowColumn>
          <TableRowColumn>{maintenanceMode}</TableRowColumn>
        </TableRow>);
      }
    }
    return <Table selectable={true} multiSelectable={true}
                  onRowSelection={this.onStorageSelect.bind(this)}>
      <TableHeader displaySelectAll={false}>
        <TableRow>
          <TableHeaderColumn>Enabled</TableHeaderColumn>
          <TableHeaderColumn>Root</TableHeaderColumn>
          <TableHeaderColumn>Dir</TableHeaderColumn>
          <TableHeaderColumn>Capacity</TableHeaderColumn>
          <TableHeaderColumn>Used</TableHeaderColumn>
          <TableHeaderColumn>Maintenance</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody deselectOnClickaway={false}>
        {ret}
      </TableBody>
    </Table>;
  }

  renderEditPage() {
    return <Tabs>
      <Tab label='System Info'>
        {this.renderInfo()}
      </Tab>
      <Tab label='网络'>
        {this.renderNetwork()}
      </Tab>
      <Tab label='存储'>
        {this.renderStorage()}
      </Tab>
    </Tabs>;
  }

  render() {
    return <Dialog
      actions={[<FlatButton
          label="Cancel"
          secondary={true}
          onTouchTap={this.props.onRequestClose}/>,
          <FlatButton
            label="Save"
            primary={true}
            onTouchTap={this.onSave.bind(this)}/>]}
      open={this.props.open}>
      {this.renderEditPage()}
    </Dialog>;
  }
}
HostEdit.defaultProps = {
  dcID: 1,
  rackID: 0,
  host: {},
  open: false,
  onRequestClose: null
};

module.exports = HostEdit;
