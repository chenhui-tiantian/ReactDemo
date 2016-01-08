/**
 * Created by chenhui on 2015/11/24.
 */
var React = require('react');
const List = require('material-ui/lib/lists/list');
let ListRow = require('../../common/ListRow');
const IconButton = require('material-ui/lib/icon-button');
const IconMenu = require('material-ui/lib/menus/icon-menu');
const MenuItem = require('material-ui/lib/menus/menu-item');
const MoreVertIcon = require('material-ui/lib/svg-icons/navigation/more-vert');
const Colors = require('material-ui/lib/styles/colors');
let injectTapEventPlugin = require('react-tap-event-plugin');
injectTapEventPlugin();
var DataCenterAction = require('../../../actions/datacenter/DataCenterAction');
let StoreDataCenter = require('../../../store/datacenter/DataCenterStore');

import { SelectableContainerEnhance } from 'material-ui/lib/hoc/selectable-enhance';


var SelectableList = SelectableContainerEnhance(List);

var DataCenterList = React.createClass({
  getInitialState(){
    return{
      listSelectedIndex: 0
    }
  },
  deleteItem(event, item){
    if (item.key === 'del') {
      DataCenterAction.deleteDataCenter(this.props.datacenters[item.props.index].id);
    }
  },
  selectItem(event, datacenter){
    DataCenterAction.selectDataCenter(datacenter.id);
  },
  updateSelectedIndex(index){
    console.log(index);
  },
  rightIconMenu(item, index) {
    let iconButtonElement = (
      <IconButton
        touch={true}
        tooltip="more"
        tooltipPosition="bottom-left">
        <MoreVertIcon color={Colors.grey400}/>
      </IconButton>
    );
    return (<IconMenu iconButtonElement={iconButtonElement} onItemTouchTap={this.deleteItem}>
      <MenuItem key='del' index={index}>删除</MenuItem>
    </IconMenu>);
  },
  render: function () {
    var rows = [];
    if (this.props.datacenters != null) {
      this.props.datacenters.forEach((datacenter, i)=> {
        rows.push(< ListRow key={datacenter.id}
                            primaryText={datacenter.name}
                            item={datacenter}
                            value={i}
                            rightIconButton={this.rightIconMenu(datacenter, i)}
                            onTouchEvent={this.selectItem}/>);
      });
    }
    return (<SelectableList key={'dcList'}
                            valueLink={{value: 2,
                             requestChange: this.updateSelectedIndex}}>{rows}</SelectableList>);

  }
});
module.exports = DataCenterList;
