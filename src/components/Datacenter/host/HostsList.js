/**
 * Created by lenovo on 2015/11/26.
 */
'use strict';

const React = require('react');

const List = require('material-ui/lib/lists/list');
const ListRow = require('../../common/ListRow');
var ActionHost = require('../../../actions/datacenter/HostAction');
const IconButton = require('material-ui/lib/icon-button');
const IconMenu = require('material-ui/lib/menus/icon-menu');
const MenuItem = require('material-ui/lib/menus/menu-item');
const MoreVertIcon = require('material-ui/lib/svg-icons/navigation/more-vert');
const Colors = require('material-ui/lib/styles/colors');
const HostEdit = require('./HostEdit');
const HostDetails = require('./HostDetails');

class HostsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      host: {},
      hostEditOpen: false,
      hostDetailsOpen: false
    };
  }
  onEditRequestClose(){
    this.setState({hostEditOpen: false});
  }
  onDetailsRequestClose(){
    this.setState({hostDetailsOpen: false});
  }

  onItemOperation(event, menuItem) {
    if (menuItem.key === 'del') {
      ActionHost.deleteHost({
        dcID: this.props.dcID,
        rackID: this.props.rackID,
        hostID: this.props.hosts[menuItem.props.index].id
      });
    } else if (menuItem.key === 'edit') {
      this.setState({host: this.props.hosts[menuItem.props.index].data, hostEditOpen: true});
    } else if(menuItem.key === 'detail'){
      this.setState({host: this.props.hosts[menuItem.props.index].data, hostDetailsOpen: true});
    } else if (menuItem.key === 'vm'){
      ActionHost.triggerHostChange(this.props.hosts[menuItem.props.index].data);
    }
  }

  onItemSelect(data) {
    console.log('item select');
  }

  rightIconMenu(item, index) {
    let iconButtonElement = (
      <IconButton
        touch={true}
        tooltip="more"
        tooltipPosition="bottom-left">
        <MoreVertIcon color={Colors.grey400}/>
      </IconButton>
    );
    //TODO: Warning about MenuItem -> <a>
    let ret = (<IconMenu iconButtonElement={iconButtonElement} onItemTouchTap={this.onItemOperation.bind(this)}>
      <MenuItem key='del' index={index}>删除</MenuItem>
      <MenuItem key='edit' index={index}>编辑</MenuItem>
      <MenuItem key='detail' index={index}>详细</MenuItem>
      <MenuItem key='vm' index={index}>虚拟机</MenuItem>
    </IconMenu>);
    return ret;
  }

  renderList() {
    if (this.props.hosts.length > 0) {
      let ret = [];
      for (let i = 0; i < this.props.hosts.length; i++) {
        let primaryText = this.props.hosts[i].name;
        let secondaryText = 'IP: ' + this.props.hosts[i].ip + ' State: ' + this.props.hosts[i].state;
        ret.push(<ListRow key={this.props.hosts[i].id} item={this.props.hosts[i]}
                          primaryText={primaryText}
                          rightIconButton={this.rightIconMenu(this.props.hosts[i], i)}
                          onTouchEvent={this.onItemSelect.bind(this)}
                          secondaryText={secondaryText}/>);
      }
      return (<List>{ret}</List>);
    } else {
      return null;
    }
  }

  render() {
    return (
      <div className='row col-12'>
        {this.renderList()}
        <div><HostEdit open={this.state.hostEditOpen} host={this.state.host} dcID={this.props.dcID}
                       onRequestClose={this.onEditRequestClose.bind(this)}rackID={this.props.rackID}/>
        </div>
        <div><HostDetails open={this.state.hostDetailsOpen} host={this.state.host} dcID={this.props.dcID}
                          onRequestClose={this.onDetailsRequestClose.bind(this)}rackID={this.props.rackID}/>
        </div>
      </div>
    );
  }
}
HostsList.defaultProps = {
  dcID: 1,
  rackID: 0,
  hosts: []
};
module.exports = HostsList;
