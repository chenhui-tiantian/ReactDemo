/**
 * Created by chenh on 2015/12/28.
 */
var React = require('react');

var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

var RolesStore = require('../../../store/account/RolesStore');
var RolesAction = require('../../../actions/account/RolesAction');
let RoleList = require('./RoleList');
let Rolesdetails = require('./Rolesdetails');

var ControlButtons = require('../../common/ControlButtons');
const Dialog = require('material-ui/lib/dialog');
const AddRole = require('./AddRole');

function getEnterpriseRoles() {

  return {
    roles: RolesStore.getEnterpriseRoles()
  };
}


var RoleManage = React.createClass({

  getInitialState() {
    return {
      roles: RolesStore.getEnterpriseRoles(),
      addRowDlg: false
    };
  },

  componentDidMount(){
    RolesStore.addEnterpriseRolesListener(this._onChange);
    RolesAction.getEnterpriseRoles();
  },

  componentWillUnmount(){
    RolesStore.removeEnterpriseRolesListener(this._onChange);
  },
  _onChange(){
    this.setState(getEnterpriseRoles());
  },
  _onAdd(){
    this.setState({
      addRowDlg: true
    })
  },
  _onDialogSubmit(){
    this.refs.addRole.AddRole();

    this.setState({
      addRowDlg: false
    });
  },
  _onDialogClose(){

    this.setState({
      addRowDlg: false
    });
  },
  render () {
    var standardActions = [
      {text: '取消', onTouchTap: this._onDialogClose, ref: 'close'},
      {text: '提交', onTouchTap: this._onDialogSubmit, ref: 'submit'}
    ];

    return (
      <div className="machine">

        <Dialog
          model={true}
          title="添加角色"
          open={this.state.addRowDlg}
          actions={standardActions}
          actionFocus="submit"
          autoDetectWindowHeight={true}
          autoScrollBodyContent={true}
          ref="dlg">
          <div>
            <AddRole ref='addRole' />
          </div>
        </Dialog>
        <div className='machine-list'>
          <h3>角色</h3>
          <ControlButtons buttons={{
              addButton: true,
              editButton: false,
              deleteButton: false
            }} addButtonHandler={this._onAdd}/>
          <RoleList roles={this.state.roles}/>
        </div>

        <div className='machine-content'>
          <Rolesdetails />
        </div>
      </div>
    );
  }
});


module.exports = RoleManage;
