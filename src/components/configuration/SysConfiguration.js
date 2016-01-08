/**
 * Created by chenh on 2016/1/5.
 */

var React = require('react');
let Ui = require('material-ui');
let DropDownMenu = Ui.DropDownMenu;
let RaisedButton = Ui.RaisedButton;
let Checkbox = Ui.Checkbox;
let TextField = Ui.TextField;
let MenuItem = Ui.MenuItem;
var ConfigurationStore = require('../../store/configuration/ConfigurationStore');
var ConfiguartionAction = require('../../actions/configuration/ConfiguartionAction');
require('./configuration.css');

var configlist = {
  "client.theme.defaultEnterpriseLogoPath": "Logo文件",
  "client.user.numberElementsPerPage": "列表页每页显示的数量",
  "client.main.enterpriseLogoURL": "点击虚拟组织Logo时显示URL",
  "client.main.billingUrl": "点击报表顶端Logo时显示URL，如为空则报表按钮不会显示",
  "client.main.disableChangePassword": "允许用户修改自己的密码",
  "client.main.allowLogout": "允许用户注销",
  "client.main.showHardDisk": "显示虚拟机磁盘选项",
  "client.logout.url": "用户注销后重定向到该URL(empty -> login screen)",
  "client.main.defaultView": "再次登录进来默认跳转页面",
  "client.main.showSoftInfo": "当达到软限制时，提示详细信息",
  "client.main.showHardInfo": "当达到硬限制时，提示详细信息",
  "client.main.workflowEndPoint": "工作流地址",
  "client.main.workflowEnabled": "启用工作流",
  "client.main.recycleEnable": "启用磁盘回收站",
  "client.main.enableFirewallForPrivateVDC": "为私有VDC启用防火墙",

  "client.applibrary.defaultTemplateRepository": "默认Esage模板仓库(如果为空将不创建)",
  "client.applibrary.ovfpackagesDownloadingProgressUpdateInterval": "远程模板库下载进度更新间隔(秒)",
  "client.infra.InfrastructureUpdateInterval": "数据中心数据更新间隔 (秒)",
  "client.metering.meteringUpdateInterval": "事件日志更新间隔(秒)",
  "client.network.numberIpAdressesPerPage": "列表中每页显示的IP地址数量",
  "client.virtual.allowVMRemoteAccess": "允许远程访问虚拟机",
  "client.virtual.virtualApplianceDeployingUpdateInterval": "vApp部署进度更新间隔(秒)",
  "client.virtual.virtualAppliancesUpdateInterval": "vApp更新间隔(秒)",
  "client.infra.defaultHypervisorPassword": "默认的hypervisor密码",
  "client.infra.defaultHypervisorPort": "默认hypervisor端口",
  "client.infra.defaultHypervisorUser": "默认hypervisor用户",
  "client.storage.volumeMaxSizeValues": "硬盘管理允许的大小(GB)",
  "client.infra.vlanIdMin": "默认最小VLAN ID",
  "client.infra.vlanIdMax": "默认最大 VLAN ID",
  "client.virtual.virtualImagesRefreshConversionsInterval": "丢失的虚拟镜像转换更新间隔(秒)",

  "client.network.defaultName": "名称",
  "client.network.defaultNetmask": "网络掩码",
  "client.network.defaultAddress": "网络地址",
  "client.network.defaultGateway": "网关",
  "client.network.defaultPrimaryDNS": "首要DNS",
  "client.network.defaultSecondaryDNS": "次要DNS",
  "client.network.defaultSufixDNS": "DNS后缀",

  "client.dashboard.esageURL": "文档首页URL",
  "client.dashboard.allowUsersAccess": "在顶端显示用户图标",
  "client.dashboard.dashboardUpdateInterval": "首页更新间隔(秒)",
  "client.dashboard.licenseUrl": "许可证购买URL",

    "mainmenu.button.home" :"首页",
    "mainmenu.button.infraestructure" :"数据中心",
    "mainmenu.button.virtualdatacenters" :"虚拟数据中心",
    "mainmenu.button.apps_library" :"应用商店",
    "mainmenu.button.pricing" :"计费",
    "mainmenu.button.events" :"操作日志"
};

