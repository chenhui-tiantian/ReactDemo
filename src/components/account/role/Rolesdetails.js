/**
 * Created by Administrator on 2015/12/30 0030.
 */
var React = require('react');
//const List = require('material-ui/lib/lists/list');
var PriviligeGroupStore = require('../../../store/account/PriviligeGroupStore');
var RolesAction = require('../../../actions/account/RolesAction');
var RolesStore = require('../../../store/account/RolesStore');
import RaisedButton from 'material-ui/lib/raised-button';
import Checkbox from 'material-ui/lib/checkbox';
var priviligelist = {
  'privilegegroup.allprivileges': '所有权限',
  'privilegegroup.home': '首页',
  'privilegegroup.infrastructure': '数据中心',
  'privilegegroup.pricing': '计费',
  'privilegegroup.systemConfiguration': '系统配置',
  'privilegegroup.events': '事件',
  'privilegegroup.users': '用户',
  'privilegegroup.appsLibrary': '模板',
  'privilegegroup.virtualAppliances': 'vApp',
  'privilegegroup.virtualDatacenters': '虚拟数据中心',
  'privilege.details.title': '鼠标移动到相应的权限显示其详细描述',
  'privilege.details.privilege.label': '权限',
  'privilege.details.description.label': '描述',
  'privilege.APPLIB_ALLOW_MODIFY': '从应用中心管理虚拟机模板',
  'privilege.APPLIB_DOWNLOAD_IMAGE': '下载虚拟机模板',
  'privilege.APPLIB_MANAGE_CATEGORIES': '管理虚拟机模板分类',
  'privilege.APPLIB_MANAGE_GLOBAL_CATEGORIES': '管理虚拟机模板全局分类',
  'privilege.APPLIB_MANAGE_REPOSITORY': '管理模板',
  'privilege.APPLIB_UPLOAD_IMAGE': '上传虚拟机模板',
  'privilege.APPLIB_SHOW_DC_CAPACITY': '显示的数据中心容量和可用空间',
  'privilege.APPLIB_VIEW': '访问应用中心视图',
  'privilege.EVENTLOG_VIEW_ALL': '显示所有事件',
  'privilege.EVENTLOG_VIEW_ENTERPRISE': '显示当前虚拟组织所有事件',
  'privilege.ENTERPRISE_ADMINISTER_ALL': '允许用户切换虚拟组织',
  'privilege.ENTERPRISE_ENUMERATE': '列出范围内的虚拟组织',
  'privilege.ENTERPRISE_RESOURCE_SUMMARY_ENT': '显示虚拟组织概览',
  'privilege.ENTERPRISE_SHOW_STATS_LIMITS': '在概览视图显示虚拟组织的资源限制',
  'privilege.PHYS_DC_ALLOW_BACKUP_CONFIG': '管理数据中心备份配置',
  'privilege.PHYS_DC_ALLOW_MODIFY_ALLOCATION': '管理分配策略',
  'privilege.PHYS_DC_ALLOW_MODIFY_NETWORK': '管理网络元素',
  'privilege.PHYS_DC_ALLOW_MODIFY_SERVERS': '管理数据中心元素',
  'privilege.PHYS_DC_ALLOW_MODIFY_STORAGE': '管理存储元素',
  'privilege.PHYS_DC_ENUMERATE': '访问数据中心视图',
  'privilege.PHYS_DC_MANAGE': '管理数据中心',
  'privilege.PHYS_DC_RETRIEVE_DETAILS': '查看数据中心详情',
  'privilege.PHYS_DC_RETRIEVE_RESOURCE_USAGE': '显示资源利用率面板',
  'privilege.APPLIB_VM_COST_CODE': '当编辑一个虚拟机模板时添加一个成本代码',
  'privilege.PRICING_MANAGE': '管理计费',
  'privilege.PRICING_VIEW': '访问计费视图',
  'privilege.SYSCONFIG_ALLOW_MODIFY': '修改配置数据',
  'privilege.SYSCONFIG_SHOW_REPORTS': '允许访问报告',
  'privilege.SYSCONFIG_VIEW': '访问配置视图',
  'privilege.USERS_DEFINE_AS_MANAGER': '自定义虚拟组织管理',
  'privilege.USERS_ENUMERATE_CONNECTED': '显示连接的用户数',
  'privilege.USERS_MANAGE_CHEF_ENTERPRISE': '管理虚拟组织Chef',
  'privilege.USERS_MANAGE_ENTERPRISE': '管理虚拟组织',
  'privilege.USERS_MANAGE_ENTERPRISE_BRANDING': '修改虚拟组织主题',
  'privilege.USERS_MANAGE_LDAP_GROUP': '指定LDAP组',
  'privilege.USERS_MANAGE_OTHER_ENTERPRISES': '管理所有虚拟组织用户',
  'privilege.USERS_MANAGE_RESERVED_MACHINES': '管理虚拟组织保留主机',
  'privilege.USERS_MANAGE_ROLES': '管理角色',
  'privilege.USERS_MANAGE_ROLES_OTHER_ENTERPRISES': '关联角色与虚拟组织',
  'privilege.USERS_MANAGE_SCOPES': '管理范围',
  'privilege.USERS_MANAGE_SYSTEM_ROLES': '管理全局角色',
  'privilege.USERS_MANAGE_USERS': '管理用户',
  'privilege.USERS_PROHIBIT_VDC_RESTRICTION': '没有VDC限制',
  'privilege.USERS_VIEW': '访问用户视图',
  'privilege.USERS_VIEW_PRIVILEGES': '访问角色界面',
  'privilege.MANAGE_HARD_DISKS': '管理虚拟机磁盘',
  'privilege.VAPP_CREATE_INSTANCE': '创建实例',
  'privilege.VAPP_STATEFUL_VIEW': '访问永久模板视图',
  'privilege.VAPP_CREATE_STATEFUL': '管理永久模板',
  'privilege.VAPP_DELETE_UNKNOWN_VM': '删除未知状态虚拟机',
  'privilege.VAPP_CUSTOMISE_SETTINGS': '编辑vApp详情',
  'privilege.VAPP_DEFINE_BACKUP_INFO': '管理虚拟机备份计划',
  'privilege.VAPP_MANAGE_BACKUP_DISKS': '管理虚拟机磁盘备份',
  'privilege.VAPP_DEPLOY_UNDEPLOY': '部署和取消部署vApp',
  'privilege.VAPP_MANAGE_BACKUP': '管理虚拟机备份配置',
  'privilege.VAPP_MANAGE_LAYERS': '管理可用区',
  'privilege.VAPP_PERFORM_ACTIONS': '执行虚拟机操作',
  'privilege.WORKFLOW_OVERRIDE': '管理工作流任务',
  'privilege.ASSIGN_FIREWALLS': '为虚拟机分配防火墙',
  'privilege.MANAGE_FIREWALLS': '管理防火墙',
  'privilege.MANAGE_FLOATINGIPS': '管理浮动IP',
  'privilege.VDC_ENUMERATE': '访问虚拟数据中心视图',
  'privilege.VDC_MANAGE': '管理虚拟数据中心',
  'privilege.VDC_MANAGE_NETWORK': '管理虚拟网络元素',
  'privilege.VDC_MANAGE_STORAGE': '管理虚拟存储元素',
  'privilege.VDC_MANAGE_VAPP': '管理vApp',
  'privilege.VDC_MANAGE_RECYCLE': '管理回收站',
  'privilege.VDC_MANAGE_VM': '管理全部虚拟机'
};

