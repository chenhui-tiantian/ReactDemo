/**
 * Created by Administrator on 2015/12/24 0024.
 */
/**
 * Created by Administrator on 2015/12/4 0004.
 */
'use strict';

var React = require('react');
//var mui = require('material-ui');
//const TextField = mui.TextField;
//const SelectField = require('material-ui/lib/select-field');
const StoreVMTemplate = require('../../../store/appstore/vmtemplate/VMTemplateStore');
var ControlButtons = require('../../common/ControlButtons');
const ActionVMTemplate = require('../../../actions/appstore/vmtemplate/VMTemplateAction');
var AddRemoteTemplate = require('./AddRemoteTemplate');
const Dialog = require('material-ui/lib/dialog');
const DropDownMenu = require('material-ui/lib/drop-down-menu');
const List = require('material-ui/lib/lists/list');
const ListRow = require('../../common/ListRow');
const ListItem = require('material-ui/lib/lists/list-item');
const IconMenu = require('material-ui/lib/menus/icon-menu');
const MenuItem = require('material-ui/lib/menus/menu-item');
const IconButton = require('material-ui/lib/icon-button');
const MoreVertIcon = require('material-ui/lib/svg-icons/navigation/more-vert');
const Colors = require('material-ui/lib/styles/colors');
import Table from 'material-ui/lib/table/table';
import TableBody from 'material-ui/lib/table/table-body';
import TableFooter from 'material-ui/lib/table/table-footer';
import TableHeader from 'material-ui/lib/table/table-header';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableRowColumn from 'material-ui/lib/table/table-row-column';

function getvmTlib() {
  return {
    vmTlibs: StoreVMTemplate.getvmTlib() || null

  };
}
var LoadTemplate = React.createClass({
  getDefaultProps(){
    return {
      enterpriseID: 1
    };
  },

  getInitialState: function () {
    return getvmTlib();

  },

  componentDidMount(){
    StoreVMTemplate.vmtlibListenerSuccessListener(this._onChange);
    ActionVMTemplate.getvmTlib({
      enterpriseID : this.props.enterpriseID,

    });
  },

  componentWillUnmount(){
    StoreVMTemplate.removeVmtlibListenerSuccessListener(this._onChange);
  },

  _onChange()
  {
    this.setState({vmTlibs: StoreVMTemplate.getvmTlib() || null});

  },
  onloadTemplateFinish(){

  },
  _onAddRemoteTM(){
    this.setState({RemoteTemplate: true});
  },
  RemoteTemplateClose(){
    this.setState({RemoteTemplate: false});
  },
  RemoteTemplateFinish(data){

    this.setState({RemoteTemplate: false});

    var RemoteTemplat = this.refs.AddRemotetemplate;
    RemoteTemplat.onloadTemplateFinish();
    console.log('loadTemplat', data);
  },
  deleteVMTItem(event, value){
    console.log('value',this.state.vmTlibs[value.props.index].id);
    ActionVMTemplate.deleteVMTItem({
      enterpriseID : this.props.enterpriseID,
      TempDListID : this.state.vmTlibs[value.props.index].id});
      getvmTlib();

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
    let ret = (<IconMenu iconButtonElement={iconButtonElement} onItemTouchTap={this.deleteVMTItem}>
      <MenuItem key='del' index={index} onItemTouchTap={this.deleteVMTItem}>删除</MenuItem>
    </IconMenu>);
    return ret;
  },


  _renderLists() {
    let ret = [];
    console.log('vmTlibs>>>', this.state.vmTlibs);
    for (let i = 0; i < this.state.vmTlibs.length; i++) {


      ret.push(
          < ListItem primaryText={this.state.vmTlibs[i].name}
                     rightIconButton={this.rightIconMenu(this.state.vmTlibs[i], i)}
                     onTouchTap={this.selectItem}/>


      )}

    return (<List>{ret}</List>);
  },
  _rendertemplatetables(){
    let rows = [];

    for (let i = 0; i < this.state.vmTlibs.length; i++) {
      var leng = this.state.vmTlibs[i].templateDefinitions.collection;
      for(let j =0; j<leng.length; j++){
        rows.push(<TableRow>
          <TableRowColumn>{leng[j].id}</TableRowColumn>
          <TableRowColumn>{leng[j].name}</TableRowColumn>
        </TableRow>);
      }

    }
    return <Table
      height={200}
      fixedHeader={true}
      selectable={true}
      multiSelectable={true}
      onRowSelection={this.onSelectVDC}>
      <TableHeader enableSelectAll={true} >

        <TableRow>
          <TableHeaderColumn tooltip='id'>ID</TableHeaderColumn>
          <TableHeaderColumn tooltip='name'>模板</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody
        deselectOnClickaway={false}
        showRowHover={true}
        stripedRows={true}>
        {rows}
      </TableBody>
    </Table>;
  },
  refreshTemp(){
    getvmTlib();
  },

  render(){
    var AddRemoteTMActions = [
      {text: '取消', onTouchTap: this.RemoteTemplateClose.bind(this)},
      {text: '提交', onTouchTap: this.RemoteTemplateFinish.bind(this), ref: 'loadtemplatesubmit'}
    ];



    return (
      <div >
        <Dialog
          title="添加应用商店"
          open={this.state.RemoteTemplate}
          modal={true}
          actions={AddRemoteTMActions}
          actionFocus="submit"
          autoDetectWindowHeight={true}
          autoScrollBodyContent={true}
          ref="RemotetemplateDialog">
          <div >
            <AddRemoteTemplate ref="AddRemotetemplate" />
          </div>
        </Dialog>

        <div className='loadtm-dialog-left'>
          <div className ='loadtm-dialog-left-hear'>
          <h5>库</h5>
            <div className='loadtm-dialog-left-button'><ControlButtons buttons={{
                addButton: true,
                editButton: false,
                deleteButton: false }} addButtonHandler={this._onAddRemoteTM.bind(this)}/>
            </div>
          </div>
          <div className='loadtm-dialog-left-content'>
            {this._renderLists()}
          </div>
        </div>
        <div className='loadtm-dialog-right'>
          <div className ='loadtm-dialog-right-hear'>
            <h5>类别</h5>
          </div>
          <div>
            <h5>虚拟模板</h5>
            <IconButton label='Add' iconClassName="icon-refresh"
                        style={{width: '38px', height: '26px', padding: '0', background: '#cccccc', margin: '0px 5px'}}
                        onTouchTap={this.refreshTemp.bind(this)} />
            <div className='loadtm-dialog-right-table'>
              {this._rendertemplatetables()}
            </div>
          </div>
        </div>
      </div>
    );
  }
});
module.exports = LoadTemplate;