var defaultPage = [
            {index:'0', mask:configlist['mainmenu.button.home']},
            {index:'1', mask:configlist['mainmenu.button.infraestructure']},
            {index:'2', mask:configlist['mainmenu.button.virtualdatacenters']},
            {index:'3', mask:configlist['mainmenu.button.apps_library']},
            {index:'4', mask:configlist['mainmenu.button.pricing']},
            {index:'5', mask:configlist['mainmenu.button.events']}
];

var netmasks =[
                {index:'0', mask:"255.255.252.0", length: 22},
                {index:'1', mask:"255.255.254.0", length: 23},
                {index:'2', mask:"255.255.255.0", length: 24},
                {index:'3', mask:"255.255.255.128", length: 25},
                {index:'4', mask:"255.255.255.192", length: 26},
                {index:'5', mask:"255.255.255.224", length: 27},
                {index:'6', mask:"255.255.255.240", length: 28},
                {index:'7', mask:"255.255.255.248", length: 29},
                {index:'8', mask:"255.255.255.252", length: 30},
                {index:'9', mask:"FFFF:FFFF:FFFF:FFFF::", length: 64},
                {index:'10', mask:"FFFF:FFFF:FFFF:FF::", length: 56},
                {index:'11', mask:"FFFF:FFFF:FFFF::", length: 48}
            ];

function getConfigs() {
  return {
    configs: ConfigurationStore.getConfigs()
  };
}

