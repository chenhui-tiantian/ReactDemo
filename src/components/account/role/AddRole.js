/**
 * Created by chenh on 2015/12/29.
 */

'use strict';
let Ui = require('material-ui');
let DropDownMenu = Ui.DropDownMenu;
let MenuItem = Ui.MenuItem;
let Checkbox = Ui.Checkbox;
let TextField = Ui.TextField;
require('../account.css');

var RolesStore = require('../../../store/account/RolesStore');
var RolesAction = require('../../../actions/account/RolesAction');
var React = require('react');
function getData() {
  var scopes = [];
  var selectScope = {
    title: 'Global scope',
    rel: 'scope',
    type: '',
    href: ''
  };
  scopes = RolesStore.getScopes();
  scopes.forEach((scope) => {
    if (scope.name === 'Global scope') {
      selectScope['title'] = scope.links[0].title;
      selectScope['type'] = scope.links[0].type;
      selectScope['href'] = scope.links[0].href;
    }
  });

  var listEnterprise = [];

  listEnterprise = RolesStore.getEnterprises();

  return {
    enterprises: listEnterprise || null,
    selectScope: selectScope
  };

}
var AddRole = React.createClass({
  getInitialState: function () {
    return getData();
  },

  componentDidMount(){
    RolesStore.addScopeEnterpriseListener(this._onChange);
    RolesAction.fetchScopeEnterprise();
  },

  componentWillUnmount(){
    RolesStore.removeEnterpriseRolesListener(this._onChange);
  },

  _onChange()
  {
    this.setState(getData());
  },

  AddRole(){
    var selectIndex = this.refs.enterprise.state.selectedIndex;
    var selectEnterprise = this.state.enterprises[selectIndex];
    console.log(selectEnterprise);
    console.log(selectIndex);

    var links = [];
    if (selectIndex !== 0) {
      links.push({
        title: selectEnterprise.name,
        rel: 'enterprise',
        type: selectEnterprise.links[0].type,
        href: selectEnterprise.links[0].href
      });
    }
    links.push(this.state.selectScope);

    RolesAction.addRole(links, this.refs.name.getValue(), this.refs.ldap.getValue());
  },

  render(){

    return (
      <div className="addRole">
        <div className="name">
          <label>名称</label>
          <TextField ref='name'></TextField>
        </div>

        <div className="organize">
          <label>虚拟组织</label>

          <div >
            <DropDownMenu ref='enterprise' style={{width:200}}
                          menuItems={this.state.enterprises} displayMember='name' />
          </div>
        </div>


        <div className="ldap">
          <div>LDAP</div>
          <TextField ref='ldap'></TextField>
        </div>
        <div className="scope">
          <lable>范围: Global scope</lable>
        </div>
      </div>
    );
  }
});
module.exports = AddRole;