function getRolePrivilige() {
  return {
    _currentroleprivilege: PriviligeGroupStore.getCurrentRolePrivilige() || null
  };
}
var Rolesdetails = React.createClass({
  getInitialState() {

    return {
      priviligelists: priviligelist,
      priviliges: [],
      _currentroleprivilege: [],
      role: null,
      checkboxes: []
    };
  },
  componentWillMount() {
    PriviligeGroupStore.addGetPrilvlegeSuccessListener(this.getPrivilge);
    PriviligeGroupStore.addCURRENTPrilvlegeSuccessListener(this.getCurrentRolePrivilige);
    RolesStore.addSelectRoleListener(this.onRoleChange);
    RolesAction.getRolePrivilige({
      rolesID: 1
    });
    //getRolePrivilige();
    //this.renderPrivilages();
  },

  componentDidMount() {
    if (this.state.role !== null) {
      RolesAction.getCurrentRolePrivilige({
        roleID: this.state.role.id
      });
    }
  },
  componentWillUpdate(nextProps, nextState){
    if ((this.state.role === null) && (nextState.role !== null)) {
      RolesAction.getCurrentRolePrivilige({
        roleID: nextState.role.id
      });
    } else if (this.state.role !== null) {
      if (nextState.role.id !== this.state.role.id) {
        RolesAction.getCurrentRolePrivilige({
          roleID: nextState.role.id
        });
      }
    }
  },
  componentWillUnmount(){
    PriviligeGroupStore.removeGetPrilvlegeSuccessListener(this.getPrivilge);
    PriviligeGroupStore.removeCURRENTPrilvlegeSuccessListener(this.getCurrentRolePrivilige);
    RolesStore.removeSelectRoleListener(this.onRoleChange);
  },
  onRoleChange(){
    this.setState({role: RolesStore.getSelectRole()});
  },
  getCurrentRolePrivilige(){
    this.setState(getRolePrivilige(), this.checkPrivilages);
  },
  getPrivilge(){
    this.setState({priviliges: PriviligeGroupStore.getPrivilegeGrops()});
  },
  checkID(value){
    if (this.refs.checkedID.isChecked) {
      //console.log('get 59 >>>>>>>>>',this.state.priviliges);
      //
      //
      //var word=value.target.value.split('.');
      //var totalpri=[];
      //for(var i=1;i<this.state.priviliges.length;i++){
      //  if(word[1] == this.state.priviliges[i].name){
      //
      //    totalpri.push(this.state.priviliges[i].links);
      //  }
      //}
      //console.log('9999999',totalpri);
    }
  },
  findPrivilgeLink(key, privilge){
    return privilge.name === key;
  },
  savePrivilge(){
    let data = this.state.role;
    let privilgeSet = [];
    for (let key in this.state.priviligelists) {
      console.log(key);
      if (this.state.priviligelists.hasOwnProperty(key)) {
        let name1 = key.split('.');
        let name = name1[1];
        console.log(name);
        if (this.refs.hasOwnProperty(name)) {
          if (this.refs[name].isChecked()) {
            let link = this.state.priviliges.filter(this.findPrivilgeLink.bind(this, name));
            if (link.length !== 0) {
              privilgeSet.push(link[0].links[0]);
            }
          }
        }
      }
    }
    Array.prototype.push.apply(data.links, privilgeSet);
    RolesAction.savePrivilege({roleID: this.state.role.id, data: data});
  },
  checkPrivilages(){
    if (this.state._currentroleprivilege != undefined) {
      for (let i = 0; i < this.state._currentroleprivilege.length; i++) {
        console.log(this.state._currentroleprivilege[i].name);
        this.refs[this.state._currentroleprivilege[i].name].setChecked(true);
      }
    }
  },
  renderPrivilages() {
    let ret = [];
    let enterpriselist = [];
    let datacetnerlist = [];
    let vdclist = [];
    let appliblist = [];
    let vapplist = [];
    let userlist = [];
    let sysconfiglist = [];
    let eventlist = [];
    for (let prilist in this.state.priviligelists) {
      if (this.state.priviligelists.hasOwnProperty(prilist)) {
        //var num = (prilist.split('.')[1]).split('_')[0];
        var vdc = prilist.indexOf('.VDC_');
        var MANAGE = prilist.indexOf('.MANAGE_');
        var APPLIB = prilist.indexOf('.APPLIB_');
        var EVENTLOG = prilist.indexOf('.EVENTLOG_');
        var ENTERPRISE = prilist.indexOf('.ENTERPRISE_');
        var PHYS = prilist.indexOf('.PHYS_');
        var PRICING = prilist.indexOf('.PRICING_');
        var SYSCONFIG = prilist.indexOf('.SYSCONFIG_');
        var USERS = prilist.indexOf('.USERS_');
        var VAPP = prilist.indexOf('.VAPP_');
        var WORKFLOW = prilist.indexOf('.WORKFLOW_');
        var ASSIGN = prilist.indexOf('.ASSIGN_');

        let name1 = prilist.split('.');
        //let divide = name1[1].split('_')[0];
        console.log('divide1111>>>: ', vdc);
        if (ENTERPRISE != -1) {
          enterpriselist.push(
            <li key={name1[1]}>
              <Checkbox key={'check' + name1[1]}
                        ref={name1[1]}
                        value={name1[1]}
                        defaultChecked={false}
                        label={this.state.priviligelists[prilist]}/>
            </li>);
        }
        if (PHYS != -1) {
          datacetnerlist.push(
            <li key={name1[1]}>
              <Checkbox key={'check' + name1[1]}
                        ref={name1[1]}
                        value={name1[1]}
                        defaultChecked={false}
                        label={this.state.priviligelists[prilist]}/>
            </li>);
        }
        if (vdc != -1) {
          vdclist.push(
            <li key={name1[1]}>
              <Checkbox key={'check' + name1[1]}
                        ref={name1[1]}
                        value={name1[1]}
                        defaultChecked={false}
                        label={this.state.priviligelists[prilist]}/>
            </li>);
        }
        if (VAPP != -1) {
          vapplist.push(
            <li key={name1[1]}>
              <Checkbox key={'check' + name1[1]}
                        ref={name1[1]}
                        value={name1[1]}
                        defaultChecked={false}
                        label={this.state.priviligelists[prilist]}/>
            </li>);
        }
        if (APPLIB != -1) {
          appliblist.push(
            <li key={name1[1]}>
              <Checkbox key={'check' + name1[1]}
                        ref={name1[1]}
                        value={name1[1]}
                        defaultChecked={false}
                        label={this.state.priviligelists[prilist]}/>
            </li>);
        }
        if (USERS != -1) {
          userlist.push(
            <li key={name1[1]}>
              <Checkbox key={'check' + name1[1]}
                        ref={name1[1]}
                        value={name1[1]}
                        defaultChecked={false}
                        label={this.state.priviligelists[prilist]}/>
            </li>);
        }
        if (SYSCONFIG != -1) {
          sysconfiglist.push(
            <li key={name1[1]}>
              <Checkbox key={'check' + name1[1]}
                        ref={name1[1]}
                        value={name1[1]}
                        defaultChecked={false}
                        label={this.state.priviligelists[prilist]}/>
            </li>);
        }
        if (EVENTLOG != -1) {
          eventlist.push(
            <li key={name1[1]}>
              <Checkbox key={'check' + name1[1]}
                        ref={name1[1]}
                        value={name1[1]}
                        defaultChecked={false}
                        label={this.state.priviligelists[prilist]}/>
            </li>);
        }


      }

    }
    console.log('vdclist', vdclist);
    //ret.push(<ul><li className='newli'>首页</li>{enterpriselist} </ul>);
    //ret.push();
    ret.push(<li className='newli'>首页</li>);
    ret.push(enterpriselist);
    ret.push(<li className='newli'>数据中心</li>);
    ret.push(datacetnerlist);
    ret.push(<li className='newli'>虚拟中心</li>);
    ret.push(vdclist);
    ret.push(<li className='newli'>VAPP</li>);
    ret.push(vapplist);
    ret.push(<li className='newli'>模板</li>);
    ret.push(appliblist);
    ret.push(<li className='newli'>用户</li>);
    ret.push(userlist);
    ret.push(<li className='newli'>系统配置</li>);
    ret.push(sysconfiglist);
    ret.push(<li className='newli'>事件</li>);
    ret.push(eventlist);
    return ret;
  },

  render () {
    return (<div>
        <div className='roledetails-home'>
          <h3>权限</h3>

          <div className='roledetails-content'>
            <ul key={'checkboxes'}>{this.renderPrivilages()}</ul>
          </div>
          <RaisedButton secondary={true} label='保存' onTouchTap={this.savePrivilge}/>
        </div>
      </div>
    );
  }
});
module.exports = Rolesdetails;