var SysConfiguration = React.createClass({
  getInitialState() {
    return getConfigs();
  },

  componentDidMount(){
    ConfigurationStore.addConfigChangedListener(this._onChange);
    ConfiguartionAction.fetchConfigs();
  },

  componentWillUnmount(){
    ConfigurationStore.removeConfigChangedListener(this._onChange);
  },
  _onChange(){
    this.setState(getConfigs());
  },
  saveConfig(){
    ConfiguartionAction.updateConfig(this.state.configs);
  },

  createInputBox(key,inputtype){
    let configs = this.state.configs;
    let value = '';
    let elementindex = -1;
    for (let index = 0; index < configs.length; index++) {
      if (key === configs[index].name) {
        value = configs[index].value;
        elementindex = index;
        break;
      }
    }

    var row =[];
    row.push(<li key={elementindex}>
      <div className="dis">{configlist[key]}</div>
      <input type={inputtype}  className="itemValue" ref={key}  value={value}  onChange={(event)=>{
             let configs = this.state.configs;
             console.log('value:' + value);
             console.log('elementindex:' + elementindex);
             configs[elementindex].value = event.target.value;
             this.setState({configs:configs});
             }}/>
      </li>);
    return row;
  },

   createCheckBox(key){
    let configs = this.state.configs;
    let value = '0';
    let elementindex = -1;
    for (let index = 0; index < configs.length; index++) {
      if (key === configs[index].name) {
        value = configs[index].value;
        elementindex = index;
        break;
      }
    }
    console.log('origin value: '+value +'  key = ' +key);

    var row =[];
    row.push(<li key={elementindex} >
       <div className="dis"> </div>
             <Checkbox key={key}  className="itemValue"
                        ref={key}
                        defaultChecked={value === '1' ? true : false}
                        label={configlist[key]}  onCheck={(event, checked)=>{
                          let configs = this.state.configs;
                           console.log('value:' + value);
                           console.log('elementindex:' + elementindex);
                           configs[elementindex].value = checked ? '1' : '0';
                           this.setState({configs:configs});
                         }}/>
            </li>);

    return row;
  },

  createSelectBox(key,list){
  let configs = this.state.configs;
    let value = '0';
    let elementindex = -1;
    for (let index = 0; index < configs.length; index++) {
      if (key === configs[index].name) {

        value = configs[index].value;
        elementindex = index;

        break;
      }
    }

    var row =[];
    row.push(<li key={elementindex}>
       <div className="dis">{configlist[key]} </div>
              <DropDownMenu ref={key} style={{width:300}}
                          menuItems={list} displayMember='mask'
                          valueMember='index' value={value}
                          onChange={(e, index, value)=>{
                          let configs = this.state.configs;
                          console.log('selectvlaue : ' + value.index);
                          console.log(index);
                            configs[elementindex].value = value.index;
                           this.setState({configs:configs});
                         }}
                          />
            </li>);

    return row;
  },

  render () {
    return (
      <div >
          <ul className='configlist'>
            <li className='newli'>常规</li>
             {this.createInputBox("client.theme.defaultEnterpriseLogoPath","text")}
             {this.createInputBox("client.user.numberElementsPerPage","number")}
             {this.createInputBox("client.main.enterpriseLogoURL","text")}
             {this.createInputBox("client.main.billingUrl","text")}
             {this.createCheckBox("client.main.disableChangePassword")}
             {this.createCheckBox("client.main.allowLogout")}
             {this.createCheckBox("client.main.showHardDisk")}
             {this.createInputBox("client.logout.url","text")}
             {this.createSelectBox("client.main.defaultView",defaultPage)}
             {this.createCheckBox("client.main.showSoftInfo")}
             {this.createCheckBox("client.main.showHardInfo")}
             {this.createInputBox("client.main.workflowEndPoint","text")}
             {this.createCheckBox("client.main.workflowEnabled")}
             {this.createCheckBox("client.main.recycleEnable")}
             {this.createCheckBox("client.main.enableFirewallForPrivateVDC")}
             <li className='newli'>数据中心</li>
             {this.createInputBox("client.applibrary.defaultTemplateRepository","text")}
             {this.createInputBox("client.applibrary.ovfpackagesDownloadingProgressUpdateInterval","number")}
             {this.createInputBox("client.infra.InfrastructureUpdateInterval","number")}
             {this.createInputBox("client.metering.meteringUpdateInterval","number")}
             {this.createInputBox("client.network.numberIpAdressesPerPage","number")}
             {this.createCheckBox("client.virtual.allowVMRemoteAccess")}
             {this.createInputBox("client.virtual.virtualApplianceDeployingUpdateInterval","number")}
             {this.createInputBox("client.virtual.virtualAppliancesUpdateInterval","number")}
             {this.createInputBox("client.infra.defaultHypervisorPassword","text")}
             {this.createInputBox("client.infra.defaultHypervisorPort","text")}
             {this.createInputBox("client.infra.defaultHypervisorUser","text")}
             {this.createInputBox("client.storage.volumeMaxSizeValues","text")}
             {this.createInputBox("client.infra.vlanIdMin","number")}
             {this.createInputBox("client.infra.vlanIdMax","number")}
             {this.createInputBox("client.virtual.virtualImagesRefreshConversionsInterval","number")}
             <li className='newli'>网路</li>
             {this.createInputBox("client.network.defaultName","text")}
             {this.createSelectBox("client.network.defaultNetmask",netmasks)}
             {this.createInputBox("client.network.defaultAddress","text")}
             {this.createInputBox("client.network.defaultGateway","text")}
             {this.createInputBox("client.network.defaultPrimaryDNS","text")}
             {this.createInputBox("client.network.defaultSecondaryDNS","text")}
             {this.createInputBox("client.network.defaultSufixDNS","text")}
             <li className='newli'>首页</li>
             {this.createInputBox("client.dashboard.esageURL","text")}
             {this.createCheckBox("client.dashboard.allowUsersAccess")}
             {this.createInputBox("client.dashboard.dashboardUpdateInterval","number")}
             {this.createInputBox("client.dashboard.licenseUrl","text")}
           </ul>
          <RaisedButton secondary={true} label='保存' onTouchTap={this.saveConfig}/>
      </div>
     );
  }
});
module.exports = SysConfiguration;
