/**
 * Created by Administrator on 2015/12/8 0008.
 */
/**
 * Created by chenh on 2015/11/30.
 */
var React = require('react');
const ListRow = require('../../common/ListRow');
const IconButton = require('material-ui/lib/icon-button');
const IconMenu = require('material-ui/lib/menus/icon-menu');
const MenuItem = require('material-ui/lib/menus/menu-item');
const MoreVertIcon = require('material-ui/lib/svg-icons/navigation/more-vert');
const Colors = require('material-ui/lib/styles/colors');
let injectTapEventPlugin = require('react-tap-event-plugin');
injectTapEventPlugin();
//var StoreRack = require('../../../store/datacenter/RackStore');
var ActionRack = require('../../../actions/datacenter/RackAction');
const Dialog = require('material-ui/lib/dialog');

var Rackicon = React.createClass({
  getDefaultProps(){
    return {
      rack: null,
      dcID: 1
    };
  },
  componentWillMount(){
  },
  deleteRack(item, value)
  {
    console.log('value>>>', value);
    ActionRack.deleteRackByID(this.props.dcID, this.props.rack.id);

  },
  onItemOperation(event, menuItem){
    if (menuItem.key === 'del') {
      //ActionRack.deleteRackByID(this.props.dcID,this.props.rack.id);
      this.refs.dlg.show();
    }
    if (menuItem.key === 'edit') {
      console.log('edit props.rack ', this.props.rack);
        this.setState({
          defaultValues: this.props.rack.id
        });
    }
    if (menuItem.key === 'import') {
      console.log('import props.rack ', this.props.rack);
        this.setState({
          defaultValues: this.props.rack.id
        });
    }
    if (menuItem.key === 'export') {
      console.log('export props.rack ', this.props.rack);
        this.setState({
          defaultValues: this.props.rack.id
        });
    }
  },
  onRackSelect(event, item){
    console.log(item.id);
    ActionRack.updateRackID(item.id);
  },
  _onDialogSubmit(){
    var dlg = this.refs.dlg;
    //var deleterack = this.refs.deleterack;
    ActionRack.deleteRackByID(this.props.dcID, this.props.rack.id);
    dlg.dismiss();
  },
  render: function () {

    let iconButtonElement = (
      <IconButton
        touch={true}
        tooltip="more"
        tooltipPosition="bottom-left">
        <MoreVertIcon color={Colors.grey400}/>
      </IconButton>
    );


    let rightIconMenu = (
      <IconMenu iconButtonElement={iconButtonElement} onItemTouchTap={this.onItemOperation}>
        <MenuItem key='edit'>编辑资源池</MenuItem>
        <MenuItem key='del'>删除资源池</MenuItem>


      </IconMenu>
    );
    var standardActions = [
      {text: '取消'},
      {text: '提交', onTouchTap: this._onDialogSubmit, ref: 'submit'}
    ];
    console.log('icon render' + this.props.rack.name);
    return (
      <div>
        <Dialog
          title="删除资源池"
          modal={true}
          actions={standardActions}
          actionFocus="submit"
          autoDetectWindowHeight={true}
          autoScrollBodyContent={true}
          ref="dlg">
          <div>
            您确定要删除资源池{this.props.rack.name}吗？
          </div>
        </Dialog>
        <ListRow primaryText={this.props.rack.name}
                 rightIconButton={rightIconMenu}
                 item={this.props.rack}
                 onTouchEvent={this.onRackSelect}/>
      </div>
    );
  }
});

module.exports = Rackicon;
