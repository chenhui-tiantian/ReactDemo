/**
 * Created by jiangrx on 15-12-14.
 */

const React = require('react');
const List = require('material-ui/lib/lists/list');
const ListDivider = require('material-ui/lib/lists/list-divider');
const ListRow = require('../../../common/ListRow');
const Avatar = require('material-ui/lib/avatar');
const IconButton = require('material-ui/lib/icon-button');
const IconMenu = require('material-ui/lib/menus/icon-menu');
const MenuItem = require('material-ui/lib/menus/menu-item');
const MoreVertIcon = require('material-ui/lib/svg-icons/navigation/more-vert');
const Colors = require('material-ui/lib/styles/colors');
const ImportVM = require('./ImportVM');
const VAPPSelect = require('./vAppSelect');
const VMInfo = require('./VMInfo');
const ActionVM = require('../../../../actions/datacenter/VMAction');

let VMList = React.createClass({
  getInitialState(){
    return {
      vm: {},
      openImportVMPage: false
    };
  },
  getDefaultProps(){
    return {
      dcID: 1,
      rackID: 0,
      hostID: 0,
      host: {},
      vms: []
    };
  },

  onItemOperation(event, menuItem) {
    if (menuItem.key === 'include') {
      console.log('manage');
      this.setState({openImportVMPage: true, vm: this.props.vms[menuItem.props.index]});
    } else if (menuItem.key === 'migrate') {
      console.log('migrate');
    }
  },

  onItemSelect() {
  },

  rightIconMenu(item, index) {
    let iconButtonElement = (
      <IconButton
        touch={true}
        tooltip='more'
        tooltipPosition='bottom-left'>
        <MoreVertIcon color={Colors.grey400}/>
      </IconButton>
    );
    //TODO: Warning about MenuItem -> <a>
    let ret;
    if (item.type === 'NOT_MANAGED') {
      ret = (<IconMenu iconButtonElement={iconButtonElement} onItemTouchTap={this.onItemOperation}>
        <MenuItem key='include' index={index}>Manage</MenuItem>
      </IconMenu>);
    } else {
      ret = (<IconMenu iconButtonElement={iconButtonElement} onItemTouchTap={this.onItemOperation}>
        <MenuItem key='migrate' index={index}>Migrate</MenuItem>
      </IconMenu>);
    }
    return ret;
  },

  unit(data, index) {
    let units = [' Byes', ' KB', ' MB', ' GB', ' TB', ' TB', ' TB', ' TB'];
    let size = '';
    if (data <= 1024) {
      size = data + units[index];
    } else if (data <= (1024 * 1024)) {
      size = (data / 1024).toFixed(2) + units[index + 1];
    } else if (data <= (1024 * 1024 * 1024)) {
      size = (data / 1024 / 1024).toFixed(2) + units[index + 2];
    } else {
      size = (data / (1024 * 1024 * 1024)).toFixed(2) + units[index + 3];
    }
    return size;
  },

  onImportClose() {
    this.setState({openImportVMPage: false});
  },

  onImportFinish(data) {
    console.log(data);
    let vmData = data[1].data;
    vmData.links = Array.from(data[0].data.vmLinks);
    let link2 = vmData.links[2];
    console.log('link2', link2);
    vmData.links[3] = Object.assign({}, vmData.links[2]);
    vmData.links[3].rel = 'imported';
    console.log('vmData ', vmData);
    ActionVM.importVM({data: vmData, vdcID: data[0].data.vdcID, vAppID: data[0].data.vAppID});
    this.setState({openImportVMPage: false});
  },

  renderImportVM() {
    return <ImportVM
      dcID={this.props.dcID}
      rackID={this.props.rackID}
      hostID={this.props.hostID}
      vmID={this.state.vm.id}
      title='Import VM'
      open={this.state.openImportVMPage}
      autoScrollBodyContent={true}
      onRequestClose={this.onImportClose}
      finishHandler={this.onImportFinish}
      pages={[
            {canSkip: false,
            component: <VAPPSelect dcID={this.props.dcID}
            rackID={this.props.rackID}
            hostID={this.props.hostID}
            host={this.props.host}
            vm={this.state.vm}/>},
            {canSkip: false,
            component: <VMInfo dcID={this.props.dcID}
            rackID={this.props.rackID}
            hostID={this.props.hostID}/>}]}/>;
  },

  renderList() {
    if (this.props.vms.length > 0) {
      let ret = [];
      for (let i = 0; i < this.props.vms.length; i++) {
        let primaryText = this.props.vms[i].label;
        let leftIcon = <Avatar>{this.props.vms[i].state}</Avatar>;
        let secondaryText = 'CPU: ' + this.props.vms[i].cpu +
          ' Mem: ' + this.unit(Number.parseInt(this.props.vms[i].ram), 2) +
          ' Disk: ' + this.unit(Number.parseInt(this.props.vms[i].hdInBytes), 0);
        if (this.props.vms[i].type !== 'NOT_MANAGED') {
          secondaryText += ' User:' + this.props.vms[i].links[4].title +
            ' Enterprise:' + this.props.vms[i].links[3].title;
        }
        ret.push(<ListRow key={this.props.vms[i].id} item={this.props.vms[i]}
                          primaryText={primaryText}
                          rightIconButton={this.rightIconMenu(this.props.vms[i], i)}
                          leftAvatar={leftIcon}
                          onTouchEvent={this.onItemSelect}
                          secondaryText={secondaryText}/>);
        ret.push(<ListDivider />);
      }
      return (<List>{ret}</List>);
    } else {
      return null;
    }
  },

  render() {
    return <div className='row col-12'>
      {this.renderList()}
      {this.renderImportVM()}
    </div>;
  }
});

module.exports = VMList;
