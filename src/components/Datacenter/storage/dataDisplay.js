/**
 * Created by jiangrx on 15-12-2.
 */
const React = require('react');
const IconButton = require('material-ui/lib/icon-button');
const IconMenu = require('material-ui/lib/menus/icon-menu');
const MenuItem = require('material-ui/lib/menus/menu-item');
const MoreVertIcon = require('material-ui/lib/svg-icons/navigation/more-vert');
const Colors = require('material-ui/lib/styles/colors');
const SearchBar = require('../../common/SearchBar');
const List = require('material-ui/lib/lists/list');
const ListDivider = require('material-ui/lib/lists/list-divider');
const ListRow = require('../../common/ListRow.js');
const StepPage = require('../../common/StepPage');
const VolumeEdit = require('./VolumeEdit');
const ActionStorage = require('../../../actions/datacenter/StorageAction');
const StoreStorage = require('../../../store/datacenter/StorageStore');


let DataDisplay = React.createClass({
  getInitialState(){
    return {
      data: [],
      volumeID: 0,
      volumeData: [],
      volumeEditPageOpen: false
    };
  },
  getDefaultProps(){
    return {
      dcID: 0,
      deviceID: 0,
      poolID: 0
    };
  },
  componentWillMount(){
    StoreStorage.addFetchVolumesSuccessListener(this.onFetchedVolumes);
    StoreStorage.addEditVolumesSuccessListener(this.onEditSuccess);
    StoreStorage.addDeleteVolumesSuccessListener(this.onDeleteSuccess);
  },
  componentWillReceiveProps(nextProps){
    console.log('received Props');
    this.setState({
      data: [],
      volumeID: 0,
      volumeData: [],
      volumeEditPageOpen: false
    });
    if (nextProps.poolID !== 0) {
      console.log('pooID: ', nextProps.poolID);
      ActionStorage.fetchVolumes({
        dcID: nextProps.dcID,
        storageDeviceID: nextProps.deviceID,
        poolID: nextProps.poolID
      });
    }
  },
  componentWillUnmount(){
    StoreStorage.removeFetchVolumesSuccessListener(this.onFetchedVolumes);
    StoreStorage.removeEditVolumesSuccessListener(this.onEditSuccess);
    StoreStorage.removeDeleteVolumesSuccessListener(this.onDeleteSuccess);
  },
  onFetchedVolumes(){
    this.setState({volumeData: StoreStorage.getVolumes()});
    console.log(StoreStorage.getVolumes());
  },
  onDeleteSuccess(){
    console.log('ondelete');
    ActionStorage.fetchVolumes({
      dcID: this.props.dcID,
      storageDeviceID: this.props.deviceID,
      poolID: this.props.poolID
    });
  },
  onEditSuccess(){
    ActionStorage.fetchVolumes({
      dcID: this.props.dcID,
      storageDeviceID: this.props.deviceID,
      poolID: this.props.poolID
    });
  },
  onVolumeEditPageRequestClose(){
    this.setState({volumeEditPageOpen: false});
  },
  onVolumeEditPageFinish(data){
    this.setState({volumeEditPageOpen: false});
    console.log(data);
    ActionStorage.editVolume({
      data: JSON.stringify(data[0].data),
      editURL: this.state.defaultValues.links[0].href
    });
  },
  onItemOperation(event, menuItem){
    if (menuItem.key === 'del') {
      console.log(menuItem);
      console.log(this.state.volumeData[menuItem.props.index]);
      ActionStorage.deleteVolume({deleteURL: this.state.volumeData[menuItem.props.index].links[0].href});
    }
    if (menuItem.key === 'edit') {
      this.setState({
        volumeEditPageOpen: true,
        defaultValues: this.state.volumeData[menuItem.props.index]
      });
    }
  },
  onSearch(text){
    ActionStorage.fetchVolumes({
      dcID: this.props.dcID,
      storageDeviceID: this.props.deviceID,
      poolID: this.props.poolID,
      name: text
    });
  },
  rightIconMenu (item, index) {
    let iconButtonElement = (
      <IconButton
        touch={true}
        tooltip="more"
        tooltipPosition="bottom-left">
        <MoreVertIcon color={Colors.grey400}/>
      </IconButton>
    );
    //TODO: Warning about MenuItem -> <a>
    let ret = (<IconMenu iconButtonElement={iconButtonElement} onItemTouchTap={this.onItemOperation}>
      <MenuItem key='del' index={index}>Delete</MenuItem>
      <MenuItem key='edit' index={index}>Edit</MenuItem>
    </IconMenu>);
    return ret;
  },

  _renderList(){
    let ret = [];
    let vdc = '';
    let vApp = '';
    let VM = '';
    let status = '';
    let tier = '';
    let capacity = '';
    for (let i = 0; i < this.state.volumeData.length; i++) {
      vdc = '';
      vApp = '';
      VM = '';
      status = 'Status: ' + this.state.volumeData[i].state + ' ';
      tier = 'Tier: ' + this.state.volumeData[i].links[1].title + ' ';
      capacity = 'Capacity(MB): ' + this.state.volumeData[i].sizeInMB + ' ';
      if (this.state.volumeData[i].links.length > 5) {
        VM = 'VM: ' + this.state.volumeData[i].links[5].title + ' ';
      }
      if (this.state.volumeData[i].links.length > 4) {
        vApp = 'vApp: ' + this.state.volumeData[i].links[4].title + ' ';
      }
      if (this.state.volumeData[i].links.length > 3) {
        vdc = 'Virtual DC: ' + this.state.volumeData[i].links[3].title + ' ';
      }
      let primaryText = this.state.volumeData[i].name + ' ' + vdc;
      let secondaryText = status + vApp + VM + tier + capacity;
      ret.push(<ListRow key={this.state.volumeData[i].id} item={this.state.volumeData[i]}
                        primaryText={primaryText}
                        rightIconButton={this.rightIconMenu(this.state.volumeData[i], i)}
                        onTouchEvent={this.onItemSelect}
                        secondaryText={secondaryText}/>);
      ret.push(<ListDivider/>);
    }
    return <List>{ret}</List>;
  },
  renderVolumeEditPage(){
    return <StepPage
      title="Edit Volume"
      open={this.state.volumeEditPageOpen}
      autoScrollBodyContent={true}
      onRequestClose={this.onVolumeEditPageRequestClose}
      finishHandler={this.onVolumeEditPageFinish}
      pages={[{canSkip: false, component: <VolumeEdit defaultValue={this.state.defaultValues} />}]}/>;
  },
  render(){//TODO: Display InitiatorMapping Info
    console.log('render');
    return (
      <div className='storageContent'>
        <div className='search'>
          <SearchBar searchHandler={this.onSearch}/>
        </div>
        <div className='data'>
          {this._renderList()}
        </div>
        <div>{this.renderVolumeEditPage()}</div>
      </div>
    );
  }
});

module.exports = DataDisplay;
