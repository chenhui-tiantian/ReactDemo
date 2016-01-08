/**
 * Created by chenh on 2015/12/30.
 */
/**
 * Created by chenh on 2015/12/29.
 */

'use strict';
let Ui = require('material-ui');
let DropDownMenu = Ui.DropDownMenu;
let MenuItem = Ui.MenuItem;
let Checkbox = Ui.Checkbox;
let TextField = Ui.TextField;

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
      links.push( {
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
      <div >
        <lable>名称</lable>
        <TextField ref='name'></TextField>
        <lable>虚拟组织</lable>
        <DropDownMenu ref='enterprise'
                      menuItems={this.state.enterprises} displayMember='name'/>

        <lable>范围: Global scope</lable>
        <lable>LDAP</lable>
        <TextField ref='ldap'></TextField>


      </div>
    );
  }
});
module.exports = AddRole;
