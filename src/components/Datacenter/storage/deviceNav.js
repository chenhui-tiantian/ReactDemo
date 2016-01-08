/**
 * Created by jiangrx on 15-12-2.
 */

let React = require('react');

const DropDownMenu = require('material-ui/lib/drop-down-menu');
const List = require('material-ui/lib/lists/list');
const ListRow = require('../../common/ListRow.js');
const IconButton = require('material-ui/lib/icon-button');
const IconMenu = require('material-ui/lib/menus/icon-menu');
const MenuItem = require('material-ui/lib/menus/menu-item');
const MoreVertIcon = require('material-ui/lib/svg-icons/navigation/more-vert');
const Colors = require('material-ui/lib/styles/colors');
const StepPage = require('../../common/StepPage');
let DeviceEdit = require('./DeviceEdit');
let PoolEdit = require('./PoolEdit');
const DisplayInfo = require('../../common/DisplayInfo');
let injectTapEventPlugin = require('react-tap-event-plugin');
injectTapEventPlugin();

const ControlButtons = require('../../common/ControlButtons.js');

const ActionStorage = require('../../../actions/datacenter/StorageAction');
const StoreStorage = require('../../../store/datacenter/StorageStore');
let StoreDataCenter = require('../../../store/datacenter/DataCenterStore');
let menuItems = [
  {payload: 0, text: 'Devices'},
  {payload: 1, text: 'Service Tier'}
];

