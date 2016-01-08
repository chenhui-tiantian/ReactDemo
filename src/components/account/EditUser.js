/**
 * Created by jiangrx on 12/24/15.
 */

const React = require('react');
let DropDown = require('../common/DropDownWithSearch');
const Dialog = require('material-ui/lib/dialog');

let StoreUsers = require('../../store/account/UserStore');
let ActionUsers = require('../../actions/account/UserAction');
import Table from 'material-ui/lib/table/table';
import TableBody from 'material-ui/lib/table/table-body';
import TableHeader from 'material-ui/lib/table/table-header';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableRowColumn from 'material-ui/lib/table/table-row-column';

require('./EditUser.css');
let EditUser = React.createClass({
  getInitialState(){
    return {
      vdcs: [],
      roles: [],
      parsedRoles: [{text: '', payload: 0}],
      selectedRole: 0,
      selectedVDCs: []
    };
  },
  getDefaultProps(){
    return {
      enterpriseID: 1,
      open: false,
      user: null
    };
  },
  componentWillMount(){
    StoreUsers.addParsedRolesListener(this.fetchedRoles);
    StoreUsers.addParsedVDCsListener(this.fetchedVDCs);
    ActionUsers.fetchRoles({enterpriseID: this.props.enterpriseID});
  },
  componentWillReceiveProps(nextProps){
    if (nextProps.hasOwnProperty('user') && (nextProps.user !== null)) {
      if (this.state.roles.length > 0) {
        console.log(nextProps);
        this.state.roles.filter(this.setRole.bind(this, nextProps));
      }
      console.log(nextProps.user);
      if (!nextProps.user.hasOwnProperty('availableVirtualDatacenters')) {
        console.log('no');
        ActionUsers.fetchVDCs({
          enterpriseID: this.props.enterpriseID,
          availableVirtualDatacenters: -1
        });
      } else {
        console.log('yes');
        ActionUsers.fetchVDCs({
          enterpriseID: this.props.enterpriseID,
          availableVirtualDatacenters: nextProps.user.availableVirtualDatacenters
        });
      }
    }else{
      ActionUsers.fetchVDCs({
        enterpriseID: this.props.enterpriseID,
        availableVirtualDatacenters: -1
      });
    }
  },
  componentWillUnmount(){
    StoreUsers.removeParsedRolesListener(this.fetchedRoles);
    StoreUsers.removeParsedVDCsListener(this.fetchedVDCs);
  },
  _getData(){
    let data;
    if (this.props.user === null) {
      data = {surname: 'Esage'};
      data.locale = 'en_US';
      data.links = [];
      let role = this.state.roles[this._role.state.selectedValue].links[0];
      role.rel = 'role';
      data.links[0] = role;
      data.links[1] = {//TODO: not hard coded enterprise;
        href: "http://192.168.0.59:80/api/admin/enterprises/1",
        rel: "enterprise",
        title: "Esage",
        type: "application/vnd.esage.enterprise+json"
      };
    } else {
      data = this.props.user;
      let role = this.state.roles[this._role.state.selectedValue].links[0];
      role.rel = 'role';
      data.links[1] = role;
      data.links[2].title = this.state.roles[this._role.state.selectedValue].name;
    }

    data.name = this._name.value;
    data.email = this._email.value;
    data.nick = this._username.value;
    data.active = this._active.checked;
    data.description = this._desc.value;
    data.publicSshKey = this._publickey.value;
    if ((this._passwordRepeat.value.length > 0) && (this._password.value === this._passwordRepeat.value)) {
      data.password = this._password.value;
    }
    let vdcs = StoreUsers.getSelectedVDCs();
    console.log('vdcIndex', vdcs);
    if (vdcs === 'all') {
      delete data.availableVirtualDatacenters;
    } else if (vdcs.length > 0) {
      data.availableVirtualDatacenters = vdcs.join(',');
    }
    return data;
  },
  setRole (nextProps, role, index) {
    if (role.id === nextProps.user.roleID) {
      //console.log(index, role.id);
      this.setState({selectedRole: index});
      return true;
    }
  },
  fetchedVDCs(){
    console.log('vdcs', StoreUsers.getVDCs());
    this.setState({vdcs: StoreUsers.getVDCs(), selectedVDCs: StoreUsers.getSelectedVDCs()});
  },
  fetchedRoles(){
    console.log('getRoles', StoreUsers.getParsedRoles());
    this.setState({roles: StoreUsers.getRoles(), parsedRoles: StoreUsers.getParsedRoles()});
  },
  onSelectVDC(selectedRows){
    StoreUsers.setSelectedVDCs(selectedRows);
  },
  renderVDCs(){
    let rows = [];
    for (let i = 0; i < this.state.vdcs.length; i++) {
      rows.push(<TableRow selected={this.state.vdcs[i].selected}>
        <TableRowColumn>{this.state.vdcs[i].id}</TableRowColumn>
        <TableRowColumn>{this.state.vdcs[i].name}</TableRowColumn>
      </TableRow>);
    }
    return <Table
      fixedHeader={true}
      selectable={true}
      multiSelectable={true}
      onRowSelection={this.onSelectVDC}>
      <TableHeader enableSelectAll={true}>
        <TableRow>
          <TableHeaderColumn colSpan="2" tooltip='Allowed VDCs' style={{textAlign: 'center'}}>
            允许访问的VDCs
          </TableHeaderColumn>
        </TableRow>
        <TableRow>
          <TableHeaderColumn tooltip='ID'>ID</TableHeaderColumn>
          <TableHeaderColumn tooltip='VDC Name'>VDC</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody
        deselectOnClickaway={false}
        showRowHover={true}
        stripedRows={true}
        allRowsSelected={this.props.user===null}>
        {rows}
      </TableBody>
    </Table>;
  },
  _renderEditForm(){
    return <form id='userForm' className='userForm'>
      <div className='formEntry'>
        <lable>姓名</lable>
        <input type='text' ref={(ref)=> this._name = ref} required form='userForm' defaultValue={this.props.user.name}/>
      </div>
      <div className='formEntry'>
        <lable>邮箱</lable>
        <input type='text' ref={(ref)=> this._email = ref} required form='userForm' pattern='\w*@\w*.[a-z]{3}'
               defaultValue={this.props.user.email}/>
      </div>
      <div className='formEntry'>
        <lable>登录名</lable>
        <input type='text' ref={(ref)=> this._username = ref} form='userForm' pattern='\w*' required
               defaultValue={this.props.user.nick} disabled/>
      </div>
      <div className='formEntry'>
        <lable>密码</lable>
        <input type='password' ref={(ref)=> this._password = ref} form='userForm' required/>
      </div>
      <div className='formEntry'>
        <lable>重复密码</lable>
        <input type='password' ref={(ref)=> this._passwordRepeat = ref} form='userForm' required/>
      </div>
      <div className='formEntry'>
        <lable>角色</lable>
        <DropDown ref={(ref) => this._role = ref} contents={this.state.parsedRoles}
                  defaultValue={this.state.selectedRole}/>
      </div>
      <div className='formEntry'>
        <lable>描述</lable>
        <textarea type='text' ref={(ref)=> this._desc = ref} form='userForm'
                  defaultValue={this.props.user.hasOwnProperty('description') ? this.props.user.description : ''}/>
      </div>
      <div className='formEntry'>
        <lable>公有密钥</lable>
        <textarea cols='30' rows='5' ref={(ref)=> this._publickey = ref} form='userForm'
                  defaultValue={this.props.user.hasOwnProperty('publicSshKey') ? this.props.user.publicSshKey : ''}/>
      </div>
      <div className='formEntry'>
        <lable>激活</lable>
        <input type='checkbox' ref={(ref)=> this._active = ref} required form='userForm'
               defaultChecked={this.props.user.active}/>
      </div>
    </form>;
  },
  _renderAddForm(){
    return <form id='userForm'>
      <div className='formEntry'>
        <lable>姓名</lable>
        <input type='text' ref={(ref)=> this._name = ref} required form='userForm'/>
      </div>
      <div className='formEntry'>
        <lable>邮箱</lable>
        <input type='text' ref={(ref)=> this._email = ref} required form='userForm' pattern='\w*@\w*.[a-z]{3}'/>
      </div>
      <div className='formEntry'>
        <lable>登录名</lable>
        <input type='text' ref={(ref)=> this._username = ref} form='userForm' pattern='\w*' required/>
      </div>
      <div className='formEntry'>
        <lable>密码</lable>
        <input type='password' ref={(ref)=> this._password = ref} form='userForm' required/>
      </div>
      <div className='formEntry'>
        <lable>重复密码</lable>
        <input type='password' ref={(ref)=> this._passwordRepeat = ref} form='userForm' required/>
      </div>
      <div className='formEntry'>
        <lable>角色</lable>
        <DropDown ref={(ref) => this._role = ref} contents={this.state.parsedRoles} defaultValue={0}/>
      </div>
      <div className='formEntry'>
        <lable>描述</lable>
        <textarea type='text' ref={(ref)=> this._desc = ref} form='userForm'/>
      </div>
      <div className='formEntry'>
        <lable>公有密钥</lable>
        <textarea cols='30' rows='5' ref={(ref)=> this._publickey = ref} form='userForm'/>
      </div>
      <div className='formEntry'>
        <lable>激活</lable>
        <input type='checkbox' ref={(ref)=> this._active = ref} required form='userForm'/>
      </div>
    </form>;
  },
  render(){
    if (this.props.user !== null) {
      return <Dialog
        title="编辑用户"
        actions={[{ text: '取消' }, { text: '保存', onTouchTap: this.props.onDialogSubmit, ref: 'submit' }]}
        actionFocus="submit"
        open={this.props.open}
        onRequestClose={this.props.onRequestClose}
        autoScrollBodyContent={true}>
        <div className='editUser'>{this._renderEditForm()}
          <div className='showVDCs'>{this.renderVDCs()}</div>
        </div>
      </Dialog>;
    } else {
      return <Dialog
        title="添加用户"
        actions={[{ text: '取消' }, { text: '保存', onTouchTap: this.props.onDialogSubmit, ref: 'submit' }]}
        actionFocus="submit"
        open={this.props.open}
        onRequestClose={this.props.onRequestClose}
        autoScrollBodyContent={true}>
        <div className='editUser'>{this._renderAddForm()}
          <div className='showVDCs'>{this.renderVDCs()}</div>
        </div>
      </Dialog>;
    }
  }
});
module.exports = EditUser;