let DeviceNav = React.createClass({
  getInitialState(){
    return {
      deviceAddPageOpen: false,
      deviceEditPageOpen: false,
      poolAddPageOpen: false,
      poolEditPageOpen: false,
      dcID: 0,
      deviceID: 0,
      poolID: 0,
      items: [],
      defaultValues: [],
      displayInfo: {
        title: '',
        data: []
      }
    };
  },
  componentWillMount(){
    StoreStorage.addFetchStorageListener(this.onFetchedStorage);
    StoreStorage.addGetStorageSupportedTypesListener(this.onGetStorageSupportedTypes);
    StoreStorage.addAddDeviceSuccessListener(this.onDeviceAddSuccess);
    StoreStorage.addAddPoolSuccessListener(this.onPoolAddSuccess);
    StoreStorage.addDeletePoolSuccessListener(this.onPoolDelSuccess);
    StoreStorage.addDeleteDeviceSuccessListener(this.onDeviceDelSuccess);
    StoreStorage.addUpdatePoolIDListener(this.onPoolIDUpdateSuccess);
    StoreStorage.addUpdateStorageIDListener(this.onDeviceIDUpdateSuccess);
    StoreStorage.addFetchVolumesSuccessListener(this.onFetchedVolumes);
    StoreDataCenter.addDataCenterListListener(this.onDCChange);
    this.setState({dcID: StoreDataCenter.getSelectedDataCenterID()});
  },
  componentDidMount(){
    if (this.state.dcID !== 0) {
      ActionStorage.fetchStorageSupportedTypes({dcID: this.state.dcID});
      ActionStorage.fetchAllStorage({dcID: this.state.dcID});
    }
  },
  componentWillUpdate(nextProps, nextState){
    if(nextState.dcID !== this.state.dcID){
      this.setState({
        deviceID: 0,
        poolID: 0,
        items: [],
        defaultValues: [],
        displayInfo: {
          title: '',
          data: []
        }});
      ActionStorage.fetchStorageSupportedTypes({dcID: nextState.dcID});
      ActionStorage.fetchAllStorage({dcID: nextState.dcID});
    }
  },
  componentWillUnmount(){
    StoreStorage.removeFetchStorageListener(this.onFetchedStorage);
    StoreStorage.removeGetStorageSupportedTypesListener(this.onGetStorageSupportedTypes);
    StoreStorage.removeAddDeviceSuccessListener(this.onDeviceAddSuccess);
    StoreStorage.removeAddPoolSuccessListener(this.onPoolAddSuccess);
    StoreStorage.removeDeletePoolSuccessListener(this.onPoolDelSuccess);
    StoreStorage.removeDeleteDeviceSuccessListener(this.onDeviceDelSuccess);
    StoreStorage.removeUpdatePoolIDListener(this.onPoolIDUpdateSuccess);
    StoreStorage.removeUpdateStorageIDListener(this.onDeviceIDUpdateSuccess);
    StoreStorage.removeFetchVolumesSuccessListener(this.onFetchedVolumes);
    StoreDataCenter.removeDataCenterListListener(this.onDCChange);
  },
  onDCChange(){
    this.setState({dcID: StoreDataCenter.getSelectedDataCenterID()});
    //ActionStorage.updateBundle({
    //  dcID: StoreDataCenter.getSelectedDataCenterID(),
    //  storageDeviceID: 0,
    //  poolID: 0
    //});
  },
  onFetchedStorage(){
    this.setState({items: StoreStorage.getStorage()});
  },
  onGetStorageSupportedTypes(){
    this.setState({defaultValues: StoreStorage.getSupportedTypes()});
  },
  onFetchedVolumes(){
    //console.log('deviceNav');
    //this.setState({volumesData: StoreStorage.getVolumes()});
  },
  onItemOperation(event, item){
    let deviceIndex = item.props.index >> StoreStorage.indexShift;
    let poolIndex = item.props.index & StoreStorage.indexMask;
    if (poolIndex !== 0) {//Action on Pool
      ActionStorage.updatePoolID(this.state.items[deviceIndex].nests[poolIndex - 1].key);
      if (item.key === 'del') {
        ActionStorage.deletePool({
          dcID: this.state.dcID,
          storageDeviceID: this.state.items[deviceIndex].key,
          poolID: this.state.items[deviceIndex].nests[poolIndex - 1].key
        });
      } else if (item.key === 'edit') {
        console.log(this.state.items[deviceIndex].nests[poolIndex - 1]);
        this.setState({
          dcID: this.state.dcID,
          deviceID: this.state.items[deviceIndex].key,
          poolID: this.state.items[deviceIndex].nests[poolIndex - 1].key,
          defaultValues: [this.state.items[deviceIndex].nests[poolIndex - 1].data],
          poolEditPageOpen: true
        });
      }
    } else {//Action on Storage
      if (item.key === 'del') {
        ActionStorage.deleteDevice({
          dcID: this.state.dcID,
          storageDeviceID: this.state.items[deviceIndex].key
        });
      } else if (item.key === 'edit') {
        this.setState({
          dcID: this.state.dcID,
          deviceID: this.state.items[deviceIndex].key,
          defaultValues: [this.state.items[deviceIndex].data],
          deviceEditPageOpen: true
        });
      } else if (item.key === 'pool') {
        console.log('pool');
        this.setState({
          dcID: this.state.dcID,
          deviceID: this.state.items[deviceIndex].key,
          defaultValues: {
            dcID: this.state.dcID,
            storageDeviceID: this.state.items[deviceIndex].key
          },
          poolAddPageOpen: true
        });
      }
    }
  },
  onDeviceAddSuccess(){
    ActionStorage.fetchAllStorage({dcID: this.state.dcID});
  },
  onDeviceDelSuccess(){
    ActionStorage.fetchAllStorage({dcID: this.state.dcID});
  },
  onPoolAddSuccess(){
    ActionStorage.fetchAllStorage({dcID: this.state.dcID});
  },
  onPoolDelSuccess(){
    ActionStorage.fetchAllStorage({dcID: this.state.dcID});
  },
  onPoolIDUpdateSuccess(){
    this.setState({poolID: StoreStorage.getPoolID()});
  },
  onDeviceIDUpdateSuccess(){
    this.setState({deviceID: StoreStorage.getDeviceID()});
  },
  onItemSelect(event, item){
    let deviceIndex = item.index >> StoreStorage.indexShift;
    let poolIndex = item.index & StoreStorage.indexMask;
    if (poolIndex !== 0) {//Storage Pool action
      console.log(this.state.items[deviceIndex].nests[poolIndex - 1].data);
      this.setState({
        deviceID: this.state.items[deviceIndex].key,
        poolID: this.state.items[deviceIndex].nests[poolIndex - 1].key,
        displayInfo: {
          title: 'Pool Info',
          data: [
            {
              label: '名称',
              text: this.state.items[deviceIndex].nests[poolIndex - 1].data.name
            },
            {
              label: '服务级别',
              text: this.state.items[deviceIndex].nests[poolIndex - 1].data.links[1].title
            },
            {
              label: '可用空间(MB)',
              text: this.state.items[deviceIndex].nests[poolIndex - 1].data.availableSizeInMb
            },
            {
              label: '已用空间(MB)',
              text: this.state.items[deviceIndex].nests[poolIndex - 1].data.usedSizeInMb
            }
          ]
        }
      });
      ActionStorage.updateBundle({
        dcID: this.state.dcID,
        storageDeviceID: this.state.items[deviceIndex].key,
        poolID: this.state.items[deviceIndex].nests[poolIndex - 1].key
      });
    } else {// Storage Device Action
      console.log(this.state.items[deviceIndex].data);
      ActionStorage.updateBundle({
        dcID: this.state.dcID,
        storageDeviceID: this.state.items[deviceIndex].key,
        poolID: 0
      });
      this.setState({
        deviceID: this.state.items[deviceIndex].key,
        poolID: 0,
        displayInfo: {
          title: 'Device Info',
          data: [
            {
              label: '名称',
              text: this.state.items[deviceIndex].data.name
            },
            {
              label: '管理IP',
              text: this.state.items[deviceIndex].data.managementIp
            },
            {
              label: '管理端口',
              text: this.state.items[deviceIndex].data.managementPort
            },
            {
              label: '服务IP',
              text: this.state.items[deviceIndex].data.serviceIp
            },
            {
              label: '服务端口',
              text: this.state.items[deviceIndex].data.servicePort
            },
            {
              label: '存储技术',
              text: this.state.items[deviceIndex].data.storageTechnology
            }
          ]
        }
      });
    }
  },
  rightIconMenu (itemData, withNests) {
    let iconButtonElement = (
      <IconButton
        touch={true}
        tooltip="more"
        tooltipPosition="bottom-left">
        <MoreVertIcon color={Colors.grey400}/>
      </IconButton>
    );
    //let poolIndex = itemData.index & StoreStorage.indexMask;
    //console.log(withNests);
    //TODO: Warning about MenuItem -> <a>
    let ret = null;
    if (withNests && (itemData.nests.length === 0)) {
      ret = (<IconMenu openDirection='bottom-right' iconButtonElement={iconButtonElement}
                       onItemTouchTap={this.onItemOperation}>
        <MenuItem key='del' index={itemData.index}>Delete</MenuItem>
        <MenuItem key='edit' index={itemData.index}>Edit</MenuItem>
        <MenuItem key='pool' index={itemData.index}>Add Pool</MenuItem>
      </IconMenu>);
    } else {
      ret = (<IconMenu openDirection='bottom-right' iconButtonElement={iconButtonElement}
                       onItemTouchTap={this.onItemOperation}>
        <MenuItem key='del' index={itemData.index}>Delete</MenuItem>
        <MenuItem key='edit' index={itemData.index}>Edit</MenuItem>
      </IconMenu>);
    }
    return ret;
  },
  nest (item) {
    let items = [];
    for (let i = 0; i < item.length; i++) {
      items.push(<ListRow key={item[i].key} item={item[i]} primaryText={item[i].text}
                          rightIconButton={this.rightIconMenu(item[i], false)}
                          onTouchEvent={this.onItemSelect}/>);
    }
    return items;
  },
  onAddClicked(){
    this.setState({deviceAddPageOpen: true});
  },
  onDeviceAddPageRequestClose(){
    this.setState({deviceAddPageOpen: false});
  },
  onDeviceEditPageRequestClose(){
    this.setState({deviceEditPageOpen: false});
  },
  onPoolAddPageRequestClose(){
    this.setState({poolAddPageOpen: false});
  },
  onPoolEditPageRequestClose(){
    this.setState({poolEditPageOpen: false});
  },
  onDeviceAddPageFinish(data){
    this.setState({deviceAddPageOpen: false});
    ActionStorage.addDevice({data: JSON.stringify(data[0].data), dcID: this.state.dcID});
  },
  onDeviceEditPageFinish(data){
    this.setState({deviceEditPageOpen: false});
    ActionStorage.updateDevice({
      data: JSON.stringify(data[0].data),
      dcID: this.state.dcID,
      storageDeviceID: this.state.deviceID
    });
  },
  onPoolAddPageFinish(data){
    this.setState({poolAddPageOpen: false});
    console.log(data);
    ActionStorage.addPool({
      data: JSON.stringify(data[0].data), dcID: this.state.dcID,
      storageDeviceID: this.state.deviceID
    });
  },
  onPoolEditPageFinish(data){
    this.setState({poolEditPageOpen: false});
    ActionStorage.editPool({
      data: JSON.stringify(data[0].data),
      dcID: this.state.dcID,
      storageDeviceID: this.state.deviceID,
      poolID: this.state.poolID
    });
  },
  renderLists(){
    let lists = [];
    for (var i = 0; i < this.state.items.length; i++) {
      let item = this.state.items[i];
      if (item.hasOwnProperty('nests') && item.nests !== null) {
        lists.push(<ListRow key={item.key} item={item} primaryText={item.text}
                            nestedItems={this.nest(item.nests)}
                            leftAvatar={this.rightIconMenu(item, true)}
                            onTouchEvent={this.onItemSelect}/>);
      } else {
        lists.push(<ListRow key={item.key} item={item} primaryText={item.text}
                            rightIconButton={this.rightIconMenu(item, false)}
                            onTouchEvent={this.onItemSelect}/>);
      }

    }
    return lists;
  },
  _renderList(){

    if (this.state.items.length > 0) {
      //let nest = this.nest;
      //let rightIconMenu = this.rightIconMenu;
      return (
        <List >
          {this.renderLists()}
        </List>);
    } else {
      return null;
    }
  },
  renderDeviceAddPage(){
    return <StepPage
      title="Dialog With Standard Actions"
      open={this.state.deviceAddPageOpen}
      autoScrollBodyContent={true}
      onRequestClose={this.onDeviceAddPageRequestClose}
      finishHandler={this.onDeviceAddPageFinish}
      pages={[{canSkip: false, component: <DeviceEdit defaultValues={this.state.defaultValues}/>}]}/>;
  },
  renderDeviceEditPage(){
    return <StepPage
      title="Dialog With Standard Actions"
      open={this.state.deviceEditPageOpen}
      autoScrollBodyContent={true}
      onRequestClose={this.onDeviceEditPageRequestClose}
      finishHandler={this.onDeviceEditPageFinish}
      pages={[{canSkip: false, component: <DeviceEdit defaultValues={this.state.defaultValues} isEdit={true}/>}]}/>;
  },
  renderPoolAddPage(){
    return <StepPage
      title="Dialog With Standard Actions"
      open={this.state.poolAddPageOpen}
      autoScrollBodyContent={true}
      onRequestClose={this.onPoolAddPageRequestClose}
      finishHandler={this.onPoolAddPageFinish}
      pages={[{canSkip: false, component: <PoolEdit defaultValues={this.state.defaultValues} isEdit={false}/>}]}/>;
  },
  renderPoolEditPage(){
    return <StepPage
      title="Dialog With Standard Actions"
      open={this.state.poolEditPageOpen}
      autoScrollBodyContent={true}
      onRequestClose={this.onPoolEditPageRequestClose}
      finishHandler={this.onPoolEditPageFinish}
      pages={[{canSkip: false, component: <PoolEdit defaultValues={this.state.defaultValues} isEdit={true}/>}]}/>;
  },
  _renderPage(){
    if (this.state.deviceAddPageOpen) {
      return this.renderDeviceAddPage();
    }
    if (this.state.deviceEditPageOpen) {
      return this.renderDeviceEditPage();
    }
    if (this.state.poolAddPageOpen) {
      return this.renderPoolAddPage();
    }
    if (this.state.poolEditPageOpen) {
      return this.renderPoolEditPage();
    }
  },
  render(){
    return (
      <div className='storageNav'>
        <div className='search'>
          <div className='dropDown'>
            <DropDownMenu menuItems={menuItems}/>
          </div>
          <div className='buttons'>
            <ControlButtons buttons={{addButton: true}} addButtonHandler={this.onAddClicked}/>
          </div>
        </div>

        <div className='data'>
          {this._renderList()}
        </div>
        <DisplayInfo title={this.state.displayInfo.title} data={this.state.displayInfo.data}/>
        <div>
          {this._renderPage()}
        </div>
      </div>
    );
  }
});


module.exports = DeviceNav;
